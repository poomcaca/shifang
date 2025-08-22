'use client'

import Iridescence from './Iridescence'

interface EndSceneProps {
  onRestart: () => void
}

export default function EndScene({ onRestart }: EndSceneProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative text-slate-700 text-lg font-semibold tracking-tight" style={{ fontFamily: '"SF Pro Rounded", "Inter", system-ui, sans-serif' }}>
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <div className="text-6xl">🎉</div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-700 tracking-tight">
            恭喜！完成了一次释放。
          </h1>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg font-normal text-lg transition-all duration-300 border border-white/40 hover:border-white/60 hover:shadow-xl hover:shadow-white/25 text-slate-700"
          style={{ textShadow: '0px 1px 3px rgba(255, 255, 255, 0.9)', letterSpacing: '0.05em' }}
        >
          开始新的释放
        </button>
      </div>
    </div>
  )
} 