'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Locale } from '@/lib/i18n'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: Locale) => {
    // 移除当前语言前缀，添加新语言前缀
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const newPath = newLocale === 'zh' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="fixed top-4 right-20 z-50">
      <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <button
          onClick={() => switchLanguage('zh')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === 'zh'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          中文
        </button>
        <button
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === 'en'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          English
        </button>
      </div>
    </div>
  )
}