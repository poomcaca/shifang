import React from 'react'
import AppBackground from '@/components/AppBackground'
import SixSteps from '@/components/SixSteps'
import { Locale } from '@/lib/i18n'
import { Metadata } from 'next'

// 在 Cloudflare Pages 上使用 Edge Runtime 动态渲染该路由
export const runtime = 'edge'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isZh = params.locale === 'zh'
  return {
    title: isZh ? '自由六步 - 释放练习' : 'Six Steps to Freedom - Release Practice',
    description: isZh 
      ? '通过六个简单的步骤，学会释放想要控制和想要被认同的欲望，获得真正的自由。'
      : 'Learn to release the desire for control and approval through six simple steps, and achieve true freedom.',
  }
}

export default function SixStepsPage({ params }: { params: { locale: Locale } }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AppBackground />
      <div className="relative z-10">
        <SixSteps locale={params.locale} />
      </div>
    </div>
  )
}

