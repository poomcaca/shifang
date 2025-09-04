'use client'

import Iridescence from './Iridescence'
import { useTheme } from '@/contexts/ThemeContext'
import { Locale, getTranslation } from '@/lib/i18n'

interface ReviewSceneProps {
  onRetry: () => void
  onComplete: () => void
  locale: Locale
}

export default function ReviewScene({ onRetry, onComplete, locale }: ReviewSceneProps) {
  const { textColor, isNightMode } = useTheme()
  const t = (key: string) => getTranslation(locale, key)
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${textColor} text-lg font-semibold tracking-tight`} style={{ fontFamily: '"SF Pro Rounded", "Inter", system-ui, sans-serif' }}>
      <div className="w-full max-w-md space-y-8">
        <h1 className={`text-2xl md:text-3xl font-semibold text-center ${textColor} tracking-tight`}>
          {t('review.title')}
        </h1>

        <div className="space-y-4">
          <button
            onClick={onRetry}
            className={`w-full py-4 px-6 backdrop-blur-md rounded-lg font-normal text-lg transition-all duration-300 border hover:shadow-xl ${
              isNightMode
                ? 'bg-white/15 hover:bg-white/25 border-white/30 hover:border-white/50 hover:shadow-white/20 text-white'
                : 'bg-black/5 hover:bg-black/10 border-black/10 hover:border-black/20 hover:shadow-black/10 text-gray-900'
            }`}
            style={{ 
              textShadow: isNightMode ? '0px 1px 3px rgba(0, 0, 0, 0.8)' : '0px 1px 3px rgba(255, 255, 255, 0.8)', 
              letterSpacing: '0.05em' 
            }}
          >
            {t('review.retry')}
          </button>
          
          <button
            onClick={onComplete}
            className={`w-full py-4 px-6 backdrop-blur-md rounded-lg font-normal text-lg transition-all duration-300 border hover:shadow-xl ${
              isNightMode
                ? 'bg-white/20 hover:bg-white/30 border-white/40 hover:border-white/60 hover:shadow-white/25 text-white'
                : 'bg-black/8 hover:bg-black/15 border-black/15 hover:border-black/25 hover:shadow-black/15 text-gray-900'
            }`}
            style={{ 
              textShadow: isNightMode ? '0px 1px 3px rgba(0, 0, 0, 0.9)' : '0px 1px 3px rgba(255, 255, 255, 0.9)', 
              letterSpacing: '0.05em' 
            }}
          >
            {t('review.complete')}
          </button>
        </div>
      </div>
    </div>
  )
} 