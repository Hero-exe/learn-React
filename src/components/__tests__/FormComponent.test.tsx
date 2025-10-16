import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormComponent } from '../TestingBasics';

describe('FormComponent', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  // 基本的なレンダリングテスト
  test('フォームが正しくレンダリングされる', () => {
    render(<FormComponent onSubmit={mockSubmit} />);
    
    // フォーム要素が存在することを確認
    expect(screen.getByTestId('user-form')).toBeInTheDocument();
    
    // 各入力フィールドが存在することを確認
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('age-input')).toBeInTheDocument();
    expect(screen.getByTestId('terms-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    
    // ラベルが存在することを確認
    expect(screen.getByLabelText('名前:')).toBeInTheDocument();
    expect(screen.getByLabelText('メール:')).toBeInTheDocument();
    expect(screen.getByLabelText('年齢:')).toBeInTheDocument();
  });

  // 入力フィールドのテスト
  test('名前フィールドに入力できる', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    
    await user.type(nameInput, '田中太郎');
    expect(nameInput).toHaveValue('田中太郎');
  });

  test('メールフィールドに入力できる', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByTestId('email-input');
    
    await user.type(emailInput, 'tanaka@example.com');
    expect(emailInput).toHaveValue('tanaka@example.com');
  });

  test('年齢フィールドに数値を入力できる', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const ageInput = screen.getByTestId('age-input');
    
    await user.type(ageInput, '25');
    expect(ageInput).toHaveValue(25);
  });

  test('チェックボックスをクリックできる', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const termsCheckbox = screen.getByTestId('terms-checkbox');
    
    expect(termsCheckbox).not.toBeChecked();
    
    await user.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
    
    await user.click(termsCheckbox);
    expect(termsCheckbox).not.toBeChecked();
  });

  // バリデーションテスト
  test('空の名前でバリデーションエラーが表示される', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByTestId('submit-button');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toHaveTextContent('名前は必須です');
    });
    expect(mockSubmit).not.toHaveBeenCalled();
  });



  test('利用規約に同意しないとバリデーションエラーが表示される', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const ageInput = screen.getByTestId('age-input');
    const submitButton = screen.getByTestId('submit-button');
    
    // 有効な値を入力（利用規約以外）
    await user.type(nameInput, '田中太郎');
    await user.type(emailInput, 'tanaka@example.com');
    await user.type(ageInput, '25');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('terms-error')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('terms-error')).toHaveTextContent('利用規約に同意してください');
    });
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  // 複数のバリデーションエラー
  test('複数のバリデーションエラーが同時に表示される', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByTestId('submit-button');
    
    // 何も入力せずに送信
    await user.click(submitButton);
    
    // 複数のエラーが表示されることを確認
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
      expect(screen.getByTestId('email-error')).toBeInTheDocument();
      expect(screen.getByTestId('terms-error')).toBeInTheDocument();
    });
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  // エラークリア機能のテスト
  test('入力を修正するとエラーがクリアされる', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const submitButton = screen.getByTestId('submit-button');
    
    // まずエラーを発生させる
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
    });
    
    // 名前を入力してエラーをクリア
    await user.type(nameInput, '田中太郎');
    await waitFor(() => {
      expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    });
  });

  // 正常なフォーム送信のテスト
  test('有効なデータでフォームが送信される', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const ageInput = screen.getByTestId('age-input');
    const termsCheckbox = screen.getByTestId('terms-checkbox');
    const submitButton = screen.getByTestId('submit-button');
    
    // 有効なデータを入力
    await user.type(nameInput, '田中太郎');
    await user.type(emailInput, 'tanaka@example.com');
    await user.type(ageInput, '25');
    await user.click(termsCheckbox);
    
    // フォームを送信
    await user.click(submitButton);
    
    // onSubmitが正しいデータで呼び出されることを確認
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      name: '田中太郎',
      email: 'tanaka@example.com',
      age: 25,
      terms: true
    });
  });

  // エッジケースのテスト
  test('年齢0で正常に送信される', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const ageInput = screen.getByTestId('age-input');
    const termsCheckbox = screen.getByTestId('terms-checkbox');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(nameInput, '新生児');
    await user.type(emailInput, 'baby@example.com');
    await user.clear(ageInput);
    await user.type(ageInput, '0');
    await user.click(termsCheckbox);
    
    await user.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      name: '新生児',
      email: 'baby@example.com',
      age: 0,
      terms: true
    });
  });

  test('年齢120で正常に送信される', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const ageInput = screen.getByTestId('age-input');
    const termsCheckbox = screen.getByTestId('terms-checkbox');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.type(nameInput, '高齢者');
    await user.type(emailInput, 'elder@example.com');
    await user.clear(ageInput);
    await user.type(ageInput, '120');
    await user.click(termsCheckbox);
    
    await user.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      name: '高齢者',
      email: 'elder@example.com',
      age: 120,
      terms: true
    });
  });

  // アクセシビリティのテスト
  test('エラーメッセージがaria-describedbyで関連付けられている', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const submitButton = screen.getByTestId('submit-button');
    
    await user.click(submitButton);
    
    // エラーが表示された後、aria-describedbyが設定されることを確認
    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
    });
    
    // エラーメッセージがrole="alert"を持つことを確認
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toHaveAttribute('role', 'alert');
    });
  });

  // フォームリセットのテスト
  test('フォーム送信後も入力値が保持される', async () => {
    const user = userEvent.setup();
    render(<FormComponent onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const ageInput = screen.getByTestId('age-input');
    const termsCheckbox = screen.getByTestId('terms-checkbox');
    const submitButton = screen.getByTestId('submit-button');
    
    // データを入力して送信
    await user.type(nameInput, '田中太郎');
    await user.type(emailInput, 'tanaka@example.com');
    await user.type(ageInput, '25');
    await user.click(termsCheckbox);
    await user.click(submitButton);
    
    // 送信後も値が保持されることを確認
    expect(nameInput).toHaveValue('田中太郎');
    expect(emailInput).toHaveValue('tanaka@example.com');
    expect(ageInput).toHaveValue(25);
    expect(termsCheckbox).toBeChecked();
  });
});