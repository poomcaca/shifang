import React from 'react'
import { Locale, getTranslation } from '@/lib/i18n'
import { getEmotionCategories } from '@/data'
import InteractiveApp from '@/components/InteractiveApp'

// 生成静态参数用于预渲染
export async function generateStaticParams() {
  return [
    { locale: 'zh' },
    { locale: 'en' }
  ]
}

// 为每个语言版本生成元数据
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const locale = params.locale
  const t = (key: string) => getTranslation(locale, key)
  
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
    },
    alternates: {
      languages: {
        'zh-CN': '/zh',
        'en': '/en',
      },
    },
  }
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const locale = params.locale
  const t = (key: string) => getTranslation(locale, key)
  const emotionCategories = getEmotionCategories(locale)

  return (
    <>
      {/* SEO 友好的静态内容 - 搜索引擎可见 */}
      <div className="seo-content">
        <h1>{t('seo.h1')}</h1>
        <p>{t('seo.intro')}</p>
        
        <h2>{t('seo.howItWorks')}</h2>
        <ol>
          <li>{t('seo.step1')}</li>
          <li>{t('seo.step2')}</li>
          <li>{t('seo.step3')}</li>
          <li>{t('seo.step4')}</li>
        </ol>

        <h2>{t('seo.emotionCategories')}</h2>
        <ul>
          {emotionCategories.map((category) => (
            <li key={category.name}>
              <strong>{category.name}:</strong> {category.emotions.slice(0, 5).join(', ')}
              {category.emotions.length > 5 && '...'}
            </li>
          ))}
        </ul>

        <h2>{t('seo.benefits')}</h2>
        <ul>
          <li>{t('seo.benefit1')}</li>
          <li>{t('seo.benefit2')}</li>
          <li>{t('seo.benefit3')}</li>
        </ul>
      </div>

      {/* 交互式应用 */}
      <InteractiveApp locale={locale} />
    </>
  )
}