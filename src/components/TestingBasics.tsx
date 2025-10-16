import React, { useState } from 'react';

/**
 * テスト（Jest/React Testing Library）を学習するためのコンポーネント
 * 実際にテストを書きながらテストの基礎を学ぼう！
 */

// === 1. 基本的なテスト対象コンポーネント ===
interface CounterProps {
  initialValue?: number;
  step?: number;
}

export const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div data-testid="counter">
      <h3>カウンター</h3>
      <div data-testid="count-display">{count}</div>
      <button data-testid="increment-button" onClick={increment}>
        +{step}
      </button>
      <button data-testid="decrement-button" onClick={decrement}>
        -{step}
      </button>
      <button data-testid="reset-button" onClick={reset}>
        リセット
      </button>
    </div>
  );
};

// === 2. フォームテスト用コンポーネント ===
interface FormData {
  name: string;
  email: string;
  age: number;
  terms: boolean;
}

interface FormComponentProps {
  onSubmit: (data: FormData) => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    terms: false
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = '名前は必須です';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (formData.age < 0 || formData.age > 120) {
      newErrors.age = '年齢は0-120の範囲で入力してください';
    }

    if (!formData.terms) {
      newErrors.terms = '利用規約に同意してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form data-testid="user-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前:</label>
        <input
          id="name"
          data-testid="name-input"
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <div id="name-error" data-testid="name-error" role="alert">
            {errors.name}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email">メール:</label>
        <input
          id="email"
          data-testid="email-input"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <div id="email-error" data-testid="email-error" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="age">年齢:</label>
        <input
          id="age"
          data-testid="age-input"
          type="number"
          value={formData.age}
          onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
          aria-describedby={errors.age ? 'age-error' : undefined}
        />
        {errors.age && (
          <div id="age-error" data-testid="age-error" role="alert">
            {errors.age}
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            data-testid="terms-checkbox"
            type="checkbox"
            checked={formData.terms}
            onChange={(e) => updateField('terms', e.target.checked)}
          />
          利用規約に同意する
        </label>
        {errors.terms && (
          <div data-testid="terms-error" role="alert">
            {errors.terms}
          </div>
        )}
      </div>

      <button data-testid="submit-button" type="submit">
        送信
      </button>
    </form>
  );
};

// === 3. 非同期処理テスト用コンポーネント ===
interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      // モックAPI呼び出しをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 30%の確率でエラー
      if (Math.random() < 0.3) {
        throw new Error('ユーザーの取得に失敗しました');
      }

      const mockUsers: User[] = [
        { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com' },
        { id: 3, name: '山田次郎', email: 'yamada@example.com' }
      ];
      
      setUsers(mockUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      // 削除処理をシミュレート
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError('ユーザーの削除に失敗しました');
    }
  };

  return (
    <div data-testid="user-list">
      <h3>ユーザー一覧</h3>
      <button data-testid="fetch-button" onClick={fetchUsers} disabled={loading}>
        {loading ? '読み込み中...' : 'ユーザーを取得'}
      </button>

      {loading && <div data-testid="loading">読み込み中...</div>}
      
      {error && (
        <div data-testid="error-message" role="alert">
          {error}
        </div>
      )}

      {users.length > 0 && (
        <ul data-testid="users">
          {users.map(user => (
            <li key={user.id} data-testid={`user-${user.id}`}>
              <span>{user.name} ({user.email})</span>
              <button
                data-testid={`delete-user-${user.id}`}
                onClick={() => deleteUser(user.id)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// === 4. 条件レンダリングテスト用コンポーネント ===
interface WelcomeProps {
  user?: {
    name: string;
    isAdmin: boolean;
  };
}

export const Welcome: React.FC<WelcomeProps> = ({ user }) => {
  return (
    <div data-testid="welcome">
      {user ? (
        <div>
          <h3 data-testid="greeting">ようこそ、{user.name}さん！</h3>
          {user.isAdmin && (
            <div data-testid="admin-panel">
              <h4>管理者パネル</h4>
              <button data-testid="admin-button">管理画面へ</button>
            </div>
          )}
        </div>
      ) : (
        <div data-testid="login-prompt">
          <h3>ログインしてください</h3>
          <button data-testid="login-button">ログイン</button>
        </div>
      )}
    </div>
  );
};

// === 5. イベントハンドリングテスト用コンポーネント ===
interface ClickTrackerProps {
  onTrackedClick?: (count: number) => void;
}

export const ClickTracker: React.FC<ClickTrackerProps> = ({ onTrackedClick }) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState<string>('');

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setLastClickTime(new Date().toLocaleTimeString());
    onTrackedClick?.(newCount);
  };

  const handleDoubleClick = () => {
    setClickCount(0);
    setLastClickTime('');
  };

  return (
    <div data-testid="click-tracker">
      <h3>クリック追跡</h3>
      <div data-testid="click-count">クリック回数: {clickCount}</div>
      <div data-testid="last-click-time">
        最後のクリック: {lastClickTime || 'まだクリックされていません'}
      </div>
      <button
        data-testid="track-button"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        クリックして追跡
      </button>
      <small>ダブルクリックでリセット</small>
    </div>
  );
};

// === メインの学習コンポーネント ===
export const TestingBasics: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [trackedClicks, setTrackedClicks] = useState(0);
  const [currentUser, setCurrentUser] = useState<{ name: string; isAdmin: boolean } | undefined>();

  const handleFormSubmit = (data: FormData) => {
    setSubmittedData(data);
    alert('フォームが送信されました！');
  };

  const handleTrackedClick = (count: number) => {
    setTrackedClicks(count);
  };

  const toggleUser = () => {
    setCurrentUser(prev => 
      prev ? undefined : { name: '田中太郎', isAdmin: true }
    );
  };

  const testExamples = [
    {
      title: 'カウンターのテスト例',
      code: `// Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

test('初期値が正しく表示される', () => {
  render(<Counter initialValue={5} />);
  expect(screen.getByTestId('count-display')).toHaveTextContent('5');
});

test('インクリメントボタンが正しく動作する', () => {
  render(<Counter step={2} />);
  const incrementButton = screen.getByTestId('increment-button');
  const countDisplay = screen.getByTestId('count-display');
  
  fireEvent.click(incrementButton);
  expect(countDisplay).toHaveTextContent('2');
});`
    },
    {
      title: 'フォームのテスト例',
      code: `// FormComponent.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormComponent } from './FormComponent';

test('バリデーションエラーが表示される', async () => {
  const user = userEvent.setup();
  const mockSubmit = jest.fn();
  
  render(<FormComponent onSubmit={mockSubmit} />);
  
  await user.click(screen.getByTestId('submit-button'));
  
  expect(screen.getByTestId('name-error')).toBeInTheDocument();
  expect(mockSubmit).not.toHaveBeenCalled();
});`
    },
    {
      title: '非同期処理のテスト例',
      code: `// UserList.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserList } from './UserList';

test('ユーザー一覧が表示される', async () => {
  render(<UserList />);
  
  fireEvent.click(screen.getByTestId('fetch-button'));
  
  expect(screen.getByTestId('loading')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByTestId('users')).toBeInTheDocument();
  });
  
  expect(screen.getByText('田中太郎')).toBeInTheDocument();
});`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        🧪 テスト（Jest/React Testing Library）を学ぼう！
      </h1>

      <div className="space-y-8">
        {/* 概要説明 */}
        <section className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">
            🎯 テストの重要性
          </h2>
          <div className="text-sm text-blue-700 space-y-2">
            <p>• <strong>品質保証</strong>: バグを早期発見し、コードの品質を向上</p>
            <p>• <strong>リファクタリング</strong>: 安心してコードを改善できる</p>
            <p>• <strong>ドキュメント</strong>: テストがコードの仕様書になる</p>
            <p>• <strong>開発効率</strong>: 手動テストの時間を大幅に削減</p>
          </div>
        </section>

        {/* 1. カウンターコンポーネント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">1️⃣ 基本的なコンポーネントテスト</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h3 className="font-bold text-blue-700 mb-3">テスト対象: カウンター</h3>
              <Counter initialValue={10} step={5} />
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-3">テストのポイント:</h3>
              <ul className="text-sm space-y-1">
                <li>• data-testid属性でテスト用IDを設定</li>
                <li>• 初期値の表示確認</li>
                <li>• ボタンクリック後の状態変化</li>
                <li>• Propsの影響（step, initialValue）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. フォームコンポーネント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-600">2️⃣ フォームのテスト</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg bg-green-50">
              <h3 className="font-bold text-green-700 mb-3">テスト対象: ユーザーフォーム</h3>
              <FormComponent onSubmit={handleFormSubmit} />
              {submittedData && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <h4 className="font-bold text-sm">送信されたデータ:</h4>
                  <pre className="text-xs">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
              )}
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-3">テストのポイント:</h3>
              <ul className="text-sm space-y-1">
                <li>• フォーム入力のユーザーインタラクション</li>
                <li>• バリデーションエラーの表示</li>
                <li>• 送信処理の確認</li>
                <li>• アクセシビリティ属性の確認</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. 非同期処理コンポーネント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">3️⃣ 非同期処理のテスト</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg bg-yellow-50">
              <h3 className="font-bold text-yellow-700 mb-3">テスト対象: ユーザー一覧</h3>
              <UserList />
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-3">テストのポイント:</h3>
              <ul className="text-sm space-y-1">
                <li>• waitForを使った非同期処理の待機</li>
                <li>• ローディング状態の確認</li>
                <li>• エラー状態の確認</li>
                <li>• データ表示の確認</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. 条件レンダリングコンポーネント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">4️⃣ 条件レンダリングのテスト</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg bg-purple-50">
              <h3 className="font-bold text-purple-700 mb-3">テスト対象: Welcome画面</h3>
              <div className="space-y-3">
                <button
                  onClick={toggleUser}
                  className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                >
                  {currentUser ? 'ログアウト' : 'ログイン（管理者）'}
                </button>
                <Welcome user={currentUser} />
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-3">テストのポイント:</h3>
              <ul className="text-sm space-y-1">
                <li>• 条件による表示/非表示の確認</li>
                <li>• Propsによる表示内容の変化</li>
                <li>• 権限による機能の制御</li>
                <li>• 複数パターンのテストケース</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. イベントハンドリングコンポーネント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">5️⃣ イベントハンドリングのテスト</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg bg-indigo-50">
              <h3 className="font-bold text-indigo-700 mb-3">テスト対象: クリック追跡</h3>
              <ClickTracker onTrackedClick={handleTrackedClick} />
              <div className="mt-3 text-sm text-indigo-600">
                親コンポーネントで受信したクリック数: {trackedClicks}
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-3">テストのポイント:</h3>
              <ul className="text-sm space-y-1">
                <li>• クリックイベントのシミュレーション</li>
                <li>• コールバック関数の呼び出し確認</li>
                <li>• 複数回のイベント処理</li>
                <li>• ダブルクリックなど特殊なイベント</li>
              </ul>
            </div>
          </div>
        </section>

        {/* テストコード例 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-red-600">6️⃣ 実際のテストコード例</h2>
          <div className="space-y-4">
            {testExamples.map((example, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-gray-700 mb-3">{example.title}</h3>
                <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* テストツール説明 */}
        <section className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-700">
            🛠️ テストツールの説明
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">✅ Jest:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• JavaScript用テストフレームワーク</li>
                <li>• アサーション（expect）を提供</li>
                <li>• モック機能でテストを分離</li>
                <li>• テストカバレッジを測定</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🛠️ React Testing Library:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Reactコンポーネント専用テストライブラリ</li>
                <li>• ユーザー視点でのテストを重視</li>
                <li>• DOM操作とイベントシミュレーション</li>
                <li>• アクセシビリティを考慮したテスト</li>
              </ul>
            </div>
          </div>
        </section>

        {/* よく使うメソッド */}
        <section className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-purple-700">
            🔧 よく使うテストメソッド
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">要素の取得:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• getByTestId()</li>
                <li>• getByText()</li>
                <li>• getByRole()</li>
                <li>• getByLabelText()</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">イベント:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• fireEvent.click()</li>
                <li>• fireEvent.change()</li>
                <li>• userEvent.type()</li>
                <li>• userEvent.click()</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">アサーション:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• toBeInTheDocument()</li>
                <li>• toHaveTextContent()</li>
                <li>• toBeDisabled()</li>
                <li>• toHaveBeenCalled()</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 実習課題 */}
        <section className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-purple-700">
            🎯 実習課題
          </h2>
          <div className="bg-white p-3 rounded border">
            <p className="mb-2">以下を試してみよう：</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>各コンポーネントを操作して動作を確認する</li>
              <li>テストコード例を参考に、実際のテストファイルを作成してみる</li>
              <li>data-testid属性の重要性を理解する</li>
              <li>非同期処理のテストでwaitForの使い方を学ぶ</li>
              <li>フォームバリデーションのテストを書いてみる</li>
              <li>独自のコンポーネントにテストを追加してみる</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};