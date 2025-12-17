'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check, ArrowLeft } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'
import { Locale, getTranslation } from '@/lib/i18n'
import { sixSteps } from '@/data/six-steps'

interface SixStepsProps {
    locale: Locale
}

export default function SixSteps({ locale }: SixStepsProps) {
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const [isWaveActive, setIsWaveActive] = useState(false)
    const { isNightMode } = useTheme()
    const t = (key: string) => getTranslation(locale, key)

    const handleStepClick = (id: number) => {
        if (!completedSteps.includes(id)) {
            const newCompleted = [...completedSteps, id]
            setCompletedSteps(newCompleted)
            
            if (newCompleted.length === sixSteps.length) {
                setTimeout(() => {
                    setIsWaveActive(true)
                }, 500)
            }
        }
    }

    const progress = (completedSteps.length / sixSteps.length) * 100

    return (
        <div className="relative min-h-screen w-full max-w-2xl mx-auto px-4 pt-4 pb-20 flex flex-col items-center">
            
            {/* Back Button - Fixed top left */}
            <Link 
                href={`/${locale}`}
                className={cn(
                    "fixed top-4 left-4 z-20 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    isNightMode
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                )}
            >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('common.back')}</span>
            </Link>

            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-4 mt-8"
            >
                <h1 className={cn(
                    "text-2xl font-bold mb-1",
                    isNightMode ? "text-white" : "text-slate-800"
                )}>
                    {t('sixSteps.title')}
                </h1>
                <p className={cn(
                    "text-sm",
                    isNightMode ? "text-white/70" : "text-slate-600"
                )}>
                    {t('sixSteps.subtitle')}
                </p>
            </motion.div>

            {/* Steps List */}
            <div className="w-full space-y-3 relative mb-16">

                {sixSteps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id)
                    const content = locale === 'zh' ? step.content : step.contentEn
                    const subContent = locale === 'zh' ? step.subContent : step.subContentEn
                    
                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleStepClick(step.id)}
                            className={cn(
                                "relative px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden",
                                isNightMode
                                    ? isCompleted
                                        ? "bg-white/15 border-white/30"
                                        : "bg-white/5 border-white/10 hover:bg-white/10"
                                    : isCompleted
                                        ? "bg-white/80 border-white shadow-md"
                                        : "bg-white/40 border-white/50 hover:bg-white/60"
                            )}
                        >
                            {/* Wave Light Effect */}
                            {isWaveActive && (
                                <motion.div
                                    className={cn(
                                        "absolute inset-0 -skew-x-12",
                                        isNightMode
                                            ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            : "bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent"
                                    )}
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ 
                                        delay: index * 0.2, 
                                        duration: 1, 
                                        ease: "easeInOut" 
                                    }}
                                />
                            )}

                            <div className="flex items-start gap-3 relative z-10">
                                {/* Step Number */}
                                <div className={cn(
                                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                                    isNightMode
                                        ? isCompleted
                                            ? "bg-green-500/30 text-green-300"
                                            : "bg-white/10 text-white/60"
                                        : isCompleted
                                            ? "bg-green-500/20 text-green-700"
                                            : "bg-slate-200/80 text-slate-500"
                                )}>
                                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.id}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <p className={cn(
                                        "text-sm font-medium leading-relaxed",
                                        isNightMode
                                            ? isCompleted ? "text-white" : "text-white/80"
                                            : isCompleted ? "text-slate-800" : "text-slate-700"
                                    )}>
                                        {content}
                                    </p>
                                    {subContent && (
                                        <p className={cn(
                                            "text-xs mt-1",
                                            isNightMode ? "text-white/50" : "text-slate-500"
                                        )}>
                                            {subContent}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Bottom Progress Bar */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 p-3 pb-4",
                isNightMode
                    ? "bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"
                    : "bg-gradient-to-t from-white/90 via-white/50 to-transparent"
            )}>
                <div className="max-w-2xl mx-auto w-full">
                    <div className={cn(
                        "flex justify-between text-xs mb-1.5 font-medium px-1",
                        isNightMode ? "text-white/70" : "text-slate-600"
                    )}>
                        <span>{completedSteps.length} / {sixSteps.length}</span>
                        <span>
                            {isWaveActive 
                                ? t('sixSteps.complete') 
                                : t('sixSteps.clickToProgress')
                            }
                        </span>
                    </div>
                    <div className={cn(
                        "h-1.5 rounded-full overflow-hidden",
                        isNightMode ? "bg-white/10" : "bg-slate-200/70"
                    )}>
                        <motion.div 
                            className={cn(
                                "h-full",
                                isNightMode
                                    ? "bg-gradient-to-r from-blue-400 to-purple-400"
                                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

