import { NextRequest, NextResponse } from 'next/server'

const locales = ['zh', 'en']
const defaultLocale = 'zh'

// 获取首选语言
function getLocale(request: NextRequest): string {
  // 1. 检查 URL 中是否已有语言前缀
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return pathname.split('/')[1]
  
  // 2. 检查 Accept-Language 头
  const acceptLanguage = request.headers.get('Accept-Language')
  if (acceptLanguage) {
    // 解析 Accept-Language 头，找到最匹配的语言
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
    
    for (const lang of languages) {
      if (lang.startsWith('en')) return 'en'
      if (lang.startsWith('zh')) return 'zh'
    }
  }
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  // 如果没有语言前缀，重定向到带语言前缀的路径
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }
}

export const config = {
  matcher: [
    // 匹配所有路径，除了 API 路由、静态文件等
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}