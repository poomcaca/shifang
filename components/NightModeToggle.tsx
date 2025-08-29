'use client'

import { useState, useEffect } from 'react'

interface NightModeToggleProps {
  onModeChange: (isNight: boolean) => void
}

export default function NightModeToggle({ onModeChange }: NightModeToggleProps) {
  const [isNight, setIsNight] = useState(false)

  // 检测系统深色模式偏好
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsNight(mediaQuery.matches)
    onModeChange(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsNight(e.matches)
      onModeChange(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [onModeChange])

  const toggleMode = () => {
    const newMode = !isNight
    setIsNight(newMode)
    onModeChange(newMode)
  }

  return (
    <button
      onClick={toggleMode}
      className="fixed top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/20 transition-colors"
      title={isNight ? '切换到日间模式' : '切换到夜间模式'}
    >
      {isNight ? (
        <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}