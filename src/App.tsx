import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { JSXBasics } from './components/JSXBasics'
import { ComponentBasics } from './components/ComponentBasics'
import { PropsBasics } from './components/PropsBasics'
import { StateBasics } from './components/StateBasics'
import { EventHandling } from './components/EventHandling'
import { ConditionalRendering } from './components/ConditionalRendering'
import { UseStateAdvanced } from './components/UseStateAdvanced'

function App() {
  const [showJSXBasics, setShowJSXBasics] = useState(false)
  const [showComponentBasics, setShowComponentBasics] = useState(false)
  const [showPropsBasics, setShowPropsBasics] = useState(false)
  const [showStateBasics, setShowStateBasics] = useState(false)
  const [showEventHandling, setShowEventHandling] = useState(false)
  const [showConditionalRendering, setShowConditionalRendering] = useState(false)
  const [showUseStateAdvanced, setShowUseStateAdvanced] = useState(false)


  // JSX学習モードとホーム画面を切り替え
  if (showJSXBasics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowJSXBasics(false)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← ホームに戻る
          </button>
        </div>
        <JSXBasics />
      </div>
    )
  }

  // コンポーネント学習モードとホーム画面を切り替え
  if (showComponentBasics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowComponentBasics(false)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← ホームに戻る
          </button>
        </div>
        <ComponentBasics />
      </div>
    )
  }

  // Props学習モードとホーム画面を切り替え
  if (showPropsBasics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowPropsBasics(false)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← ホームに戻る
          </button>
        </div>
        <PropsBasics />
      </div>
    )
  }

  // State学習モードとホーム画面を切り替え
  if (showStateBasics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowStateBasics(false)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← ホームに戻る
          </button>
        </div>
        <StateBasics />
      </div>
    )
  }

  // イベントハンドリング学習モードとホーム画面を切り替え
  if (showEventHandling) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowEventHandling(false)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← ホームに戻る
          </button>
        </div>
        <EventHandling />
      </div>
    )
  }

  // 条件分岐レンダリング学習モードとホーム画面を切り替え
  if (showConditionalRendering) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowConditionalRendering(false)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← ホームに戻る
          </button>
        </div>
        <ConditionalRendering />
      </div>
    )
  }

  // useStateフック中級編学習モードとホーム画面を切り替え
  if (showUseStateAdvanced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-4">
        <div className="mb-4">
          <button
            onClick={() => setShowUseStateAdvanced(false)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            ← ホームに戻る
          </button>
        </div>
        <UseStateAdvanced />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        {/* ロゴセクション */}
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="w-16 h-16 animate-spin-slow" alt="React logo" />
          </a>
        </div>

        {/* タイトル */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
          React Learning
        </h1>

        {/* 学習メニュー */}
        <div className="space-y-6 mb-6">
          {/* 🌱 基礎編 */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">🌱 基礎編</h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowJSXBasics(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                📝 JSXの基本文法
              </button>

              <button
                onClick={() => setShowComponentBasics(true)}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🏗️ コンポーネントの作成
              </button>

              <button
                onClick={() => setShowPropsBasics(true)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🎁 Props（プロパティ）の受け渡し
              </button>

              <button
                onClick={() => setShowStateBasics(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                📊 State（状態）の管理
              </button>

              <button
                onClick={() => setShowEventHandling(true)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🎪 イベントハンドリング
              </button>

              <button
                onClick={() => setShowConditionalRendering(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔀 条件分岐レンダリング
              </button>
            </div>
          </div>

          {/* 🌿 中級編 */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">🌿 中級編</h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowUseStateAdvanced(true)}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔧 useStateフック
              </button>

              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🎯 useEffectフック（準備中）
              </div>

              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🔗 useContextフック（準備中）
              </div>

              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🪝 カスタムフック（準備中）
              </div>
            </div>
          </div>

          {/* 🌳 応用編 */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">🌳 応用編</h2>
            <div className="space-y-3">
              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                ⚙️ useReducerフック（準備中）
              </div>

              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🚀 React Router（準備中）
              </div>

              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🌐 API連携（準備中）
              </div>
            </div>
          </div>

          {/* 🚀 実践編 */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">🚀 実践編</h2>
            <div className="space-y-3">
              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🏗️ プロジェクト構築（準備中）
              </div>

              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🧪 テスト（準備中）
              </div>

              <div className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-6 rounded-lg opacity-75 cursor-not-allowed">
                🚀 デプロイ（準備中）
              </div>
            </div>
          </div>
        </div>

        {/* 説明文 */}
        <p className="text-gray-500 text-center text-sm">
          学習したいトピックを選んでね！楽しく学んでいこう♪✨
        </p>
      </div>
    </div>
  )
}

export default App
