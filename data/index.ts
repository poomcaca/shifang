import { EmotionCategory } from '@/types'
import { emotionCategories as emotionCategoriesZh } from './emotions'
import { emotionCategories as emotionCategoriesEn } from './emotions-en'

import { Question } from '@/types'
import { challengeQuestions as challengeQuestionsZh } from './questions'
import { challengeQuestions as challengeQuestionsEn } from './questions-en'

export function getEmotionCategories(language: 'zh' | 'en'): EmotionCategory[] {
  return language === 'zh' ? emotionCategoriesZh : emotionCategoriesEn
}

export function getChallengeQuestions(language: 'zh' | 'en'): Question[] {
  return language === 'zh' ? challengeQuestionsZh : challengeQuestionsEn
}

export { emotionCategories as emotionCategoriesZh } from './emotions'
export { emotionCategories as emotionCategoriesEn } from './emotions-en'
export { challengeQuestions as challengeQuestionsZh } from './questions'
export { challengeQuestions as challengeQuestionsEn } from './questions-en'