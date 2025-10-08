# Components

再利用可能なUIコンポーネントを格納するフォルダです。

## 作成予定のコンポーネント例

- Button（ボタン）
- Card（カード）
- Modal（モーダル）
- Header（ヘッダー）
- Footer（フッター）
- Navigation（ナビゲーション）

## 命名規則

- ファイル名: PascalCase（例: Button.tsx）
- コンポーネント名: PascalCase
- PropTypes: ComponentNameProps

## 例

```tsx
// Button.tsx
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};
```
