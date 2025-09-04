import type { Metadata } from 'next'
import Script from 'next/script'
import '../globals.css'
import AppBackground from '@/components/AppBackground'
import { ThemeProvider } from '@/contexts/ThemeContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Locale } from '@/lib/i18n'

// 根据语言生成元数据
export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const locale = params.locale
  
  const titles = {
    zh: 'Sedona Method Questions & Emotional Chart | SedonaRelease.online',
    en: 'Sedona Method Questions & Emotional Chart | SedonaRelease.online'
  }
  
  const descriptions = {
    zh: 'The Sedona Method, simplified—step‑by‑step release questions, 5 ways, emotions chart, and PDFs. Practice in your browser and feel lighter in minutes. Try it free.',
    en: 'The Sedona Method, simplified—step‑by‑step release questions, 5 ways, emotions chart, and PDFs. Practice in your browser and feel lighter in minutes. Try it free.'
  }

  return {
    title: titles[locale] || titles.zh,
    description: descriptions[locale] || descriptions.zh,
  }
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const locale = params.locale
  const htmlLang = locale === 'en' ? 'en' : 'zh-CN'

  return (
    <html lang={htmlLang}>
      <body className="min-h-screen bg-white text-gray-900 antialiased relative overflow-hidden">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RS9NQ92ZSD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RS9NQ92ZSD');
            
            // 调试信息
            console.log('Google Analytics loaded with ID: G-RS9NQ92ZSD');
            
            // 发送测试事件
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>

        <ThemeProvider>
          <LanguageSwitcher currentLocale={locale} />
          <AppBackground />
          <main className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}