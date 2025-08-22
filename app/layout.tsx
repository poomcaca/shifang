import type { Metadata } from 'next'
import './globals.css'
import Iridescence from '@/components/Iridescence'

export const metadata: Metadata = {
  title: '释放法引导',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-gray-900 antialiased relative overflow-hidden">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Iridescence color={[1, 1, 1]} mouseReact={true} amplitude={0.15} speed={0.5} />
        </div>
        <main className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
} 