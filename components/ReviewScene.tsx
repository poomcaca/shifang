'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Locale, getTranslation } from '@/lib/i18n'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  angle: number
  speed: number
  opacity: number
}

interface ReviewSceneProps {
  onRetry: () => void
  onRestart: () => void
  locale: Locale
}

// 柔和的光点颜色
const PARTICLE_COLORS = [
  'rgba(255, 215, 180, 0.8)',  // 淡金
  'rgba(255, 182, 193, 0.7)',  // 淡粉
  'rgba(200, 180, 255, 0.7)',  // 淡紫
  'rgba(180, 220, 255, 0.7)',  // 淡蓝
  'rgba(255, 230, 200, 0.8)',  // 暖白
]

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50, // 从中心开始 (%)
    y: 50,
    size: Math.random() * 8 + 4, // 4-12px
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5, // 均匀分布 + 随机偏移
    speed: Math.random() * 150 + 100, // 100-250px
    opacity: Math.random() * 0.4 + 0.6, // 0.6-1.0
  }))
}

export default function ReviewScene({ onRetry, onRestart, locale }: ReviewSceneProps) {
  const { textColor, isNightMode } = useTheme()
  const t = (key: string) => getTranslation(locale, key)
  
  const [showCelebration, setShowCelebration] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'explode' | 'fade'>('idle')

  const handleComplete = useCallback(() => {
    setShowCelebration(true)
    setParticles(generateParticles(40))
    setAnimationPhase('explode')
    
    // 动画结束后进入 fade 阶段
    setTimeout(() => {
      setAnimationPhase('fade')
    }, 1200)
  }, [])

  // 粒子动画
  useEffect(() => {
    if (animationPhase !== 'explode') return
    
    const startTime = Date.now()
    const duration = 1200 // 1.2秒
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // easeOutQuart 缓动
      const eased = 1 - Math.pow(1 - progress, 4)
      
      setParticles(prev => prev.map(p => ({
        ...p,
        x: 50 + Math.cos(p.angle) * p.speed * eased * 0.3,
        y: 50 + Math.sin(p.angle) * p.speed * eased * 0.3,
        opacity: p.opacity * (1 - progress * 0.7), // 逐渐淡出
      })))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [animationPhase])
  
  // 庆祝动画界面
  if (showCelebration) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden ${textColor} text-lg font-semibold tracking-tight`} style={{ fontFamily: '"SF Pro Rounded", "Inter", system-ui, sans-serif' }}>
        {/* 粒子层 */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full blur-[1px]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: p.opacity,
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
            />
          ))}
        </div>
        
        {/* 内容 */}
        <div className={`w-full max-w-md space-y-8 text-center relative z-10 transition-all duration-700 ${animationPhase === 'fade' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="space-y-4">
            <div 
              className="text-6xl animate-bounce"
              style={{ animationDuration: '2s', animationIterationCount: '2' }}
            >
              ✨
            </div>
            <h1 className={`text-2xl md:text-3xl font-semibold ${textColor} tracking-tight`}>
              {t('celebration.title')}
            </h1>
            <p className={`text-base ${isNightMode ? 'text-white/70' : 'text-gray-600'}`}>
              {t('celebration.subtitle')}
            </p>
          </div>

          <button
            onClick={onRestart}
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
            {t('celebration.home')}
          </button>
        </div>
      </div>
    )
  }
  
  // 原始的 Review 界面
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
            onClick={handleComplete}
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
