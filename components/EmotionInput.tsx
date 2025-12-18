import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEmotionCategories } from '@/data'
import { useTheme } from '@/contexts/ThemeContext'
import { Locale, getTranslation } from '@/lib/i18n'
import { X } from 'lucide-react'

interface EmotionInputProps {
  onEmotionSelect: (emotion: string) => void
  locale: Locale
}

export default function EmotionInput({ onEmotionSelect, locale }: EmotionInputProps) {
  const { textColor, secondaryTextColor, isNightMode } = useTheme()
  const [customEmotion, setCustomEmotion] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  
  const emotionCategories = getEmotionCategories(locale)
  const separator = locale === 'zh' ? '，' : ', '
  const t = (key: string) => getTranslation(locale, key)

  // 当选择了分类时，自动打开抽屉
  const openCategoryDrawer = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setIsDrawerOpen(true)
  }

  function handleCustomSubmit() {
    console.log('Button clicked, customEmotion:', customEmotion)
    if (customEmotion.trim()) {
      onEmotionSelect(customEmotion.trim())
    }
  }

  function handleEmotionSelect(emotion: string) {
    // 将选择的情感词条添加到文本框中
    const currentText = customEmotion.trim()
    // 检查是否已经添加过，避免重复添加同一词条
    const currentEmotions = currentText.split(separator).map(e => e.trim())
    
    let newText = currentText
    if (!currentEmotions.includes(emotion)) {
        newText = currentText
      ? `${currentText}${separator}${emotion}`
      : emotion
    setCustomEmotion(newText)
    }

    // 记录已选择的情感词条用于视觉反馈
    if (!selectedEmotions.includes(emotion)) {
      setSelectedEmotions([...selectedEmotions, emotion])
    }
  }

  function removeEmotion(emotionToRemove: string) {
    // 从文本框中移除选择的情感词条
    const emotions = customEmotion.split(separator).filter(e => e.trim() !== emotionToRemove)
    setCustomEmotion(emotions.join(separator))

    // 从已选择列表中移除
    setSelectedEmotions(selectedEmotions.filter(e => e !== emotionToRemove))
  }

  // 防止抽屉打开时背景滚动
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isDrawerOpen])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className={`text-2xl md:text-3xl font-bold text-center ${textColor}`}>
          {t('emotion.title')}
        </h1>

        {/* 自由六步入口 */}
        <div className="flex justify-center items-center gap-4">
          <Link 
            href={`/${locale}/six-steps`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
              isNightMode
                ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80 border border-slate-200/50'
            }`}
          >
            <span>{t('sixSteps.link')}</span>
            <span>→</span>
          </Link>

          <Link
            href={`/${locale}/about`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
              isNightMode
                ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80 border border-slate-200/50'
            }`}
          >
            <span>{locale === 'zh' ? '关于这里' : 'About Here'}</span>
            <span>→</span>
          </Link>
        </div>

        {/* 自由输入框 */}
        <div className="space-y-4">
          <textarea
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            placeholder={t('emotion.placeholder')}
            className={`w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base ${isNightMode
              ? 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-300'
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
          />

          {/* 显示已选择的情感词条标签 */}
          {selectedEmotions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedEmotions.map((emotion) => (
                <span
                  key={emotion}
                  className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${isNightMode
                    ? 'bg-blue-900/50 text-blue-200'
                    : 'bg-blue-100 text-blue-800'
                    }`}
                >
                  {emotion}
                  <button
                    onClick={() => removeEmotion(emotion)}
                    className={`ml-1 text-sm ${isNightMode
                      ? 'text-blue-300 hover:text-blue-100'
                      : 'text-blue-600 hover:text-blue-800'
                      }`}
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
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${isNightMode
              ? 'bg-blue-700 text-white disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-blue-600'
              : 'bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700'
              }`}
          >
            {t('emotion.start')}
          </button>
        </div>

        {/* 情感分类选择 */}
        <div className="space-y-4">
          {/* 快捷词条选择 */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[t('quick.safety'), t('quick.recognition'), t('quick.control')].map((quickEmotion) => (
              <button
                key={quickEmotion}
                onClick={() => handleEmotionSelect(quickEmotion)}
                className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${selectedEmotions.includes(quickEmotion)
                  ? isNightMode
                    ? 'bg-blue-900/50 text-blue-200 border border-blue-700 shadow-sm'
                    : 'bg-blue-200 text-blue-800 border border-blue-300 shadow-sm'
                  : isNightMode
                    ? 'bg-gray-800/30 text-gray-200 hover:bg-blue-900/30 hover:shadow-sm'
                    : 'bg-gray-50 hover:bg-blue-100 hover:shadow-sm'
                  }`}
              >
                {quickEmotion}
              </button>
            ))}
          </div>

          {/* 分类按钮 - 点击后打开抽屉 */}
          <div className="grid grid-cols-2 gap-3">
            {emotionCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => openCategoryDrawer(category.name)}
                className={`py-4 px-4 rounded-xl font-medium text-lg transition-all transform active:scale-95 ${selectedCategory === category.name
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent'
                  : isNightMode
                    ? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 hover:shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 底部抽屉 (Drawer) */}
      {isDrawerOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* 遮罩层 - 点击关闭 */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* 抽屉面板 */}
          <div className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl ${
            isNightMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}
          style={{
            animation: 'slideUp 0.3s ease-out'
          }}>
            
            {/* 抽屉头部 */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${
              isNightMode ? 'border-gray-800' : 'border-gray-100'
            }`}>
              <h3 className="text-xl font-bold">{selectedCategory}</h3>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className={`p-2 rounded-full transition-colors ${
                  isNightMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            {/* 抽屉内容 - 滚动区域 */}
            <div className="flex-1 overflow-y-auto p-6 min-h-[40vh]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-8">
                  {emotionCategories
                    .find(cat => cat.name === selectedCategory)
                    ?.emotions.map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => handleEmotionSelect(emotion)}
                      className={`py-3 px-4 text-base rounded-lg text-left transition-all duration-200 ${
                        selectedEmotions.includes(emotion)
                          ? isNightMode
                            ? 'bg-blue-900/60 text-blue-100 border border-blue-700/50'
                            : 'bg-blue-100 text-blue-900 border border-blue-200'
                          : isNightMode
                            ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {emotion}
                      {selectedEmotions.includes(emotion) && (
                        <span className="float-right text-blue-500 font-bold">✓</span>
                      )}
                      </button>
                    ))}
              </div>
              
              {/* 底部提示文字 */}
              <p className={`text-center text-sm mt-4 mb-2 ${isNightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                选择符合你当下的词语，可多选
              </p>
            </div>
            
            {/* 抽屉底部操作栏 */}
            <div className={`p-4 border-t ${isNightMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                选好了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
