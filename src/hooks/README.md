# Custom Hooks

カスタムフックを格納するフォルダです。

## 作成予定のフック例

- useLocalStorage（ローカルストレージ）
- useFetch（APIデータ取得）
- useDebounce（デバウンス処理）
- useToggle（真偽値の切り替え）

## 命名規則

- ファイル名: camelCase（例: useLocalStorage.ts）
- フック名: use + 機能名

## 例

```tsx
// useCounter.ts
import { useState } from 'react';

export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};
```
