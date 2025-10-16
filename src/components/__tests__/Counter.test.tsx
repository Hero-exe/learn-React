import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../TestingBasics';

describe('Counter Component', () => {
  // 基本的なレンダリングテスト
  test('初期値0で正しくレンダリングされる', () => {
    render(<Counter />);
    
    // カウンター要素が存在することを確認
    expect(screen.getByTestId('counter')).toBeInTheDocument();
    
    // 初期値が0で表示されることを確認
    expect(screen.getByTestId('count-display')).toHaveTextContent('0');
    
    // ボタンが存在することを確認
    expect(screen.getByTestId('increment-button')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-button')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
  });

  // Propsのテスト
  test('initialValueプロパティが正しく動作する', () => {
    render(<Counter initialValue={10} />);
    
    // 初期値が10で表示されることを確認
    expect(screen.getByTestId('count-display')).toHaveTextContent('10');
  });

  test('stepプロパティが正しく動作する', () => {
    render(<Counter initialValue={0} step={5} />);
    
    // ボタンのテキストにstep値が反映されることを確認
    expect(screen.getByTestId('increment-button')).toHaveTextContent('+5');
    expect(screen.getByTestId('decrement-button')).toHaveTextContent('-5');
  });

  // インクリメントボタンのテスト
  test('インクリメントボタンをクリックすると値が増加する', () => {
    render(<Counter initialValue={0} step={1} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countDisplay = screen.getByTestId('count-display');
    
    // 1回クリック
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('1');
    
    // もう1回クリック
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('2');
  });

  test('インクリメントボタンをクリックするとstep分増加する', () => {
    render(<Counter initialValue={0} step={3} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('3');
    
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('6');
  });

  // デクリメントボタンのテスト
  test('デクリメントボタンをクリックすると値が減少する', () => {
    render(<Counter initialValue={5} step={1} />);
    
    const decrementButton = screen.getByTestId('decrement-button');
    const countDisplay = screen.getByTestId('count-display');
    
    // 1回クリック
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('4');
    
    // もう1回クリック
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('3');
  });

  test('デクリメントボタンをクリックするとstep分減少する', () => {
    render(<Counter initialValue={10} step={4} />);
    
    const decrementButton = screen.getByTestId('decrement-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('6');
    
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('2');
  });

  // リセットボタンのテスト
  test('リセットボタンをクリックすると初期値に戻る', () => {
    render(<Counter initialValue={7} step={2} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const resetButton = screen.getByTestId('reset-button');
    const countDisplay = screen.getByTestId('count-display');
    
    // 初期値の確認
    expect(countDisplay).toHaveTextContent('7');
    
    // 値を変更
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('11');
    
    // リセット
    fireEvent.click(resetButton);
    expect(countDisplay).toHaveTextContent('7');
  });

  // 複数の操作のテスト
  test('複数の操作を組み合わせて正しく動作する', () => {
    render(<Counter initialValue={0} step={2} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    const resetButton = screen.getByTestId('reset-button');
    const countDisplay = screen.getByTestId('count-display');
    
    // 初期値の確認
    expect(countDisplay).toHaveTextContent('0');
    
    // インクリメント × 3
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('6');
    
    // デクリメント × 1
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('4');
    
    // リセット
    fireEvent.click(resetButton);
    expect(countDisplay).toHaveTextContent('0');
  });

  // userEventを使ったテスト（より実際のユーザー操作に近い）
  test('userEventを使用したインタラクションテスト', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={1} step={1} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countDisplay = screen.getByTestId('count-display');
    
    // userEventでクリック
    await user.click(incrementButton);
    expect(countDisplay).toHaveTextContent('2');
    
    await user.click(incrementButton);
    expect(countDisplay).toHaveTextContent('3');
  });

  // 負の値のテスト
  test('負の初期値でも正しく動作する', () => {
    render(<Counter initialValue={-5} step={2} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    const countDisplay = screen.getByTestId('count-display');
    
    // 初期値の確認
    expect(countDisplay).toHaveTextContent('-5');
    
    // インクリメント
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('-3');
    
    // デクリメント
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('-5');
  });

  // 大きなstep値のテスト
  test('大きなstep値でも正しく動作する', () => {
    render(<Counter initialValue={0} step={100} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('100');
    
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('200');
  });

  // アクセシビリティのテスト
  test('ボタンが適切なテキストを持っている', () => {
    render(<Counter step={3} />);
    
    // ボタンのテキストが適切であることを確認
    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(screen.getByText('-3')).toBeInTheDocument();
    expect(screen.getByText('リセット')).toBeInTheDocument();
  });

  test('見出しが正しく表示される', () => {
    render(<Counter />);
    
    expect(screen.getByText('カウンター')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('カウンター');
  });
});