'use client'

import React, { useState, useEffect } from 'react'
import { challengeQuestions } from '@/data/questions'
import Iridescence from './Iridescence'
import { useTheme } from '@/contexts/ThemeContext'

interface ChallengeSceneProps {
  selectedEmotion: string
  onComplete: () => void
  onExit: () => void
}

export default function ChallengeScene({ selectedEmotion, onComplete, onExit }: ChallengeSceneProps) {
  const { textColor, isNightMode } = useTheme()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')

  // 当问题索引变化时，重置答案显示状态
  useEffect(() => {
    setShowAnswer(false)
    setCurrentAnswer('')
  }, [currentQuestionIndex])

  function handleAnswer(answer: string) {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    // 生成并显示用户的回答
    const answerText = currentQuestion.answerTemplate(answer)
    setCurrentAnswer(answerText)
    setShowAnswer(true)

    // 延迟显示下一个问题或完成
    setTimeout(() => {
      if (currentQuestionIndex < challengeQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        // 完成所有问题，进入下一个场景
        onComplete()
      }
    }, 2500) // 显示2.5秒后进入下一个问题
  }

  const currentQuestion = challengeQuestions[currentQuestionIndex]

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${textColor} text-lg font-semibold tracking-tight`} style={{ fontFamily: '"SF Pro Rounded", "Inter", system-ui, sans-serif' }}>
      {/* 退出按钮 */}
      <div className="fixed top-4 right-4">
        <button
          onClick={onExit}
          className={`px-4 py-2 backdrop-blur-sm rounded-lg transition-all duration-300 border ${
            isNightMode 
              ? 'bg-white/20 hover:bg-white/30 border-white/30 text-white' 
              : 'bg-black/10 hover:bg-black/20 border-black/20 text-gray-900'
          }`}
        >
          退出
        </button>
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* 显示选择的感受 - 同排显示 */}
        <div className="flex items-baseline justify-center gap-2">
        <span>我的感受:</span>
          <span>{selectedEmotion}</span>
        </div>

        {/* 引导语 */}
        <div className="text-center">
          <p 
            key={`guidance-${currentQuestionIndex}`}
            className="leading-relaxed reveal-fade-ltr" 
            style={{ animationDelay: '500ms', ['--reveal-duration' as any]: '3000ms' }}
          >
            {currentQuestion.guidance}
          </p>
        </div>

        {/* 问题区域 */}
        <div className="space-y-6">
          <div className="flex items-center justify-center pop-in" style={{ animationDelay: '600ms' }}>
                          <div className="relative flex flex-col items-center justify-center w-64 h-64 rounded-full backdrop-blur-sm ring-1 ring-white/30 animate-breathing">
                <div className="text-center px-6">
                  <h2 
                    key={`question-${currentQuestionIndex}`}
                    className="drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] reveal-fade-ltr" 
                    style={{ animationDelay: currentQuestionIndex === 0 ? '2500ms' : '0ms', ['--reveal-duration' as any]: '2000ms' }}
                  >
                    {currentQuestion.text}
                  </h2>
                  
                  {/* 用户答案显示 */}
                  {showAnswer && (
                    <div 
                      className={`mt-4 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] reveal-fade-ltr`}
                      style={{ animationDelay: '300ms', ['--reveal-duration' as any]: '1500ms' }}
                    >
                      {currentAnswer}
                    </div>
                  )}
                </div>
              {/* 内部微光，透明且只为提升可读性 */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),rgba(255,255,255,0)_55%)]" />
              {/* 外侧柔光 */}
              <div className="pointer-events-none absolute -inset-3 rounded-full blur-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),rgba(255,255,255,0)_60%)]" />
              {/* 细薄彩色扇形渐变环，低透明度避免抢眼 */}
              <div className="pointer-events-none absolute inset-0 rounded-full [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-2px))] bg-[conic-gradient(from_0deg,rgba(255,0,128,0.15),rgba(0,128,255,0.15),rgba(0,255,200,0.15),rgba(255,200,0,0.15),rgba(255,0,128,0.15))]" />
            </div>
          </div>

          {/* 选项按钮：并排一行，缩小尺寸 */}
          <div 
            className={`grid grid-cols-3 gap-3 transition-opacity duration-500 reveal-fade-ltr ${showAnswer ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
            style={{ animationDelay: currentQuestionIndex === 0 ? '4500ms' : '2000ms', ['--reveal-duration' as any]: '1500ms' }}
          >
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full py-3 px-3 backdrop-blur-sm rounded-md transition-all duration-300 border hover:shadow-lg ${
                  isNightMode
                    ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 hover:shadow-white/10 text-white'
                    : 'bg-black/5 hover:bg-black/10 border-black/10 hover:border-black/20 hover:shadow-black/10 text-gray-900'
                }`}
                disabled={showAnswer}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 进度指示器 */}
        <div className="flex justify-center space-x-2">
          {challengeQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index <= currentQuestionIndex 
                  ? isNightMode
                    ? 'bg-white/80 shadow-md shadow-white/30 ring-1 ring-white/50'
                    : 'bg-gray-800/80 shadow-md shadow-gray-800/30 ring-1 ring-gray-800/50'
                  : isNightMode
                    ? 'bg-white/20 border border-white/30'
                    : 'bg-gray-800/20 border border-gray-800/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 