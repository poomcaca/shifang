'use client'

import { useEffect } from 'react'
import { Locale } from '@/lib/i18n'

interface DynamicTitleProps {
  locale: Locale
}

export default function DynamicTitle({ locale }: DynamicTitleProps) {
  useEffect(() => {
    const title = locale === 'zh' ? '释放法引导' : 'Sedona Method Guide'
    document.title = title
  }, [locale])

  return null // 这个组件不渲染任何内容，只是用来更新标题
}