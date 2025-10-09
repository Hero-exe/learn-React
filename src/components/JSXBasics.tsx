import React from 'react';

/**
 * JSX基本文法を学習するためのコンポーネント
 * 実際に動かしながらJSXの書き方を覚えよう！
 */
export const JSXBasics: React.FC = () => {
  // 1. 変数の定義（JSXで使用する値）
  const userName = "React学習者";
  const userAge = 25;
  const isStudent = true;
  const hobbies = ["プログラミング", "映画鑑賞", "読書"];
  
  // 2. 関数の定義
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString();
  };

  // 3. 計算式
  const birthYear = new Date().getFullYear() - userAge;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        📝 JSX基本文法を学ぼう！
      </h1>

      {/* === 1. 基本的なHTML要素 === */}
      <section className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-blue-700">
          1️⃣ 基本的なHTML要素
        </h2>
        <p className="text-gray-700 mb-2">
          JSXではHTMLのような要素を書けるよ！
        </p>
        <div className="bg-white p-3 rounded border">
          <h3 className="font-bold">見出し</h3>
          <p>これは段落です。</p>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            ボタン
          </button>
        </div>
      </section>

      {/* === 2. JavaScript式の埋め込み === */}
      <section className="mb-8 p-4 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          2️⃣ JavaScript式の埋め込み（{}を使用）
        </h2>
        <div className="bg-white p-3 rounded border space-y-2">
          <p>名前: <span className="font-bold text-purple-600">{userName}</span></p>
          <p>年齢: <span className="font-bold text-purple-600">{userAge}歳</span></p>
          <p>生まれ年: <span className="font-bold text-purple-600">{birthYear}年</span></p>
          <p>現在時刻: <span className="font-bold text-purple-600">{getCurrentTime()}</span></p>
          <p>学生？: <span className="font-bold text-purple-600">{isStudent ? "はい" : "いいえ"}</span></p>
        </div>
      </section>

      {/* === 3. 属性にJavaScriptを使用 === */}
      <section className="mb-8 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-yellow-700">
          3️⃣ 属性にJavaScriptを使用
        </h2>
        <div className="bg-white p-3 rounded border space-y-3">
          <img 
            src="/vite.svg" 
            alt={`${userName}のアバター`}
            className="w-16 h-16"
            title={`年齢: ${userAge}歳`}
          />
          <input 
            type="text" 
            placeholder={`${userName}さん、何か入力してください`}
            className="border p-2 rounded w-full"
          />
          <button 
            className={`px-4 py-2 rounded text-white ${isStudent ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {isStudent ? '学生割引適用' : '一般料金'}
          </button>
        </div>
      </section>

      {/* === 4. 配列のレンダリング === */}
      <section className="mb-8 p-4 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-purple-700">
          4️⃣ 配列のレンダリング（map関数）
        </h2>
        <div className="bg-white p-3 rounded border">
          <h3 className="font-bold mb-2">趣味一覧:</h3>
          <ul className="list-disc list-inside space-y-1">
            {hobbies.map((hobby, index) => (
              <li key={index} className="text-gray-700">
                {index + 1}. {hobby}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* === 5. 条件分岐レンダリング === */}
      <section className="mb-8 p-4 bg-pink-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-pink-700">
          5️⃣ 条件分岐レンダリング
        </h2>
        <div className="bg-white p-3 rounded border space-y-3">
          {/* && 演算子を使った条件レンダリング */}
          {isStudent && (
            <div className="bg-green-100 p-2 rounded">
              🎓 学生特典: 学割価格でご利用いただけます！
            </div>
          )}
          
          {/* 三項演算子を使った条件レンダリング */}
          <div className={`p-2 rounded ${userAge >= 20 ? 'bg-blue-100' : 'bg-orange-100'}`}>
            {userAge >= 20 ? '🍺 お酒が飲めます' : '🥤 ジュースをどうぞ'}
          </div>

          {/* 複数条件 */}
          {userAge >= 18 ? (
            userAge >= 65 ? (
              <div className="bg-gray-100 p-2 rounded">👴 シニア割引対象です</div>
            ) : (
              <div className="bg-blue-100 p-2 rounded">👤 一般料金です</div>
            )
          ) : (
            <div className="bg-yellow-100 p-2 rounded">👶 未成年です</div>
          )}
        </div>
      </section>

      {/* === 6. JSXのルール === */}
      <section className="mb-8 p-4 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-red-700">
          6️⃣ JSXの重要なルール
        </h2>
        <div className="bg-white p-3 rounded border">
          <ul className="space-y-2 text-sm">
            <li>✅ <code className="bg-gray-200 px-1 rounded">className</code>を使う（classではない）</li>
            <li>✅ <code className="bg-gray-200 px-1 rounded">htmlFor</code>を使う（forではない）</li>
            <li>✅ 自己閉じタグは<code className="bg-gray-200 px-1 rounded">&lt;img /&gt;</code>のように書く</li>
            <li>✅ 必ず1つの親要素で囲む（またはFragment <code className="bg-gray-200 px-1 rounded">&lt;&gt;</code>を使用）</li>
            <li>✅ JavaScriptの式は<code className="bg-gray-200 px-1 rounded">{'{}'}</code>で囲む</li>
            <li>✅ キャメルケースを使う（<code className="bg-gray-200 px-1 rounded">onClick</code>, <code className="bg-gray-200 px-1 rounded">onChange</code>など）</li>
          </ul>
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
            <li>上の変数（userName, userAgeなど）の値を変更してみる</li>
            <li>新しい配列を作ってmapでレンダリングしてみる</li>
            <li>新しい条件分岐を追加してみる</li>
            <li>新しいJavaScript式を{}内に書いてみる</li>
          </ol>
        </div>
      </section>
    </div>
  );
};