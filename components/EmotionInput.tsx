'use client'

import React, { useState } from 'react'
import { emotionCategories } from '@/data/emotions'

interface EmotionInputProps {
  onEmotionSelect: (emotion: string) => void
}

export default function EmotionInput({ onEmotionSelect }: EmotionInputProps) {
  const [customEmotion, setCustomEmotion] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])

  function handleCustomSubmit() {
    console.log('Button clicked, customEmotion:', customEmotion)
    if (customEmotion.trim()) {
      onEmotionSelect(customEmotion.trim())
    }
  }

  function handleEmotionSelect(emotion: string) {
    // 将选择的情感词条添加到文本框中
    const currentText = customEmotion.trim()
    const newText = currentText
      ? `${currentText}，${emotion}`
      : emotion

    setCustomEmotion(newText)

    // 记录已选择的情感词条用于视觉反馈
    if (!selectedEmotions.includes(emotion)) {
      setSelectedEmotions([...selectedEmotions, emotion])
    }
  }

  function removeEmotion(emotionToRemove: string) {
    // 从文本框中移除选择的情感词条
    const emotions = customEmotion.split('，').filter(e => e.trim() !== emotionToRemove)
    setCustomEmotion(emotions.join('，'))

    // 从已选择列表中移除
    setSelectedEmotions(selectedEmotions.filter(e => e !== emotionToRemove))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
          此刻，你的感受是什么？
        </h1>

        {/* 自由输入框 */}
        <div className="space-y-4">
          <textarea
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            placeholder="请描述你的感受..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />

          {/* 显示已选择的情感词条标签 */}
          {selectedEmotions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedEmotions.map((emotion) => (
                <span
                  key={emotion}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {emotion}
                  <button
                    onClick={() => removeEmotion(emotion)}
                    className="ml-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            onClick={handleCustomSubmit}
            disabled={!customEmotion.trim()}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            开始感受
          </button>
        </div>



        {/* 情感分类选择 */}
        <div className="space-y-4">


          {/* 分类选择 */}
          <div className="grid grid-cols-2 gap-3">
            {emotionCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${selectedCategory === category.name
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* 情绪词汇选择 */}
          {selectedCategory && (
            <div className="space-y-3 mt-6">
              <h4 className="font-medium text-gray-900 text-center">{selectedCategory}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-96 overflow-y-auto scrollbar-smooth pb-12">
                <style jsx>{`
                  .scrollbar-smooth {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling: touch;
                  }
                  
                  .scrollbar-smooth::-webkit-scrollbar {
                    width: 6px;
                  }
                  
                  .scrollbar-smooth::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  
                  .scrollbar-smooth::-webkit-scrollbar-thumb {
                    background-color: rgba(156, 163, 175, 0.5);
                    border-radius: 3px;
                    transition: background-color 0.2s ease;
                  }
                  
                  .scrollbar-smooth::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(156, 163, 175, 0.8);
                  }
                `}</style>
                {emotionCategories
                  .find(cat => cat.name === selectedCategory)
                  ?.emotions.map((emotion) => (
                    <button
                      key={emotion}
                      onClick={() => handleEmotionSelect(emotion)}
                      className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ease-in-out text-left transform hover:scale-105 ${selectedEmotions.includes(emotion)
                          ? 'bg-blue-200 text-blue-800 border border-blue-300 shadow-sm'
                          : 'bg-gray-50 hover:bg-blue-100 hover:shadow-sm'
                        }`}
                    >
                      {emotion}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 