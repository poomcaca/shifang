import { Question } from '@/types'

export const challengeQuestions: Question[] = [
  {
    text: '你允许这个感受存在吗？',
    options: ['允许', '不允许', '不确定'],
    answerTemplate: (answer: string) => `我${answer}这个感受存在`,
    guidance: '请全身心地感受它，不抗拒，不评判。'
  },
  {
    text: '你能让它离开吗？',
    options: ['能', '不能', '不确定'],
    answerTemplate: (answer: string) => `我${answer}让它离开`,
    guidance: '不需要思考和顾虑，无论回答什么，最终都会释放。'
  },
  {
    text: '你愿意让它离开吗？',
    options: ['愿意', '不愿意', '不确定'],
    answerTemplate: (answer: string) => `我${answer}让它离开`,
    guidance: '遵循内心第一反应，保持呼吸。'
  },
  {
    text: '什么时候？',
    options: ['现在', '不确定', "以后"],
    answerTemplate: (answer: string) => answer === '现在' ? '我现在就让它离开' : answer === '以后' ? '我以后让它离开' : '我不确定什么时候',
    guidance: '你任何时候都可以决定放手。'
  }
] 