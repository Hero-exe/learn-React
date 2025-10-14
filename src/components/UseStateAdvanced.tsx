import React, { useState, useCallback } from 'react';

/**
 * useStateフック中級編を学習するためのコンポーネント
 * より実践的で高度なuseStateの使い方を学ぼう！
 */

// === 1. 関数型更新（前の状態に基づく更新） ===
const FunctionalUpdates: React.FC = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  // 通常の更新（非推奨パターン）
  const incrementNormal = () => {
    setCount(count + 1); // 現在の値に依存
    addToHistory(`通常更新: ${count} → ${count + 1}`);
  };

  // 関数型更新（推奨パターン）
  const incrementFunctional = () => {
    setCount(prev => {
      const newValue = prev + 1;
      addToHistory(`関数型更新: ${prev} → ${newValue}`);
      return newValue;
    });
  };

  // 複数回の更新をテスト
  const multipleUpdates = () => {
    // 通常の更新（問題があるパターン）
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    addToHistory(`通常×3: 期待値${count + 3}, 実際は${count + 1}になる`);
  };

  const multipleFunctionalUpdates = () => {
    // 関数型更新（正しいパターン）
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    addToHistory(`関数型×3: 正しく+3される`);
  };

  const addToHistory = (message: string) => {
    setHistory(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9) // 最新10件まで保持
    ]);
  };

  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h3 className="font-bold text-blue-700 mb-3">関数型更新（前の状態に基づく更新）</h3>
      
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600 mb-3">カウント: {count}</p>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={incrementNormal}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
            >
              通常更新 (+1)
            </button>
            <button
              onClick={incrementFunctional}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
            >
              関数型更新 (+1)
            </button>
            <button
              onClick={multipleUpdates}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
            >
              通常×3回
            </button>
            <button
              onClick={multipleFunctionalUpdates}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
            >
              関数型×3回
            </button>
          </div>
          
          <button
            onClick={() => {
              setCount(0);
              setHistory([]);
            }}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
          >
            リセット
          </button>
        </div>

        <div className="bg-white p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">更新履歴:</h4>
          <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500">まだ履歴がありません</p>
            ) : (
              history.map((entry, index) => (
                <p key={index} className="font-mono text-gray-700">{entry}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// === 2. 遅延初期化（Lazy Initial State） ===
const LazyInitialization: React.FC = () => {
  // 重い計算をシミュレート
  const expensiveCalculation = () => {
    console.log('重い計算が実行されました！');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return Math.floor(result);
  };

  // 通常の初期化（毎回実行される - 非効率）
  const [normalState] = useState(expensiveCalculation());

  // 遅延初期化（初回のみ実行される - 効率的）
  const [lazyState] = useState(() => expensiveCalculation());

  const [renderCount, setRenderCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold text-green-700 mb-3">遅延初期化（Lazy Initial State）</h3>
      
      <div className="space-y-3">
        <div className="bg-white p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">計算結果:</h4>
          <p className="text-sm">通常の初期化: {normalState}</p>
          <p className="text-sm">遅延初期化: {lazyState}</p>
          <p className="text-sm text-gray-600">レンダー回数: {renderCount}</p>
        </div>

        <button
          onClick={() => setRenderCount(prev => prev + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          再レンダーを発生させる
        </button>

        <div className="bg-yellow-100 p-3 rounded border text-sm">
          <p className="font-bold text-yellow-700 mb-1">💡 ポイント:</p>
          <ul className="text-yellow-700 space-y-1">
            <li>• 通常の初期化: 毎回重い計算が実行される</li>
            <li>• 遅延初期化: 初回のみ実行される（効率的！）</li>
            <li>• ブラウザのConsoleを開いて確認してみて</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// === 3. 複雑なオブジェクトStateの管理 ===
interface UserProfile {
  personal: {
    name: string;
    age: number;
    email: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    language: 'ja' | 'en';
    notifications: boolean;
  };
  stats: {
    loginCount: number;
    lastLogin: string;
  };
}

const ComplexObjectState: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    personal: {
      name: '田中太郎',
      age: 25,
      email: 'tanaka@example.com'
    },
    preferences: {
      theme: 'light',
      language: 'ja',
      notifications: true
    },
    stats: {
      loginCount: 42,
      lastLogin: new Date().toLocaleString()
    }
  });

  // ネストしたオブジェクトの部分更新
  const updatePersonal = (field: keyof UserProfile['personal'], value: string | number) => {
    setProfile(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const updatePreferences = (field: keyof UserProfile['preferences'], value: any) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  // カスタム更新ヘルパー関数
  const incrementLoginCount = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        loginCount: prev.stats.loginCount + 1,
        lastLogin: new Date().toLocaleString()
      }
    }));
  }, []);

  // プロフィールリセット
  const resetProfile = () => {
    setProfile({
      personal: {
        name: '田中太郎',
        age: 25,
        email: 'tanaka@example.com'
      },
      preferences: {
        theme: 'light',
        language: 'ja',
        notifications: true
      },
      stats: {
        loginCount: 0,
        lastLogin: new Date().toLocaleString()
      }
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-purple-50">
      <h3 className="font-bold text-purple-700 mb-3">複雑なオブジェクトStateの管理</h3>
      
      <div className="space-y-4">
        {/* 個人情報編集 */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">👤 個人情報</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium">名前:</label>
              <input
                type="text"
                value={profile.personal.name}
                onChange={(e) => updatePersonal('name', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium">年齢:</label>
              <input
                type="number"
                value={profile.personal.age}
                onChange={(e) => updatePersonal('age', parseInt(e.target.value) || 0)}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium">メール:</label>
              <input
                type="email"
                value={profile.personal.email}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 設定 */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">⚙️ 設定</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium">テーマ:</label>
              <select
                value={profile.preferences.theme}
                onChange={(e) => updatePreferences('theme', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              >
                <option value="light">ライト</option>
                <option value="dark">ダーク</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium">言語:</label>
              <select
                value={profile.preferences.language}
                onChange={(e) => updatePreferences('language', e.target.value)}
                className="w-full p-1 border rounded text-sm"
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={profile.preferences.notifications}
                  onChange={(e) => updatePreferences('notifications', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs">通知を受け取る</span>
              </label>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">📊 統計情報</h4>
          <div className="space-y-1 text-sm">
            <p>ログイン回数: {profile.stats.loginCount}回</p>
            <p>最終ログイン: {profile.stats.lastLogin}</p>
            <button
              onClick={incrementLoginCount}
              className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600"
            >
              ログイン記録
            </button>
          </div>
        </div>

        {/* アクション */}
        <div className="flex space-x-2">
          <button
            onClick={resetProfile}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
          >
            プロフィールリセット
          </button>
        </div>

        {/* 現在の状態表示 */}
        <div className="bg-gray-100 p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">🔍 現在の状態（JSON）:</h4>
          <pre className="text-xs text-gray-700 overflow-auto max-h-32">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

// === 4. 配列Stateの高度な操作 ===
interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const AdvancedArrayState: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: 'Reactを学ぶ',
      completed: false,
      priority: 'high',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      text: 'useStateをマスターする',
      completed: true,
      priority: 'medium',
      createdAt: new Date().toISOString()
    }
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  // タスク追加
  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [newTask, ...prev]);
      setNewTaskText('');
    }
  };

  // タスク削除
  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // タスク完了切り替え
  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 優先度変更
  const changePriority = (id: number, priority: Task['priority']) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  // タスク順序変更
  const moveTask = (id: number, direction: 'up' | 'down') => {
    setTasks(prev => {
      const index = prev.findIndex(task => task.id === id);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }

      const newTasks = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newTasks[index], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[index]];
      return newTasks;
    });
  };

  // 一括操作
  const markAllCompleted = () => {
    setTasks(prev => prev.map(task => ({ ...task, completed: true })));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  // フィルタリング
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const priorityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700'
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold text-yellow-700 mb-3">配列Stateの高度な操作（高機能TODOアプリ）</h3>
      
      <div className="space-y-4">
        {/* タスク追加 */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="新しいタスクを入力..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addTask}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            追加
          </button>
        </div>

        {/* フィルター */}
        <div className="flex space-x-2">
          {(['all', 'incomplete', 'completed'] as const).map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded text-sm ${
                filter === filterType
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white border border-yellow-300 text-yellow-600 hover:bg-yellow-100'
              }`}
            >
              {filterType === 'all' && 'すべて'}
              {filterType === 'incomplete' && '未完了'}
              {filterType === 'completed' && '完了済み'}
            </button>
          ))}
        </div>

        {/* 一括操作 */}
        <div className="flex space-x-2">
          <button
            onClick={markAllCompleted}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
          >
            全て完了にする
          </button>
          <button
            onClick={clearCompleted}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            完了済みを削除
          </button>
        </div>

        {/* タスクリスト */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="p-4 bg-white rounded border text-center text-gray-500">
              {filter === 'all' ? 'タスクがありません' : `${filter === 'completed' ? '完了済み' : '未完了'}のタスクがありません`}
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`p-3 bg-white rounded border ${task.completed ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4"
                    />
                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.text}
                    </span>
                    <select
                      value={task.priority}
                      onChange={(e) => changePriority(task.id, e.target.value as Task['priority'])}
                      className={`text-xs px-2 py-1 rounded border ${priorityColors[task.priority]}`}
                    >
                      <option value="low">低</option>
                      <option value="medium">中</option>
                      <option value="high">高</option>
                    </select>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => moveTask(task.id, 'up')}
                      disabled={index === 0}
                      className="w-6 h-6 text-xs bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveTask(task.id, 'down')}
                      disabled={index === filteredTasks.length - 1}
                      className="w-6 h-6 text-xs bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="w-6 h-6 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  作成日時: {new Date(task.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 統計 */}
        <div className="bg-white p-3 rounded border text-sm">
          <p>総タスク数: {tasks.length}個</p>
          <p>完了済み: {tasks.filter(t => t.completed).length}個</p>
          <p>未完了: {tasks.filter(t => !t.completed).length}個</p>
        </div>
      </div>
    </div>
  );
};

// === 5. State更新のパフォーマンス最適化 ===
const StatePerformanceOptimization: React.FC = () => {
  const [count, setCount] = useState(0);
  const [largeObject, setLargeObject] = useState(() => {
    // 大きなオブジェクトの初期化（遅延初期化を使用）
    const obj: { [key: string]: number } = {};
    for (let i = 0; i < 1000; i++) {
      obj[`key${i}`] = i;
    }
    return obj;
  });

  const [renderTime, setRenderTime] = useState<number[]>([]);

  // パフォーマンス測定
  const measureRender = (operation: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    const duration = end - start;
    
    setRenderTime(prev => [
      ...prev.slice(-9), // 最新10件まで保持
      duration
    ]);
    
    console.log(`${operation}: ${duration.toFixed(2)}ms`);
  };

  // 非効率な更新（新しいオブジェクトを毎回作成）
  const inefficientUpdate = () => {
    measureRender('非効率な更新', () => {
      const newObj: { [key: string]: number } = {};
      for (let i = 0; i < 1000; i++) {
        newObj[`key${i}`] = Math.random();
      }
      setLargeObject(newObj);
    });
  };

  // 効率的な更新（必要な部分のみ更新）
  const efficientUpdate = () => {
    measureRender('効率的な更新', () => {
      setLargeObject(prev => ({
        ...prev,
        key0: Math.random(),
        key1: Math.random(),
        key2: Math.random()
      }));
    });
  };

  // バッチ更新のテスト
  const batchedUpdates = () => {
    measureRender('バッチ更新', () => {
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
      // React 18では自動的にバッチされる
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-indigo-50">
      <h3 className="font-bold text-indigo-700 mb-3">State更新のパフォーマンス最適化</h3>
      
      <div className="space-y-4">
        <div className="bg-white p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">現在の状態:</h4>
          <p className="text-sm">カウント: {count}</p>
          <p className="text-sm">大きなオブジェクトのキー数: {Object.keys(largeObject).length}</p>
          <p className="text-sm">サンプル値: {largeObject.key0?.toFixed(4) || 'N/A'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <button
            onClick={inefficientUpdate}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
          >
            非効率な更新
          </button>
          <button
            onClick={efficientUpdate}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
          >
            効率的な更新
          </button>
          <button
            onClick={batchedUpdates}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
          >
            バッチ更新
          </button>
        </div>

        <div className="bg-white p-3 rounded border">
          <h4 className="font-bold text-sm mb-2">パフォーマンス履歴 (ms):</h4>
          <div className="text-xs space-y-1">
            {renderTime.length === 0 ? (
              <p className="text-gray-500">まだ測定データがありません</p>
            ) : (
              renderTime.map((time, index) => (
                <div
                  key={index}
                  className={`p-1 rounded ${
                    time > 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  実行時間: {time.toFixed(2)}ms
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-yellow-100 p-3 rounded border text-sm">
          <p className="font-bold text-yellow-700 mb-1">💡 最適化のポイント:</p>
          <ul className="text-yellow-700 space-y-1">
            <li>• 関数型更新を使用してクロージャ問題を回避</li>
            <li>• スプレッド演算子で必要な部分のみ更新</li>
            <li>• 遅延初期化で重い初期化処理を最適化</li>
            <li>• React 18のバッチ更新を活用</li>
            <li>• ブラウザのConsoleで詳細な実行時間を確認</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// === メインの学習コンポーネント ===
export const UseStateAdvanced: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        🔧 useStateフック中級編を学ぼう！
      </h1>

      <div className="space-y-6">
        {/* 1. 関数型更新 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">1️⃣ 関数型更新（前の状態に基づく更新）</h2>
          <FunctionalUpdates />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`// 推奨: 関数型更新
setCount(prev => prev + 1);

// 非推奨: 現在の値に依存
setCount(count + 1);`}
            </code>
          </div>
        </section>

        {/* 2. 遅延初期化 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-600">2️⃣ 遅延初期化（Lazy Initial State）</h2>
          <LazyInitialization />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`// 推奨: 遅延初期化（初回のみ実行）
const [state, setState] = useState(() => expensiveCalculation());

// 非推奨: 毎回実行される
const [state, setState] = useState(expensiveCalculation());`}
            </code>
          </div>
        </section>

        {/* 3. 複雑なオブジェクト */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">3️⃣ 複雑なオブジェクトStateの管理</h2>
          <ComplexObjectState />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`// ネストしたオブジェクトの部分更新
setProfile(prev => ({
  ...prev,
  personal: {
    ...prev.personal,
    name: newName
  }
}));`}
            </code>
          </div>
        </section>

        {/* 4. 配列の高度な操作 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">4️⃣ 配列Stateの高度な操作</h2>
          <AdvancedArrayState />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`// 配列の操作パターン
setTasks(prev => [newTask, ...prev]); // 追加
setTasks(prev => prev.filter(task => task.id !== id)); // 削除
setTasks(prev => prev.map(task => 
  task.id === id ? { ...task, completed: !task.completed } : task
)); // 更新`}
            </code>
          </div>
        </section>

        {/* 5. パフォーマンス最適化 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">5️⃣ State更新のパフォーマンス最適化</h2>
          <StatePerformanceOptimization />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`// 効率的な部分更新
setLargeObject(prev => ({
  ...prev,
  specificKey: newValue
}));

// 遅延初期化でパフォーマンス向上
const [state] = useState(() => heavyComputation());`}
            </code>
          </div>
        </section>

        {/* 学習ポイント */}
        <section className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-700">
            🎯 useStateフック中級編の重要ポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">✅ 高度なテクニック:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• 関数型更新でクロージャ問題を解決</li>
                <li>• 遅延初期化で重い処理を最適化</li>
                <li>• スプレッド演算子でイミュータブル更新</li>
                <li>• useCallbackと組み合わせて最適化</li>
                <li>• バッチ更新を理解して活用</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🛠️ ベストプラクティス:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• 常に関数型更新を使用</li>
                <li>• 重い初期化処理は遅延初期化</li>
                <li>• ネストしたオブジェクトは段階的に展開</li>
                <li>• 配列操作は元配列を変更しない</li>
                <li>• パフォーマンスを意識した設計</li>
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
              <li>関数型更新と通常更新の違いを「×3回」ボタンで確認する</li>
              <li>遅延初期化の効果をブラウザConsoleで確認する</li>
              <li>複雑なプロフィールオブジェクトの各項目を編集してみる</li>
              <li>TODOアプリで様々な配列操作（追加、削除、順序変更）を試す</li>
              <li>パフォーマンス測定で効率的/非効率的な更新の差を確認する</li>
              <li>独自の複雑なStateを持つコンポーネントを作成してみる</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};