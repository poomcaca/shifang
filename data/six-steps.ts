export interface SixStep {
  id: number
  content: string
  contentEn: string
  subContent?: string
  subContentEn?: string
}

// Core data for the "Six Steps to Freedom" process.
// This file is designed to be easily copied to other runtimes (e.g. WeChat Mini Program).
export const sixSteps: SixStep[] = [
  {
    id: 1,
    content: '你必须想要自由超过想要世界。',
    subContent: '（你必须想要自由超过想要认同和控制，认同和控制=世界）',
    contentEn: 'You must want freedom more than you want the world.',
    subContentEn: '(You must want freedom more than wanting approval and control. Approval and control = the world)',
  },
  {
    id: 2,
    content: '做出自由的决定。',
    contentEn: 'Make the decision to go free.',
  },
  {
    id: 3,
    content: '所有感受都来自想要控制和想要被认同，它们都是生存程序。释放它们。',
    contentEn: 'All feelings culminate in two wants: wanting approval and wanting control. They are survival programs. Release them.',
  },
  {
    id: 4,
    content: '持续释放。',
    contentEn: 'Make release constant.',
  },
  {
    id: 5,
    content: '当你卡住时，释放那个对于卡住的感觉的想要改变。',
    contentEn: 'If you get stuck, let go of the wanting to change the stuckness.',
  },
  {
    id: 6,
    content: '每次你释放，你都更愉悦、轻松、脱离限制，随着释放，你会越来越愉悦、轻松、脱离限制。',
    contentEn: 'Each time you release, you are happier and lighter. You have more motivation to go free.',
  },
]


