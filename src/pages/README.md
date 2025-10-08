# Pages

ページレベルのコンポーネントを格納するフォルダです。

## 作成予定のページ例

- Home（ホームページ）
- About（アバウトページ）
- Contact（コンタクトページ）
- Profile（プロフィールページ）

## 命名規則

- ファイル名: PascalCase（例: HomePage.tsx）
- コンポーネント名: ページ名 + Page

## 例

```tsx
// HomePage.tsx
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">ホームページ</h1>
        <p>ここにコンテンツが入ります</p>
      </main>
      <Footer />
    </div>
  );
};
```
