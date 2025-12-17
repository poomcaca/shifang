'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Locale } from '@/lib/i18n'
import { useTheme } from '@/contexts/ThemeContext'

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const { textColor, isNightMode } = useTheme()
  const locale = params.locale

  return (
    <div className={`min-h-screen flex flex-col p-4 md:p-8 transition-colors duration-300`}>
      {/* 顶部导航 */}
      <div className="mb-8">
        <Link 
          href={`/${locale}`}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 ${textColor}`}
        >
          <ArrowLeft size={20} />
          {locale === 'zh' ? '返回' : 'Back'}
        </Link>
      </div>

      {/* 主要内容 */}
      <div className={`max-w-2xl mx-auto space-y-8 leading-relaxed ${textColor}`}>
        <section className="space-y-6">
          <h1 className="text-2xl font-bold tracking-wide">致每一个想要自由的你</h1>
          
          <div className="space-y-6 opacity-85 text-lg font-normal">
            <p>
              一直以来我都相信，幸福和自由并非远方的赏赐，而是一种当下的选择。就像莱斯特所说，<span className="font-semibold">你必须想要自由超过世界</span>。当你做出自由的决定，锁链便会自动脱落。
            </p>
            
            <p>
              听起来很美，但我刚开始释放的时候，念头依然像飞鸟，轻易地带走我。为了安放这些躁动，我按照自己喜好，搭建了这个网站。
            </p>
            
            <p>
              这是一个流动的、彩色的、呼吸般自然的空间。不论何时何地，我都能在这里找回自己。
            </p>
            
            <p>
              当然这也是为你准备的。我希望它也能成为你的一面镜子。如果你不再需要它或者任何的工具，我会由衷地为你感到高兴。<span className="font-semibold">因为你原本就是自由本身，不缺任何东西，也无需任何修补。</span>
            </p>
          </div>
        </section>

        <section className="space-y-6 pt-8">
          <h2 className="text-xl font-bold tracking-wide">关于未来的种子</h2>
          
          <div className="space-y-6 opacity-85 text-lg font-normal">
            <p>
              我心中正种下一片森林，希望这里能生长成一个温暖的中文释放社区。
              因为我发现自由是可以传染的，仅仅是看着别人卸下重担，自己肩膀<br />的石头也会跟着松动。
            </p>

            <p>
            在向内探寻的旅途中，我们需要彼此，就像镜子需要光。<br />我们并不需要一个导师，只需要一个声音说：<span className="font-semibold">嘿，我也在这。</span>
            </p>
              
            
            <p>
              为了这颗种子能慢慢发芽，我正在制作微信小程序，以便随身陪伴。
              将会上线新功能：ai引导释放、释放记录...
              
              
              

            </p>
            <p>
            欢迎加入我们的🍠群聊，分享你的经历、想法和建议，一起把释放变成生活方式。
<a 
  href="http://xhslink.com/o/91CFMK4z3yE" 
  target="_blank" 
  rel="noopener noreferrer"
  className="underline decoration-1 underline-offset-4 hover:text-blue-500"
>
  http://xhslink.com/o/91CFMK4z3yE
</a>
            </p>
          </div>
        </section>

        <section className="pt-12 text-center opacity-80 italic">
          <p>
            我们并不是在寻找自由，而是在剥离那些阻碍我们看见自由的假象。
          </p>
        </section>
      </div>
    </div>
  )
}
