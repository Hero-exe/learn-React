import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

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
          Vite + React
        </h1>

        {/* カウンターカード */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            カウント: {count}
          </button>
          <p className="text-gray-600 text-center mt-4">
            <code className="bg-gray-200 px-2 py-1 rounded text-sm">src/App.tsx</code> を編集してHMRをテストしよう！
          </p>
        </div>

        {/* 説明文 */}
        <p className="text-gray-500 text-center text-sm">
          ViteとReactのロゴをクリックして、もっと学んでみよう！✨
        </p>
      </div>
    </div>
  )
}

export default App
