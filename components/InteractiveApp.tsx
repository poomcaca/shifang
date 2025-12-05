'use client'

import React, { useState } from 'react'
import EmotionInput from '@/components/EmotionInput'
import ChallengeScene from '@/components/ChallengeScene'
import ReviewScene from '@/components/ReviewScene'
import AudioPlayer from '@/components/AudioPlayer'
import { Locale } from '@/lib/i18n'

type Scene = 'input' | 'challenge' | 'review'

interface InteractiveAppProps {
  locale: Locale
}

export default function InteractiveApp({ locale }: InteractiveAppProps) {
  const [currentScene, setCurrentScene] = useState<Scene>('input')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  function handleSceneChange(newScene: Scene) {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene(newScene)
      setIsTransitioning(false)
    }, 150)
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

  function handleRestart() {
    setSelectedEmotion('')
    handleSceneChange('input')
  }

  function handleExit() {
    setSelectedEmotion('')
    handleSceneChange('input')
  }

  return (
    <div className={`interactive-app transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {currentScene === 'input' && (
        <div className="scene-enter">
          <EmotionInput onEmotionSelect={handleEmotionSelect} locale={locale} />
        </div>
      )}
      
      {currentScene === 'challenge' && (
        <div className="scene-enter">
          <ChallengeScene
            selectedEmotion={selectedEmotion}
            onComplete={handleChallengeComplete}
            onExit={handleExit}
            locale={locale}
          />
        </div>
      )}
      
      {currentScene === 'review' && (
        <div className="scene-enter">
          <ReviewScene
            onRetry={handleRetry}
            onRestart={handleRestart}
            locale={locale}
          />
        </div>
      )}
      
      <AudioPlayer />
    </div>
  )
}
