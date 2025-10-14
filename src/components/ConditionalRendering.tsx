import React, { useState } from 'react';

/**
 * 条件分岐レンダリングを学習するためのコンポーネント
 * 様々な条件によってUIを動的に変える方法を実際に試してみよう！
 */

// === 1. 基本的な条件分岐（三項演算子） ===
const BasicConditional: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('田中太郎');

  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h3 className="font-bold text-blue-700 mb-3">基本的な条件分岐（三項演算子）</h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-white rounded border">
          {isLoggedIn ? (
            <div>
              <h4 className="font-bold text-green-600">ようこそ、{username}さん！</h4>
              <p className="text-sm text-gray-600">ログイン中です</p>
            </div>
          ) : (
            <div>
              <h4 className="font-bold text-red-600">ログインしてください</h4>
              <p className="text-sm text-gray-600">アカウントにアクセスするにはログインが必要です</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className={`px-4 py-2 rounded text-white ${
            isLoggedIn 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoggedIn ? 'ログアウト' : 'ログイン'}
        </button>

        <div className="text-sm text-gray-600">
          <p>現在の状態: {isLoggedIn ? '✅ ログイン済み' : '❌ 未ログイン'}</p>
        </div>
      </div>
    </div>
  );
};

// === 2. 論理AND演算子（&&）を使った条件レンダリング ===
const LogicalAndRendering: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notificationCount, setNotificationCount] = useState(5);

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold text-green-700 mb-3">論理AND演算子（&&）を使った条件レンダリング</h3>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowMessage(!showMessage)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            メッセージ表示切り替え
          </button>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            詳細表示切り替え
          </button>
          
          <button
            onClick={() => setHasNotifications(!hasNotifications)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            通知ON/OFF
          </button>
        </div>

        {/* &&演算子による条件レンダリング */}
        {showMessage && (
          <div className="p-3 bg-white rounded border border-green-300">
            <h4 className="font-bold text-green-600">📢 重要なお知らせ</h4>
            <p className="text-sm">このメッセージは条件がtrueの時だけ表示されます！</p>
          </div>
        )}

        {showDetails && (
          <div className="p-3 bg-white rounded border border-green-300">
            <h4 className="font-bold text-green-600">📋 詳細情報</h4>
            <ul className="text-sm space-y-1">
              <li>• この詳細も条件による表示です</li>
              <li>• showDetailsがtrueの時のみ表示</li>
              <li>• falseの時は完全に非表示</li>
            </ul>
          </div>
        )}

        {hasNotifications && (
          <div className="p-3 bg-yellow-100 rounded border border-yellow-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-yellow-700">🔔 通知</h4>
                <p className="text-sm text-yellow-600">
                  {notificationCount}件の新しい通知があります
                </p>
              </div>
              <button
                onClick={() => setNotificationCount(prev => Math.max(0, prev - 1))}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
              >
                1件読む
              </button>
            </div>
          </div>
        )}

        {/* 通知数が0の場合の表示 */}
        {hasNotifications && notificationCount === 0 && (
          <div className="p-3 bg-green-100 rounded border border-green-300">
            <p className="text-green-700">✅ すべての通知を読みました！</p>
          </div>
        )}

        <div className="text-sm text-gray-600 space-y-1">
          <p>showMessage: {showMessage ? 'true' : 'false'}</p>
          <p>showDetails: {showDetails ? 'true' : 'false'}</p>
          <p>hasNotifications: {hasNotifications ? 'true' : 'false'}</p>
          <p>notificationCount: {notificationCount}</p>
        </div>
      </div>
    </div>
  );
};

// === 3. 複数の条件による分岐 ===
const MultipleConditions: React.FC = () => {
  const [userRole, setUserRole] = useState<'guest' | 'user' | 'admin' | 'super'>('guest');
  const [isPremium, setIsPremium] = useState(false);

  const renderRoleContent = () => {
    if (userRole === 'super') {
      return (
        <div className="p-3 bg-purple-100 border border-purple-300 rounded">
          <h4 className="font-bold text-purple-700">👑 スーパー管理者</h4>
          <p className="text-sm">すべての機能にアクセス可能です</p>
          <ul className="text-xs mt-2 space-y-1">
            <li>✅ 全ユーザー管理</li>
            <li>✅ システム設定</li>
            <li>✅ データ管理</li>
            <li>✅ セキュリティ設定</li>
          </ul>
        </div>
      );
    } else if (userRole === 'admin') {
      return (
        <div className="p-3 bg-red-100 border border-red-300 rounded">
          <h4 className="font-bold text-red-700">⚡ 管理者</h4>
          <p className="text-sm">管理機能が利用できます</p>
          <ul className="text-xs mt-2 space-y-1">
            <li>✅ ユーザー管理</li>
            <li>✅ コンテンツ管理</li>
            <li>❌ システム設定</li>
          </ul>
        </div>
      );
    } else if (userRole === 'user') {
      return (
        <div className="p-3 bg-blue-100 border border-blue-300 rounded">
          <h4 className="font-bold text-blue-700">👤 一般ユーザー</h4>
          <p className="text-sm">基本機能が利用できます</p>
          <ul className="text-xs mt-2 space-y-1">
            <li>✅ プロフィール編集</li>
            <li>✅ コンテンツ閲覧</li>
            <li>{isPremium ? '✅' : '❌'} プレミアム機能</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="p-3 bg-gray-100 border border-gray-300 rounded">
          <h4 className="font-bold text-gray-700">🚶 ゲスト</h4>
          <p className="text-sm">限定的な機能のみ利用可能</p>
          <ul className="text-xs mt-2 space-y-1">
            <li>✅ 基本的な閲覧</li>
            <li>❌ プロフィール機能</li>
            <li>❌ 高度な機能</li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-purple-50">
      <h3 className="font-bold text-purple-700 mb-3">複数の条件による分岐</h3>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(['guest', 'user', 'admin', 'super'] as const).map(role => (
            <button
              key={role}
              onClick={() => setUserRole(role)}
              className={`px-3 py-1 rounded text-sm ${
                userRole === role
                  ? 'bg-purple-600 text-white'
                  : 'bg-white border border-purple-300 text-purple-600 hover:bg-purple-100'
              }`}
            >
              {role === 'guest' && '🚶 ゲスト'}
              {role === 'user' && '👤 ユーザー'}
              {role === 'admin' && '⚡ 管理者'}
              {role === 'super' && '👑 スーパー管理者'}
            </button>
          ))}
        </div>

        {userRole === 'user' && (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">プレミアム会員</span>
          </label>
        )}

        {renderRoleContent()}

        {/* 特別な組み合わせ条件 */}
        {userRole === 'user' && isPremium && (
          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
            <h4 className="font-bold text-yellow-700">⭐ プレミアム特典</h4>
            <p className="text-sm">プレミアム会員限定の特別機能が利用できます！</p>
          </div>
        )}
      </div>
    </div>
  );
};

// === 4. 配列・オブジェクトの条件レンダリング ===
const ArrayObjectConditional: React.FC = () => {
  const [items, setItems] = useState<string[]>(['React', 'TypeScript', 'Vite']);
  const [user, setUser] = useState<{name: string; age: number} | null>({
    name: '田中太郎',
    age: 25
  });
  const [showEmptyMessage, setShowEmptyMessage] = useState(true);

  const addItem = () => {
    const newItems = ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'Next.js'];
    const randomItem = newItems[Math.floor(Math.random() * newItems.length)];
    if (!items.includes(randomItem)) {
      setItems([...items, randomItem]);
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold text-yellow-700 mb-3">配列・オブジェクトの条件レンダリング</h3>
      
      <div className="space-y-4">
        {/* 配列の条件レンダリング */}
        <div>
          <h4 className="font-semibold mb-2">📚 学習技術リスト</h4>
          
          {items.length > 0 ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white px-3 py-1 rounded border"
                  >
                    <span className="text-sm">{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600">合計: {items.length}個の技術</p>
            </div>
          ) : (
            showEmptyMessage && (
              <div className="p-3 bg-gray-100 rounded border">
                <p className="text-gray-600">まだ技術が登録されていません</p>
                <p className="text-xs text-gray-500">下のボタンで技術を追加してみましょう</p>
              </div>
            )
          )}

          <div className="flex space-x-2 mt-3">
            <button
              onClick={addItem}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
            >
              ランダム追加
            </button>
            <button
              onClick={() => setItems([])}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              全削除
            </button>
            <button
              onClick={() => setShowEmptyMessage(!showEmptyMessage)}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              空メッセージ切替
            </button>
          </div>
        </div>

        {/* オブジェクトの条件レンダリング */}
        <div>
          <h4 className="font-semibold mb-2">👤 ユーザー情報</h4>
          
          {user ? (
            <div className="p-3 bg-white rounded border">
              <h5 className="font-bold">{user.name}</h5>
              <p className="text-sm text-gray-600">{user.age}歳</p>
              {user.age >= 20 && (
                <p className="text-xs text-green-600">✅ 成人です</p>
              )}
              {user.age >= 65 && (
                <p className="text-xs text-blue-600">🎂 シニア割引対象です</p>
              )}
            </div>
          ) : (
            <div className="p-3 bg-gray-100 rounded border">
              <p className="text-gray-600">ユーザー情報がありません</p>
            </div>
          )}

          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => setUser(user ? null : {name: '田中太郎', age: 25})}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              {user ? 'ユーザー削除' : 'ユーザー復元'}
            </button>
            {user && (
              <button
                onClick={() => setUser({...user, age: user.age + 1})}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              >
                年齢+1
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// === 5. ローディングとエラー状態の条件レンダリング ===
const LoadingErrorStates: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const simulateApiCall = () => {
    setStatus('loading');
    setError('');
    
    // 3秒後にランダムで成功/失敗
    setTimeout(() => {
      if (Math.random() > 0.3) {
        setData(['データ1', 'データ2', 'データ3', 'データ4']);
        setStatus('success');
      } else {
        setError('データの取得に失敗しました');
        setStatus('error');
      }
    }, 3000);
  };

  const reset = () => {
    setStatus('idle');
    setData([]);
    setError('');
  };

  return (
    <div className="p-4 border rounded-lg bg-indigo-50">
      <h3 className="font-bold text-indigo-700 mb-3">ローディングとエラー状態の条件レンダリング</h3>
      
      <div className="space-y-3">
        <div className="flex space-x-2">
          <button
            onClick={simulateApiCall}
            disabled={status === 'loading'}
            className={`px-4 py-2 rounded text-white ${
              status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            {status === 'loading' ? 'データ取得中...' : 'データを取得'}
          </button>
          
          <button
            onClick={reset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            リセット
          </button>
        </div>

        <div className="min-h-32">
          {status === 'idle' && (
            <div className="p-4 bg-white rounded border text-center">
              <p className="text-gray-600">「データを取得」ボタンをクリックしてください</p>
            </div>
          )}

          {status === 'loading' && (
            <div className="p-4 bg-white rounded border text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                <span className="text-indigo-600">データを取得中...</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">しばらくお待ちください（3秒）</p>
            </div>
          )}

          {status === 'success' && (
            <div className="p-4 bg-green-100 border border-green-300 rounded">
              <h4 className="font-bold text-green-700 mb-2">✅ データ取得成功</h4>
              <div className="space-y-1">
                {data.map((item, index) => (
                  <div key={index} className="bg-white p-2 rounded border text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-100 border border-red-300 rounded">
              <h4 className="font-bold text-red-700 mb-2">❌ エラーが発生しました</h4>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={simulateApiCall}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                再試行
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p>現在の状態: {status}</p>
          <p>💡 約30%の確率でエラーが発生します</p>
        </div>
      </div>
    </div>
  );
};

// === メインの学習コンポーネント ===
export const ConditionalRendering: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        🔀 条件分岐レンダリングを学ぼう！
      </h1>

      <div className="space-y-6">
        {/* 1. 基本的な条件分岐 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">1️⃣ 基本的な条件分岐（三項演算子）</h2>
          <BasicConditional />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`{isLoggedIn ? <div>ログイン中</div> : <div>ログインしてください</div>}
// 条件 ? true時の表示 : false時の表示`}
            </code>
          </div>
        </section>

        {/* 2. 論理AND演算子 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-600">2️⃣ 論理AND演算子（&&）を使った条件レンダリング</h2>
          <LogicalAndRendering />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`{showMessage && <div>メッセージ</div>}
// 条件がtrueの時のみ表示、falseの時は何も表示しない`}
            </code>
          </div>
        </section>

        {/* 3. 複数の条件 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">3️⃣ 複数の条件による分岐</h2>
          <MultipleConditions />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`if (role === 'admin') {
  return <AdminPanel />;
} else if (role === 'user') {
  return <UserPanel />;
} else {
  return <GuestPanel />;
}`}
            </code>
          </div>
        </section>

        {/* 4. 配列・オブジェクトの条件 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">4️⃣ 配列・オブジェクトの条件レンダリング</h2>
          <ArrayObjectConditional />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`{items.length > 0 ? (
  items.map(item => <div key={item}>{item}</div>)
) : (
  <div>アイテムがありません</div>
)}
{user && <div>{user.name}</div>}`}
            </code>
          </div>
        </section>

        {/* 5. ローディングとエラー状態 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">5️⃣ ローディングとエラー状態の条件レンダリング</h2>
          <LoadingErrorStates />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`{status === 'loading' && <LoadingSpinner />}
{status === 'error' && <ErrorMessage />}
{status === 'success' && <DataDisplay />}`}
            </code>
          </div>
        </section>

        {/* 学習ポイント */}
        <section className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-700">
            🎯 条件分岐レンダリングの重要ポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">✅ 条件分岐の方法:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• 三項演算子: <code>condition ? true : false</code></li>
                <li>• 論理AND: <code>condition && &lt;Component /&gt;</code></li>
                <li>• if文: 関数内でif文を使って分岐</li>
                <li>• switch文: 複数の条件を整理</li>
                <li>• 即座実行関数: 複雑な条件をJSX内で</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🛠️ 使い分けのガイド:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• 二択: 三項演算子</li>
                <li>• 表示/非表示: 論理AND演算子</li>
                <li>• 複数パターン: if文や関数</li>
                <li>• 配列チェック: length や null チェック</li>
                <li>• ローディング状態: ステート管理</li>
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
              <li>ログイン/ログアウトボタンで状態を切り替えてUIの変化を確認</li>
              <li>&&演算子で表示される各要素の条件を変更してみる</li>
              <li>ユーザーロールを変更して、異なる権限での表示を確認</li>
              <li>配列にアイテムを追加・削除して動的な表示を体験</li>
              <li>API取得シミュレーションでローディング&エラー処理を確認</li>
              <li>独自の条件分岐コンポーネントを作成してみる</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};