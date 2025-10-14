import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { JSXBasics } from './components/JSXBasics'
import { ComponentBasics } from './components/ComponentBasics'
import { PropsBasics } from './components/PropsBasics'
import { StateBasics } from './components/StateBasics'
import { EventHandling } from './components/EventHandling'

function App() {
  const [showJSXBasics, setShowJSXBasics] = useState(false)
  const [showComponentBasics, setShowComponentBasics] = useState(false)
  const [showPropsBasics, setShowPropsBasics] = useState(false)
  const [showStateBasics, setShowStateBasics] = useState(false)
  const [showEventHandling, setShowEventHandling] = useState(false)
  const [count, setCount] = useState(0)

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
        <div className="space-y-4 mb-6">
          <button
            onClick={() => setShowJSXBasics(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            📝 JSXの基本文法を学ぶ
          </button>

          <button
            onClick={() => setShowComponentBasics(true)}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🏗️ コンポーネントの作成を学ぶ
          </button>

          <button
            onClick={() => setShowPropsBasics(true)}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🎁 Props（プロパティ）の受け渡しを学ぶ
          </button>

          <button
            onClick={() => setShowStateBasics(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            📊 State（状態）の管理を学ぶ
          </button>

          <button
            onClick={() => setShowEventHandling(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🎪 イベントハンドリングを学ぶ
          </button>
          
          <button
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🎯 カウンター: {count}
          </button>
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
