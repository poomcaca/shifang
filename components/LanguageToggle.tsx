'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const { isNightMode } = useTheme()

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh')
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`fixed top-4 left-4 z-50 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
        isNightMode 
          ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
      title="切换语言 / Switch Language"
    >
      中/EN
    </button>
  )
}