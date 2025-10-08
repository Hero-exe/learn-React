# Types

TypeScriptの型定義を格納するフォルダです。

## 作成予定の型定義例

- User（ユーザー情報）
- Product（商品情報）
- API（API関連の型）
- Form（フォーム関連の型）

## 命名規則

- ファイル名: camelCase（例: user.ts）
- 型名: PascalCase
- インターフェース名: PascalCase

## 例

```tsx
// user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export type UserStatus = 'active' | 'inactive' | 'pending';
```
