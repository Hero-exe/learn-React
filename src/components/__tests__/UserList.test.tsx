import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserList } from '../TestingBasics';

// Math.randomをモック化してテストを安定させる
const mockMath = Object.create(global.Math);
mockMath.random = jest.fn();
global.Math = mockMath;

describe('UserList Component', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // 基本的なレンダリングテスト
  test('初期状態で正しくレンダリングされる', () => {
    render(<UserList />);
    
    // 基本要素が存在することを確認
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
    expect(screen.getByText('ユーザー一覧')).toBeInTheDocument();
    expect(screen.getByTestId('fetch-button')).toBeInTheDocument();
    expect(screen.getByTestId('fetch-button')).toHaveTextContent('ユーザーを取得');
    
    // 初期状態ではローディングもエラーもユーザーリストも表示されない
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('users')).not.toBeInTheDocument();
  });

  // 成功パターンのテスト
  test('ユーザー取得が成功する', async () => {
    // 成功パターン（エラー確率を0に設定）
    (Math.random as jest.Mock).mockReturnValue(0.8);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // ボタンをクリック
    fireEvent.click(fetchButton);
    
    // ローディング状態の確認
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByTestId('loading')).toHaveTextContent('読み込み中...');
    expect(fetchButton).toBeDisabled();
    expect(fetchButton).toHaveTextContent('読み込み中...');
    
    // 1秒後にデータが表示される
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('users')).toBeInTheDocument();
    });
    
    // ローディングが消える
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(fetchButton).not.toBeDisabled();
    expect(fetchButton).toHaveTextContent('ユーザーを取得');
    
    // ユーザーデータが表示される
    expect(screen.getByText('田中太郎 (tanaka@example.com)')).toBeInTheDocument();
    expect(screen.getByText('佐藤花子 (sato@example.com)')).toBeInTheDocument();
    expect(screen.getByText('山田次郎 (yamada@example.com)')).toBeInTheDocument();
    
    // 各ユーザーの削除ボタンが存在する
    expect(screen.getByTestId('delete-user-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-user-2')).toBeInTheDocument();
    expect(screen.getByTestId('delete-user-3')).toBeInTheDocument();
  });

  // エラーパターンのテスト
  test('ユーザー取得でエラーが発生する', async () => {
    // エラーパターン（エラー確率を100%に設定）
    (Math.random as jest.Mock).mockReturnValue(0.1);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // ボタンをクリック
    fireEvent.click(fetchButton);
    
    // ローディング状態の確認
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // 1秒後にエラーが表示される
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    // エラーメッセージの確認
    expect(screen.getByTestId('error-message')).toHaveTextContent('ユーザーの取得に失敗しました');
    expect(screen.getByTestId('error-message')).toHaveAttribute('role', 'alert');
    
    // ローディングが消える
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(fetchButton).not.toBeDisabled();
    
    // ユーザーリストは表示されない
    expect(screen.queryByTestId('users')).not.toBeInTheDocument();
  });

  // 複数回の取得テスト
  test('複数回ユーザーを取得できる', async () => {
    (Math.random as jest.Mock).mockReturnValue(0.8);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // 1回目の取得
    fireEvent.click(fetchButton);
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('users')).toBeInTheDocument();
    });
    
    // 2回目の取得
    fireEvent.click(fetchButton);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    // ユーザーリストが再表示される
    expect(screen.getByTestId('users')).toBeInTheDocument();
  });

  // エラー後の再試行テスト
  test('エラー後に再試行できる', async () => {
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // 1回目はエラー
    (Math.random as jest.Mock).mockReturnValue(0.1);
    fireEvent.click(fetchButton);
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    // 2回目は成功
    (Math.random as jest.Mock).mockReturnValue(0.8);
    fireEvent.click(fetchButton);
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('users')).toBeInTheDocument();
    });
    
    // エラーメッセージが消える
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  // ユーザー削除のテスト
  test('ユーザーを削除できる', async () => {
    (Math.random as jest.Mock).mockReturnValue(0.8);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // まずユーザーを取得
    fireEvent.click(fetchButton);
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('users')).toBeInTheDocument();
    });
    
    // 最初は3人のユーザーがいる
    expect(screen.getByTestId('user-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-2')).toBeInTheDocument();
    expect(screen.getByTestId('user-3')).toBeInTheDocument();
    
    // ユーザー1を削除
    const deleteButton = screen.getByTestId('delete-user-1');
    fireEvent.click(deleteButton);
    
    // 削除処理の待機（500ms）
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(screen.queryByTestId('user-1')).not.toBeInTheDocument();
    });
    
    // 他のユーザーは残っている
    expect(screen.getByTestId('user-2')).toBeInTheDocument();
    expect(screen.getByTestId('user-3')).toBeInTheDocument();
  });

  // 複数ユーザー削除のテスト
  test('複数のユーザーを順次削除できる', async () => {
    (Math.random as jest.Mock).mockReturnValue(0.8);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // ユーザーを取得
    fireEvent.click(fetchButton);
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('users')).toBeInTheDocument();
    });
    
    // ユーザー1を削除
    fireEvent.click(screen.getByTestId('delete-user-1'));
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(screen.queryByTestId('user-1')).not.toBeInTheDocument();
    });
    
    // ユーザー2を削除
    fireEvent.click(screen.getByTestId('delete-user-2'));
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(screen.queryByTestId('user-2')).not.toBeInTheDocument();
    });
    
    // ユーザー3を削除
    fireEvent.click(screen.getByTestId('delete-user-3'));
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(screen.queryByTestId('user-3')).not.toBeInTheDocument();
    });
    
    // 全ユーザー削除後はusersリストが非表示になる
    expect(screen.queryByTestId('users')).not.toBeInTheDocument();
  });

  // userEventを使用したテスト
  test('userEventを使用したユーザーインタラクション', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    (Math.random as jest.Mock).mockReturnValue(0.8);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // userEventでボタンクリック
    await user.click(fetchButton);
    
    // ローディング状態の確認
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // タイマーを進める
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('users')).toBeInTheDocument();
    });
    
    // userEventでユーザー削除
    const deleteButton = screen.getByTestId('delete-user-1');
    await user.click(deleteButton);
    
    jest.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(screen.queryByTestId('user-1')).not.toBeInTheDocument();
    });
  });

  // ローディング中のボタン無効化テスト
  test('ローディング中はボタンが無効化される', async () => {
    (Math.random as jest.Mock).mockReturnValue(0.8);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    // 初期状態では有効
    expect(fetchButton).not.toBeDisabled();
    
    // ボタンをクリック
    fireEvent.click(fetchButton);
    
    // ローディング中は無効
    expect(fetchButton).toBeDisabled();
    expect(fetchButton).toHaveTextContent('読み込み中...');
    
    // 処理完了後は再び有効
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(fetchButton).not.toBeDisabled();
    });
    
    expect(fetchButton).toHaveTextContent('ユーザーを取得');
  });

  // アクセシビリティのテスト
  test('エラーメッセージが適切なrole属性を持つ', async () => {
    (Math.random as jest.Mock).mockReturnValue(0.1);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    fireEvent.click(fetchButton);
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });

  // 見出しのテスト
  test('見出しが正しく表示される', () => {
    render(<UserList />);
    
    expect(screen.getByText('ユーザー一覧')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('ユーザー一覧');
  });

  // data-testidの存在確認
  test('すべての重要な要素にdata-testidが設定されている', async () => {
    (Math.random as jest.Mock).mockReturnValue(0.8);
    
    render(<UserList />);
    
    const fetchButton = screen.getByTestId('fetch-button');
    
    fireEvent.click(fetchButton);
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByTestId('users')).toBeInTheDocument();
    });
    
    // すべてのユーザー要素にtestidがあることを確認
    expect(screen.getByTestId('user-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-2')).toBeInTheDocument();
    expect(screen.getByTestId('user-3')).toBeInTheDocument();
    
    // すべての削除ボタンにtestidがあることを確認
    expect(screen.getByTestId('delete-user-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-user-2')).toBeInTheDocument();
    expect(screen.getByTestId('delete-user-3')).toBeInTheDocument();
  });
});