'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DynamicTitle() {
  const { language } = useLanguage()

  useEffect(() => {
    const title = language === 'zh' ? '释放法引导' : 'Sedona Method Guide'
    const lang = language === 'zh' ? 'zh-CN' : 'en'
    
    document.title = title
    document.documentElement.lang = lang
  }, [language])

  return null // 这个组件不渲染任何内容，只是用来更新标题和语言属性
}