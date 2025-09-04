'use client'

import React, { useState, useEffect } from 'react'
import EmotionInput from '@/components/EmotionInput'
import ChallengeScene from '@/components/ChallengeScene'
import ReviewScene from '@/components/ReviewScene'
import EndScene from '@/components/EndScene'
import AudioPlayer from '@/components/AudioPlayer'
import DynamicTitle from '@/components/DynamicTitle'
import { Locale } from '@/lib/i18n'

type Scene = 'input' | 'challenge' | 'review' | 'end'

export default function Home({ params }: { params: { locale: Locale } }) {
  const [currentScene, setCurrentScene] = useState<Scene>('input')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  function handleSceneChange(newScene: Scene) {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene(newScene)
      setIsTransitioning(false)
    }, 150) // 短暂的过渡时间
  }

  function handleEmotionSelect(emotion: string) {
    setSelectedEmotion(emotion)
    handleSceneChange('challenge')
  }

  function handleChallengeComplete() {
    handleSceneChange('review')
  }

  function handleRetry() {
    handleSceneChange('challenge')
  }

  function handleComplete() {
    handleSceneChange('end')
  }

  function handleRestart() {
    setSelectedEmotion('')
    handleSceneChange('input')
  }

  function handleExit() {
    setSelectedEmotion('')
    handleSceneChange('input')
  }

  return (
    <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* 动态标题 */}
      <DynamicTitle locale={params.locale} />
      
      {currentScene === 'input' && (
        <div className="scene-enter">
          <EmotionInput onEmotionSelect={handleEmotionSelect} locale={params.locale} />
        </div>
      )}
      
      {currentScene === 'challenge' && (
        <div className="scene-enter">
          <ChallengeScene
            selectedEmotion={selectedEmotion}
            onComplete={handleChallengeComplete}
            onExit={handleExit}
            locale={params.locale}
          />
        </div>
      )}
      
      {currentScene === 'review' && (
        <div className="scene-enter">
          <ReviewScene
            onRetry={handleRetry}
            onComplete={handleComplete}
            locale={params.locale}
          />
        </div>
      )}
      
      {currentScene === 'end' && (
        <div className="scene-enter">
          <EndScene onRestart={handleRestart} locale={params.locale} />
        </div>
      )}
      
      {/* 音频播放器 - 固定在右下角 */}
      <AudioPlayer />
    </div>
  )
}