'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  isNightMode: boolean
  setIsNightMode: (isNight: boolean) => void
  textColor: string
  secondaryTextColor: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isNightMode, setIsNightMode] = useState(false)

  // 检测系统深色模式偏好
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsNightMode(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsNightMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 根据模式动态设置文字颜色
  const textColor = isNightMode ? 'text-white' : 'text-gray-900'
  const secondaryTextColor = isNightMode ? 'text-gray-200' : 'text-gray-700'

  return (
    <ThemeContext.Provider value={{
      isNightMode,
      setIsNightMode,
      textColor,
      secondaryTextColor
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}