'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'zh' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 翻译文本
const translations = {
  zh: {
    // 主要界面
    'emotion.title': '此刻，你的感受是什么？',
    'emotion.placeholder': '请描述你的感受...',
    'emotion.start': '开始感受',
    
    // 快捷选项
    'quick.safe': '想要安全',
    'quick.approval': '想要被认同',
    'quick.control': '想要控制',
    
    // 情感分类
    'category.despair': '万念俱灰',
    'category.grief': '悲苦',
    'category.fear': '恐惧',
    'category.desire': '贪求',
    
    // 挑战场景
    'challenge.myFeeling': '我的感受:',
    'challenge.exit': '退出',
    
    // 问题选项
    'option.allow': '允许',
    'option.notAllow': '不允许',
    'option.uncertain': '不确定',
    'option.can': '能',
    'option.cannot': '不能',
    'option.willing': '愿意',
    'option.notWilling': '不愿意',
    'option.now': '现在',
    'option.later': '以后',
    
    // 回顾场景
    'review.title': '感觉如何？',
    'review.retry': '再次释放',
    'review.complete': '更加自由了',
    
    // 结束场景
    'end.title': '恭喜！完成了一次释放。',
    'end.restart': '开始新的释放',
    
    // 通用
    'common.retry': '重试',
    'common.complete': '完成',
    'common.restart': '重新开始',
    'common.exit': '退出'
  },
  en: {
    // 主要界面
    'emotion.title': 'How are you feeling right now?',
    'emotion.placeholder': 'Describe your feelings...',
    'emotion.start': 'Begin Journey',
    
    // 快捷选项
    'quick.safety': 'Want Safe',
    'quick.recognition': 'Want Approval',
    'quick.control': 'Want Control',
    
    // 情感分类
    'category.despair': 'Despair & Emptiness',
    'category.grief': 'Grief & Sorrow',
    'category.fear': 'Fear & Anxiety',
    'category.desire': 'Desire & Craving',
    
    // 挑战场景
    'challenge.myFeeling': 'My feeling:',
    'challenge.exit': 'Exit',
    
    // 问题选项
    'option.allow': 'Yes',
    'option.notAllow': 'No',
    'option.uncertain': 'Unsure',
    'option.can': 'Yes',
    'option.cannot': 'No',
    'option.willing': 'Yes',
    'option.notWilling': 'No',
    'option.now': 'Now',
    'option.later': 'Later',
    
    // 回顾场景
    'review.title': 'How do you feel?',
    'review.retry': 'Release Again',
    'review.complete': 'I Feel Freer',
    
    // 结束场景
    'end.title': 'Congratulations! You completed a release.',
    'end.restart': 'Start New Release',
    
    // 通用
    'common.retry': 'Try Again',
    'common.complete': 'Complete',
    'common.restart': 'Start Over',
    'common.exit': 'Exit'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh')

  useEffect(() => {
    // 检查本地存储
    const savedLang = localStorage.getItem('preferred-language') as Language
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setLanguage(savedLang)
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('en')) {
        setLanguage('en')
      } else if (browserLang.startsWith('zh')) {
        setLanguage('zh')
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('preferred-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}