export interface EmotionCategory {
  name: string
  emotions: string[]
}

export interface AppState {
  currentScene: 'input' | 'challenge' | 'review' | 'end'
  selectedEmotion: string
  currentQuestionIndex: number
  answers: string[]
}

export interface Question {
  text: string
  options: string[]
  answerTemplate: (answer: string) => string
  guidance: string
} 