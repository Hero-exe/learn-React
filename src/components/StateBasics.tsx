import React, { useState } from 'react';

/**
 * State（状態）の管理を学習するためのコンポーネント
 * useStateフックの使い方と状態管理のパターンを実際に試してみよう！
 */

// === 1. 最もシンプルなStateの使用例 ===
const SimpleCounter: React.FC = () => {
  // useState(初期値) → [現在の値, 更新関数]
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h3 className="font-bold text-blue-700 mb-3">シンプルなカウンター</h3>
      <div className="text-center space-y-3">
        <p className="text-2xl font-bold text-blue-600">カウント: {count}</p>
        <div className="space-x-2">
          <button
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            ➕ 増やす
          </button>
          <button
            onClick={() => setCount(count - 1)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            ➖ 減らす
          </button>
          <button
            onClick={() => setCount(0)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:gray-blue-600"
          >
            🔄 リセット
          </button>
        </div>
      </div>
    </div>
  );
};

// === 2. 文字列Stateの管理 ===
const TextInput: React.FC = () => {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  const handleSave = () => {
    setSavedText(text);
    setText(''); // 入力欄をクリア
  };

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold text-green-700 mb-3">文字列の状態管理</h3>
      <div className="space-y-3">
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="何か入力してください..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={text.trim() === ''}
            className={`px-4 py-2 rounded text-white ${
              text.trim() === ''
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            💾 保存
          </button>
          <button
            onClick={() => setText('')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            🗑️ クリア
          </button>
        </div>
        {savedText && (
          <div className="p-3 bg-white rounded border">
            <p className="text-sm text-gray-600">保存されたテキスト:</p>
            <p className="font-semibold text-green-700">"{savedText}"</p>
          </div>
        )}
        <div className="text-sm text-gray-600">
          <p>現在の入力文字数: {text.length}文字</p>
          <p>入力中のテキスト: "{text}"</p>
        </div>
      </div>
    </div>
  );
};

// === 3. 真偽値（boolean）Stateの管理 ===
const ToggleSwitch: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`p-4 border rounded-lg transition-colors ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-purple-50 text-gray-800'
    }`}>
      <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
        真偽値の状態管理
      </h3>
      <div className="space-y-4">
        {/* オン/オフスイッチ */}
        <div className="flex items-center justify-between">
          <span>電源スイッチ:</span>
          <button
            onClick={() => setIsOn(!isOn)}
            className={`w-12 h-6 rounded-full transition-colors ${
              isOn ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              isOn ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        {/* ダークモード切り替え */}
        <div className="flex items-center justify-between">
          <span>ダークモード:</span>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-3 py-1 rounded text-sm ${
              isDarkMode 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-white'
            }`}
          >
            {isDarkMode ? '☀️ ライト' : '🌙 ダーク'}
          </button>
        </div>

        {/* 詳細表示切り替え */}
        <div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`mb-2 px-4 py-2 rounded transition-colors ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {showDetails ? '▼ 詳細を非表示' : '▶ 詳細を表示'}
          </button>
          {showDetails && (
            <div className={`p-3 rounded border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
            }`}>
              <h4 className="font-bold mb-2">詳細情報</h4>
              <ul className="text-sm space-y-1">
                <li>電源状態: {isOn ? '✅ ON' : '❌ OFF'}</li>
                <li>テーマ: {isDarkMode ? '🌙 ダーク' : '☀️ ライト'}</li>
                <li>詳細表示: {showDetails ? '👁️ 表示中' : '🙈 非表示'}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// === 4. 配列Stateの管理 ===
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([
    'Reactを学ぶ',
    'Stateを理解する',
    'Propsをマスターする'
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo.trim()]); // スプレッド演算子で新しい配列を作成
      setNewTodo('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index)); // filter で該当アイテムを除外
  };

  const moveTodoUp = (index: number) => {
    if (index > 0) {
      const newTodos = [...todos];
      [newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]];
      setTodos(newTodos);
    }
  };

  const moveTodoDown = (index: number) => {
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
      setTodos(newTodos);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold text-yellow-700 mb-3">配列の状態管理（TODOリスト）</h3>
      
      {/* 新しいTODO追加 */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいタスクを入力..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addTodo}
          disabled={newTodo.trim() === ''}
          className={`px-4 py-2 rounded text-white ${
            newTodo.trim() === ''
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          ➕ 追加
        </button>
      </div>

      {/* TODOリスト表示 */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">タスクがありません</p>
        ) : (
          todos.map((todo, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
              <span className="flex-1">{index + 1}. {todo}</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => moveTodoUp(index)}
                  disabled={index === 0}
                  className={`w-8 h-8 rounded text-sm ${
                    index === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveTodoDown(index)}
                  disabled={index === todos.length - 1}
                  className={`w-8 h-8 rounded text-sm ${
                    index === todos.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  ↓
                </button>
                <button
                  onClick={() => removeTodo(index)}
                  className="w-8 h-8 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-3 text-sm text-gray-600">
        <p>総タスク数: {todos.length}個</p>
      </div>
    </div>
  );
};

// === 5. オブジェクトStateの管理 ===
interface UserProfile {
  name: string;
  email: string;
  age: number;
  isPublic: boolean;
}

const ProfileEditor: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '田中太郎',
    email: 'tanaka@example.com',
    age: 25,
    isPublic: true
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const startEdit = () => {
    setTempProfile(profile); // 現在の値をテンポラリにコピー
    setEditMode(true);
  };

  const saveProfile = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  const cancelEdit = () => {
    setTempProfile(profile); // 元の値に戻す
    setEditMode(false);
  };

  const updateTempProfile = (field: keyof UserProfile, value: string | number | boolean) => {
    setTempProfile(prev => ({
      ...prev, // 既存のプロパティをコピー
      [field]: value // 特定のフィールドだけ更新
    }));
  };

  return (
    <div className="p-4 border rounded-lg bg-indigo-50">
      <h3 className="font-bold text-indigo-700 mb-3">オブジェクトの状態管理（プロフィール編集）</h3>
      
      {editMode ? (
        // 編集モード
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">名前:</label>
            <input
              type="text"
              value={tempProfile.name}
              onChange={(e) => updateTempProfile('name', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">メールアドレス:</label>
            <input
              type="email"
              value={tempProfile.email}
              onChange={(e) => updateTempProfile('email', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">年齢:</label>
            <input
              type="number"
              value={tempProfile.age}
              onChange={(e) => updateTempProfile('age', parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={tempProfile.isPublic}
              onChange={(e) => updateTempProfile('isPublic', e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isPublic" className="text-sm">プロフィールを公開する</label>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={saveProfile}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              💾 保存
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ❌ キャンセル
            </button>
          </div>
        </div>
      ) : (
        // 表示モード
        <div className="space-y-3">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-bold text-lg">{profile.name}</h4>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-sm text-gray-500">{profile.age}歳</p>
            <p className="text-xs text-gray-400">
              {profile.isPublic ? '🌍 公開プロフィール' : '🔒 非公開プロフィール'}
            </p>
          </div>
          
          <button
            onClick={startEdit}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            ✏️ 編集
          </button>
        </div>
      )}
    </div>
  );
};

// === 6. 複数のStateを組み合わせた例（ショッピングカート） ===
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: 'React入門書', price: 3000 },
    { id: 2, name: 'TypeScript完全ガイド', price: 4500 },
    { id: 3, name: 'JavaScript基礎', price: 2800 }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // 既存のアイテムの数量を増やす
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // 新しいアイテムを追加
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-4 border rounded-lg bg-pink-50">
      <h3 className="font-bold text-pink-700 mb-3">複合的な状態管理（ショッピングカート）</h3>
      
      {/* 商品一覧 */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">商品一覧</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {products.map(product => (
            <div key={product.id} className="p-3 bg-white border rounded">
              <h5 className="font-medium">{product.name}</h5>
              <p className="text-gray-600">¥{product.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-pink-500 text-white py-1 rounded hover:bg-pink-600"
              >
                🛒 カートに追加
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* カート表示ボタン */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          🛒 カート ({totalItems}個) ¥{totalAmount.toLocaleString()}
        </button>
        {cart.length > 0 && (
          <button
            onClick={() => setCart([])}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            🗑️ カートを空にする
          </button>
        )}
      </div>

      {/* カートの中身 */}
      {isCartOpen && (
        <div className="p-3 bg-white border rounded">
          <h4 className="font-semibold mb-3">カートの中身</h4>
          {cart.length === 0 ? (
            <p className="text-gray-500">カートは空です</p>
          ) : (
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600 ml-2">¥{item.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 bg-gray-300 rounded text-sm hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-gray-300 rounded text-sm hover:bg-gray-400"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right font-bold text-lg pt-2">
                合計: ¥{totalAmount.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// === メインの学習コンポーネント ===
export const StateBasics: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        📊 State（状態）の管理を学ぼう！
      </h1>

      <div className="space-y-6">
        {/* 1. シンプルなState */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">1️⃣ 基本的なState（数値）</h2>
          <SimpleCounter />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`const [count, setCount] = useState(0);
// count: 現在の値
// setCount: 値を更新する関数
// useState(0): 初期値は0`}
            </code>
          </div>
        </section>

        {/* 2. 文字列State */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-600">2️⃣ 文字列のState管理</h2>
          <TextInput />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`const [text, setText] = useState('');
// input要素のvalue={text}
// onChange={(e) =&gt; setText(e.target.value)}`}
            </code>
          </div>
        </section>

        {/* 3. 真偽値State */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">3️⃣ 真偽値（boolean）のState管理</h2>
          <ToggleSwitch />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`const [isOn, setIsOn] = useState(false);
// トグル: setIsOn(!isOn)
// 条件表示: {isOn && &lt;div&gt;表示される内容&lt;/div&gt;}`}
            </code>
          </div>
        </section>

        {/* 4. 配列State */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">4️⃣ 配列のState管理</h2>
          <TodoApp />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`const [todos, setTodos] = useState&lt;string[]&gt;([]);
// 追加: setTodos([...todos, newItem])
// 削除: setTodos(todos.filter((_, i) =&gt; i !== index))`}
            </code>
          </div>
        </section>

        {/* 5. オブジェクトState */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">5️⃣ オブジェクトのState管理</h2>
          <ProfileEditor />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`const [profile, setProfile] = useState<UserProfile>({...});
// 更新: setProfile(prev =&gt; ({ ...prev, field: newValue }))
// スプレッド演算子で既存の値を保持`}
            </code>
          </div>
        </section>

        {/* 6. 複合State */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-pink-600">6️⃣ 複数のStateを組み合わせ</h2>
          <ShoppingCart />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`// 複数のStateを組み合わせて複雑なアプリを作成
const [cart, setCart] = useState&lt;CartItem[]&gt;([]);
const [isCartOpen, setIsCartOpen] = useState(false);`}
            </code>
          </div>
        </section>

        {/* 学習ポイント */}
        <section className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-700">
            🎯 Stateの重要ポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">✅ Stateの特徴:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• コンポーネント内部でデータを管理</li>
                <li>• 値が変わると自動的に再レンダリング</li>
                <li>• useState フックで作成</li>
                <li>• 必ずsetterで更新（直接変更は禁止）</li>
                <li>• 非同期更新（すぐには反映されない）</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🛠️ 更新パターン:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• プリミティブ: <code>setState(newValue)</code></li>
                <li>• 配列: <code>setState([...oldArray, newItem])</code></li>
                <li>• オブジェクト: <code>setState({`{...old, field: new}`})</code></li>
                <li>• 関数型更新: <code>setState(prev =&gt; prev + 1)</code></li>
                <li>• 条件付き更新で複雑なロジック</li>
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
              <li>カウンターに「5ずつ増やす」ボタンを追加してみる</li>
              <li>TODOアプリに「完了」機能を追加してみる（チェックボックス）</li>
              <li>プロフィール編集に新しいフィールドを追加してみる</li>
              <li>ショッピングカートに「お気に入り」機能を追加してみる</li>
              <li>独自のStateを持つコンポーネントを作成してみる</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};