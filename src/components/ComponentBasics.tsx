import React from 'react';

/**
 * コンポーネント作成の基礎を学習するためのコンポーネント
 * 関数コンポーネント、Props、再利用性について学ぼう！
 */

// === 1. 最もシンプルなコンポーネント ===
const SimpleGreeting = () => {
  return <h2 className="text-xl font-bold text-blue-600">こんにちは！</h2>;
};

// === 2. Propsを受け取るコンポーネント ===
interface GreetingProps {
  name: string;
  age?: number; // ?を付けるとオプショナル（任意）
}

const PersonalGreeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div className="p-3 bg-blue-50 rounded border">
      <h3 className="font-bold text-blue-700">こんにちは、{name}さん！</h3>
      {age && <p className="text-sm text-gray-600">年齢: {age}歳</p>}
    </div>
  );
};

// === 3. childrenを受け取るコンポーネント ===
interface CardProps {
  title: string;
  color?: 'blue' | 'green' | 'purple' | 'red';
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, color = 'blue', children }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    red: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses[color]}`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

// === 4. イベントハンドリングを含むコンポーネント ===
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded transition-colors ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : variantClasses[variant]
      }`}
    >
      {label}
    </button>
  );
};

// === 5. 状態を持つコンポーネント ===
const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="text-center space-y-3">
      <p className="text-2xl font-bold text-purple-600">カウント: {count}</p>
      <div className="space-x-2">
        <CustomButton 
          label="➕" 
          onClick={() => setCount(count + 1)}
          variant="primary"
        />
        <CustomButton 
          label="➖" 
          onClick={() => setCount(count - 1)}
          variant="secondary"
        />
        <CustomButton 
          label="🔄" 
          onClick={() => setCount(0)}
          variant="danger"
        />
      </div>
    </div>
  );
};

// === 6. リストアイテムコンポーネント ===
interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white rounded border">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-4 h-4"
        />
        <span className={completed ? 'line-through text-gray-500' : 'text-gray-800'}>
          {text}
        </span>
      </div>
      <CustomButton
        label="🗑️"
        onClick={() => onDelete(id)}
        variant="danger"
      />
    </div>
  );
};

// === 7. 複合コンポーネント（複数のコンポーネントを組み合わせ） ===
const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Reactを学ぶ', completed: false },
    { id: 2, text: 'コンポーネントを作る', completed: true },
    { id: 3, text: 'Propsを理解する', completed: false },
  ]);

  const [newTodo, setNewTodo] = React.useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいタスクを入力..."
          className="flex-1 p-2 border rounded"
        />
        <CustomButton label="追加" onClick={addTodo} />
      </div>
      <div className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            {...todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

// === メインの学習コンポーネント ===
export const ComponentBasics: React.FC = () => {
  const [clickCount, setClickCount] = React.useState(0);
  
  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
    alert(`ボタンが${clickCount + 1}回クリックされました！`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        🏗️ コンポーネントの作成を学ぼう！
      </h1>

      {/* === 1. 基本的なコンポーネント === */}
      <Card title="1️⃣ 最もシンプルなコンポーネント" color="blue">
        <SimpleGreeting />
        <div className="mt-3 p-3 bg-gray-50 rounded">
          <code className="text-sm">
            {`const SimpleGreeting = () => {
  return <h2>こんにちは！</h2>;
};`}
          </code>
        </div>
      </Card>

      <div className="my-6"></div>

      {/* === 2. Propsを使ったコンポーネント === */}
      <Card title="2️⃣ Propsを受け取るコンポーネント" color="green">
        <div className="space-y-3">
          <PersonalGreeting name="太郎" age={25} />
          <PersonalGreeting name="花子" />
          <PersonalGreeting name="次郎" age={30} />
        </div>
        <div className="mt-3 p-3 bg-gray-50 rounded">
          <code className="text-sm">
            {`interface GreetingProps {
  name: string;
  age?: number; // オプショナル
}

const PersonalGreeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h3>こんにちは、{name}さん！</h3>
      {age && <p>年齢: {age}歳</p>}
    </div>
  );
};`}
          </code>
        </div>
      </Card>

      <div className="my-6"></div>

      {/* === 3. childrenプロパティ === */}
      <Card title="3️⃣ childrenを受け取るコンポーネント" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="青いカード" color="blue">
            <p>この中身はchildrenとして渡されています！</p>
            <CustomButton label="クリック" onClick={() => alert('青いカード')} />
          </Card>
          <Card title="緑のカード" color="green">
            <p>異なる内容でも同じCardコンポーネントです。</p>
            <ul className="list-disc list-inside">
              <li>再利用可能</li>
              <li>柔軟性がある</li>
            </ul>
          </Card>
        </div>
      </Card>

      <div className="my-6"></div>

      {/* === 4. イベントハンドリング === */}
      <Card title="4️⃣ イベントハンドリングを含むコンポーネント" color="red">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <CustomButton 
              label="プライマリボタン" 
              onClick={handleButtonClick}
              variant="primary"
            />
            <CustomButton 
              label="セカンダリボタン" 
              onClick={() => alert('セカンダリがクリックされました')}
              variant="secondary"
            />
            <CustomButton 
              label="危険ボタン" 
              onClick={() => confirm('本当に削除しますか？')}
              variant="danger"
            />
            <CustomButton 
              label="無効ボタン" 
              onClick={() => {}}
              disabled={true}
            />
          </div>
          <p className="text-sm text-gray-600">
            プライマリボタンのクリック回数: {clickCount}回
          </p>
        </div>
      </Card>

      <div className="my-6"></div>

      {/* === 5. 状態を持つコンポーネント === */}
      <Card title="5️⃣ 状態を持つコンポーネント" color="purple">
        <Counter />
      </Card>

      <div className="my-6"></div>

      {/* === 6. 複合コンポーネント === */}
      <Card title="6️⃣ 複合コンポーネント（TODOリスト）" color="green">
        <TodoList />
      </Card>

      {/* === 学習ポイント === */}
      <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
        <h2 className="text-xl font-semibold mb-3 text-orange-700">
          🎯 コンポーネント作成のポイント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-bold mb-2">✅ 良いコンポーネントの特徴:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• 単一責任の原則（1つのことだけをする）</li>
              <li>• 再利用可能</li>
              <li>• Propsで設定可能</li>
              <li>• 予測可能な動作</li>
              <li>• TypeScriptで型定義</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">🛠️ 命名規則:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• コンポーネント名: PascalCase</li>
              <li>• ファイル名: PascalCase.tsx</li>
              <li>• Props型: ComponentNameProps</li>
              <li>• 関数名: camelCase</li>
              <li>• 定数: UPPER_CASE</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 実習課題 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-purple-700">
          🎯 実習課題
        </h2>
        <div className="bg-white p-3 rounded border">
          <p className="mb-2">以下を試してみよう：</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>新しいコンポーネントを作成してみる（例: ProfileCard, WeatherWidget）</li>
            <li>既存のコンポーネントにPropsを追加してみる</li>
            <li>コンポーネントを組み合わせて新しい機能を作る</li>
            <li>独自のボタンコンポーネントを作ってみる</li>
          </ol>
        </div>
      </div>
    </div>
  );
};