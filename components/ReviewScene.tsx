'use client'

import Iridescence from './Iridescence'

interface ReviewSceneProps {
  onRetry: () => void
  onComplete: () => void
}

export default function ReviewScene({ onRetry, onComplete }: ReviewSceneProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative text-slate-700 text-lg font-semibold tracking-tight" style={{ fontFamily: '"SF Pro Rounded", "Inter", system-ui, sans-serif' }}>
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-slate-700 tracking-tight">
          感觉如何？
        </h1>

        <div className="space-y-4">
          <button
            onClick={onRetry}
            className="w-full py-4 px-6 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg font-normal text-lg transition-all duration-300 border border-white/30 hover:border-white/50 hover:shadow-xl hover:shadow-white/20 text-slate-700"
            style={{ textShadow: '0px 1px 3px rgba(255, 255, 255, 0.8)', letterSpacing: '0.05em' }}
          >
            再次释放
          </button>
          
          <button
            onClick={onComplete}
            className="w-full py-4 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg font-normal text-lg transition-all duration-300 border border-white/40 hover:border-white/60 hover:shadow-xl hover:shadow-white/25 text-slate-700"
            style={{ textShadow: '0px 1px 3px rgba(255, 255, 255, 0.9)', letterSpacing: '0.05em' }}
          >
            更加自由了
          </button>
        </div>
      </div>
    </div>
  )
} 