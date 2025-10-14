import React, { useState } from 'react';

/**
 * イベントハンドリングを学習するためのコンポーネント
 * 様々なイベントの種類と処理方法を実際に試してみよう！
 */

// === 1. 基本的なクリックイベント ===
const ClickEvents: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickedButton, setLastClickedButton] = useState('');

  const handleSimpleClick = () => {
    setClickCount(clickCount + 1);
    setLastClickedButton('シンプルボタン');
  };

  const handleParameterClick = (buttonName: string, increment: number) => {
    setClickCount(clickCount + increment);
    setLastClickedButton(buttonName);
  };

  const handleEventObjectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount(clickCount + 1);
    setLastClickedButton(`${event.currentTarget.textContent} (座標: ${event.clientX}, ${event.clientY})`);
  };

  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h3 className="font-bold text-blue-700 mb-3">クリックイベント</h3>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSimpleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            シンプルクリック
          </button>
          
          <button
            onClick={() => handleParameterClick('パラメータボタン', 5)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            5増えるボタン
          </button>
          
          <button
            onClick={handleEventObjectClick}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            座標取得ボタン
          </button>
        </div>
        
        <div className="p-3 bg-white rounded border">
          <p className="text-sm">クリック回数: {clickCount}</p>
          <p className="text-sm">最後にクリックしたボタン: {lastClickedButton}</p>
        </div>
      </div>
    </div>
  );
};

// === 2. フォームイベント（入力系） ===
const FormEvents: React.FC = () => {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    textarea: '',
    select: '',
    checkbox: false,
    radio: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトのsubmit動作を防ぐ
    alert(`フォーム送信！\n${JSON.stringify(formData, null, 2)}`);
  };

  const handleReset = () => {
    setFormData({
      text: '',
      email: '',
      password: '',
      textarea: '',
      select: '',
      checkbox: false,
      radio: ''
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold text-green-700 mb-3">フォームイベント</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">テキスト入力:</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="何か入力してください"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">メールアドレス:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">パスワード:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="パスワードを入力"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">テキストエリア:</label>
          <textarea
            name="textarea"
            value={formData.textarea}
            onChange={handleInputChange}
            placeholder="長いテキストを入力..."
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">セレクトボックス:</label>
          <select
            name="select"
            value={formData.select}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">選択してください</option>
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm">利用規約に同意する</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ラジオボタン:</label>
          <div className="space-y-1">
            {['初心者', '中級者', '上級者'].map(level => (
              <label key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="radio"
                  value={level}
                  checked={formData.radio === level}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            送信
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            リセット
          </button>
        </div>
      </form>

      <div className="mt-4 p-3 bg-white rounded border">
        <h4 className="font-bold text-sm mb-2">現在の入力値:</h4>
        <pre className="text-xs text-gray-600 overflow-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// === 3. マウスイベント ===
const MouseEvents: React.FC = () => {
  const [mouseInfo, setMouseInfo] = useState({
    position: { x: 0, y: 0 },
    isHovering: false,
    clickType: '',
    dragInfo: ''
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseInfo(prev => ({
      ...prev,
      position: { x: e.clientX, y: e.clientY }
    }));
  };

  const handleMouseEnter = () => {
    setMouseInfo(prev => ({ ...prev, isHovering: true }));
  };

  const handleMouseLeave = () => {
    setMouseInfo(prev => ({ ...prev, isHovering: false }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const clickTypes = ['左クリック', '中クリック', '右クリック'];
    setMouseInfo(prev => ({
      ...prev,
      clickType: `${clickTypes[e.button]}ダウン`
    }));
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const clickTypes = ['左クリック', '中クリック', '右クリック'];
    setMouseInfo(prev => ({
      ...prev,
      clickType: `${clickTypes[e.button]}アップ`
    }));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // 右クリックメニューを無効化
    setMouseInfo(prev => ({
      ...prev,
      clickType: '右クリックメニューをブロック'
    }));
  };

  const handleDragStart = (e: React.DragEvent) => {
    setMouseInfo(prev => ({
      ...prev,
      dragInfo: 'ドラッグ開始'
    }));
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setMouseInfo(prev => ({
      ...prev,
      dragInfo: 'ドラッグ終了'
    }));
  };

  return (
    <div className="p-4 border rounded-lg bg-purple-50">
      <h3 className="font-bold text-purple-700 mb-3">マウスイベント</h3>
      
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        className={`p-4 border-2 border-dashed rounded cursor-crosshair transition-colors ${
          mouseInfo.isHovering ? 'bg-purple-200 border-purple-500' : 'bg-white border-purple-300'
        }`}
        style={{ minHeight: '150px' }}
      >
        <p className="text-center text-purple-700">
          この領域でマウスを動かしたり、クリックしてみてください！
        </p>
        <p className="text-center text-sm text-purple-600 mt-2">
          右クリックも試してみて（メニューはブロックされます）
        </p>
      </div>

      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="mt-3 p-3 bg-purple-200 border rounded cursor-move text-center text-purple-800"
      >
        📦 このボックスをドラッグしてみて！
      </div>

      <div className="mt-3 p-3 bg-white rounded border">
        <h4 className="font-bold text-sm mb-2">マウス情報:</h4>
        <div className="text-sm space-y-1">
          <p>マウス座標: ({mouseInfo.position.x}, {mouseInfo.position.y})</p>
          <p>ホバー状態: {mouseInfo.isHovering ? '✅ ホバー中' : '❌ 範囲外'}</p>
          <p>クリック種類: {mouseInfo.clickType}</p>
          <p>ドラッグ状態: {mouseInfo.dragInfo}</p>
        </div>
      </div>
    </div>
  );
};

// === 4. キーボードイベント ===
const KeyboardEvents: React.FC = () => {
  const [keyInfo, setKeyInfo] = useState({
    lastKey: '',
    keyCode: 0,
    modifiers: {
      ctrl: false,
      shift: false,
      alt: false
    },
    inputValue: '',
    specialActions: []
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyInfo(prev => ({
      ...prev,
      lastKey: e.key,
      keyCode: e.keyCode,
      modifiers: {
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey
      }
    }));

    // 特別なキー組み合わせの処理
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      alert('Ctrl+S が押されました！（保存アクション）');
    }

    if (e.key === 'Enter') {
      alert(`Enterキーが押されました！入力値: "${keyInfo.inputValue}"`);
    }

    if (e.key === 'Escape') {
      setKeyInfo(prev => ({ ...prev, inputValue: '' }));
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newAction = `${e.key} キーが離されました`;
    setKeyInfo(prev => ({
      ...prev,
      specialActions: [newAction, ...prev.specialActions.slice(0, 4)] // 最新5件まで保持
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyInfo(prev => ({
      ...prev,
      inputValue: e.target.value
    }));
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold text-yellow-700 mb-3">キーボードイベント</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            キーボードテスト用入力欄:
          </label>
          <input
            type="text"
            value={keyInfo.inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            placeholder="ここでキーを押してみてください（Ctrl+S, Enter, Escapeも試して）"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <p className="text-xs text-gray-600 mt-1">
            💡 特別な操作: Ctrl+S（保存）、Enter（確定）、Escape（クリア）
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-bold text-sm mb-2">最後に押されたキー:</h4>
            <div className="text-sm space-y-1">
              <p>キー: <span className="font-mono bg-gray-100 px-1 rounded">{keyInfo.lastKey}</span></p>
              <p>キーコード: {keyInfo.keyCode}</p>
              <div className="flex space-x-3">
                <span className={keyInfo.modifiers.ctrl ? 'text-green-600' : 'text-gray-400'}>
                  Ctrl: {keyInfo.modifiers.ctrl ? '✅' : '❌'}
                </span>
                <span className={keyInfo.modifiers.shift ? 'text-green-600' : 'text-gray-400'}>
                  Shift: {keyInfo.modifiers.shift ? '✅' : '❌'}
                </span>
                <span className={keyInfo.modifiers.alt ? 'text-green-600' : 'text-gray-400'}>
                  Alt: {keyInfo.modifiers.alt ? '✅' : '❌'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border">
            <h4 className="font-bold text-sm mb-2">キーアップイベント履歴:</h4>
            <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
              {keyInfo.specialActions.length === 0 ? (
                <p className="text-gray-500">まだキーが押されていません</p>
              ) : (
                keyInfo.specialActions.map((action, index) => (
                  <p key={index} className="text-gray-700">{action}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// === 5. その他のイベント ===
const OtherEvents: React.FC = () => {
  const [eventLog, setEventLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setEventLog(prev => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev.slice(0, 9)]);
  };

  const handleFocus = () => {
    addToLog('入力欄にフォーカスが当たりました');
  };

  const handleBlur = () => {
    addToLog('入力欄からフォーカスが外れました');
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    addToLog(`スクロール位置: ${Math.round(target.scrollTop)}px`);
  };

  const handleResize = () => {
    addToLog(`ウィンドウサイズ: ${window.innerWidth}x${window.innerHeight}`);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDoubleClick = () => {
    addToLog('ダブルクリックされました！');
  };

  const handleWheel = (e: React.WheelEvent) => {
    addToLog(`ホイール: ${e.deltaY > 0 ? '下' : '上'}方向`);
  };

  return (
    <div className="p-4 border rounded-lg bg-pink-50">
      <h3 className="font-bold text-pink-700 mb-3">その他のイベント</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">フォーカスイベント:</label>
          <input
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="ここをクリックしてフォーカス/ブラーを試して"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">スクロールイベント:</label>
          <div
            onScroll={handleScroll}
            className="h-32 p-3 border rounded bg-white overflow-y-auto"
          >
            <div className="h-64">
              <p>このエリアをスクロールしてみてください！</p>
              <div className="mt-4 space-y-2">
                {Array.from({length: 20}, (_, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    スクロールテスト行 {i + 1}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onDoubleClick={handleDoubleClick}
            className="p-4 bg-pink-200 border-2 border-pink-300 rounded hover:bg-pink-300"
          >
            📱 ダブルクリックしてみて！
          </button>
          
          <div
            onWheel={handleWheel}
            className="p-4 bg-pink-200 border-2 border-pink-300 rounded cursor-pointer"
          >
            🖱️ マウスホイールを回してみて！
          </div>
        </div>

        <div className="p-3 bg-white rounded border">
          <h4 className="font-bold text-sm mb-2">イベントログ:</h4>
          <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
            {eventLog.length === 0 ? (
              <p className="text-gray-500">まだイベントが発生していません</p>
            ) : (
              eventLog.map((log, index) => (
                <p key={index} className="text-gray-700 font-mono">{log}</p>
              ))
            )}
          </div>
          <button
            onClick={() => setEventLog([])}
            className="mt-2 text-xs bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600"
          >
            ログをクリア
          </button>
        </div>
      </div>
    </div>
  );
};

// === メインの学習コンポーネント ===
export const EventHandling: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        🎪 イベントハンドリングを学ぼう！
      </h1>

      <div className="space-y-6">
        {/* 1. クリックイベント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">1️⃣ クリックイベント</h2>
          <ClickEvents />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`<button onClick={handleClick}>クリック</button>
// ボタンクリック時にhandleClick関数が実行される`}
            </code>
          </div>
        </section>

        {/* 2. フォームイベント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-600">2️⃣ フォームイベント</h2>
          <FormEvents />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`<input onChange={handleChange} onSubmit={handleSubmit} />
// 入力値の変更やフォーム送信を処理`}
            </code>
          </div>
        </section>

        {/* 3. マウスイベント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">3️⃣ マウスイベント</h2>
          <MouseEvents />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`<div onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter}>
// マウスの移動、ホバー、ドラッグなどを処理`}
            </code>
          </div>
        </section>

        {/* 4. キーボードイベント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">4️⃣ キーボードイベント</h2>
          <KeyboardEvents />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`<input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
// キーの押下、離すタイミングを処理`}
            </code>
          </div>
        </section>

        {/* 5. その他のイベント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-pink-600">5️⃣ その他のイベント</h2>
          <OtherEvents />
          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
            <code>
              {`<input onFocus={handleFocus} onBlur={handleBlur} />
<div onScroll={handleScroll} onWheel={handleWheel} />
// フォーカス、スクロール、ホイールなどのイベント`}
            </code>
          </div>
        </section>

        {/* 学習ポイント */}
        <section className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-700">
            🎯 イベントハンドリングの重要ポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">✅ イベントの特徴:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• ユーザーの操作に反応して処理を実行</li>
                <li>• event オブジェクトから詳細情報を取得</li>
                <li>• preventDefault() でデフォルト動作を防ぐ</li>
                <li>• stopPropagation() でイベント伝播を停止</li>
                <li>• 関数型とアロー関数どちらでも定義可能</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🛠️ よく使うイベント:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• onClick: クリック時</li>
                <li>• onChange: 入力値変更時</li>
                <li>• onSubmit: フォーム送信時</li>
                <li>• onMouseEnter/Leave: ホバー時</li>
                <li>• onKeyDown/Up: キー操作時</li>
                <li>• onFocus/Blur: フォーカス時</li>
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
              <li>各ボタンをクリックして、異なるイベントハンドラーの動作を確認する</li>
              <li>フォームに様々な値を入力して、リアルタイムで状態が更新されるのを見る</li>
              <li>マウスエリアで様々なマウス操作を試す（移動、ホバー、ドラッグ）</li>
              <li>キーボード入力で特別なキー組み合わせ（Ctrl+S、Enter、Escape）を試す</li>
              <li>独自のイベントハンドラーを持つコンポーネントを作成してみる</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};