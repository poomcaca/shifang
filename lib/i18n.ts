export type Locale = 'zh' | 'en'

// 翻译文本
export const translations = {
  zh: {
    // SEO 相关
    'seo.title': 'Sedona Method 释放法 - 情感释放练习工具 | SedonaRelease.online',
    'seo.description': 'Sedona Method 释放法在线练习工具，通过简单的问题引导释放负面情绪，获得内心平静。免费使用，支持中英文。',
    'seo.keywords': 'Sedona Method, 释放法, 情感释放, 冥想, 心理健康, 情绪管理, 内观, 正念',
    'seo.h1': 'Sedona Method 情感释放练习',
    'seo.intro': 'Sedona Method 是一种简单而有效的情感释放技巧，帮助你放下负面情绪，获得内心的平静与自由。',
    'seo.howItWorks': '如何使用',
    'seo.step1': '选择或描述你当前的感受',
    'seo.step2': '跟随引导问题进行内观',
    'seo.step3': '诚实回答每个问题',
    'seo.step4': '体验情感的自然释放',
    'seo.emotionCategories': '情感分类',
    'seo.benefits': '练习益处',
    'seo.benefit1': '减少压力和焦虑',
    'seo.benefit2': '提升情绪稳定性',
    'seo.benefit3': '增强内心平静感',
    
    // 主要界面
    'emotion.title': '此刻，你的感受是什么？',
    'emotion.placeholder': '请描述你的感受...',
    'emotion.start': '开始感受',
    
    // 快捷选项
    'quick.safety': '想要安全',
    'quick.recognition': '想要被认同',
    'quick.control': '想要控制',
    
    // 情感分类
    'category.despair': '万念俱灰',
    'category.grief': '悲苦',
    'category.fear': '恐惧',
    'category.desire': '贪求',
    
    // 挑战场景
    'challenge.myFeeling': '我的感受:',
    'challenge.exit': '退出',
    
    // 问题选项
    'option.allow': '允许',
    'option.notAllow': '不允许',
    'option.uncertain': '不确定',
    'option.can': '能',
    'option.cannot': '不能',
    'option.willing': '愿意',
    'option.notWilling': '不愿意',
    'option.now': '现在',
    'option.later': '以后',
    
    // 回顾场景
    'review.title': '感觉如何？',
    'review.retry': '再次释放',
    'review.complete': '更加自由了',
    
    // 结束场景
    'end.title': '恭喜！完成了一次释放。',
    'end.restart': '开始新的释放',
    
    // 通用
    'common.retry': '重试',
    'common.complete': '完成',
    'common.restart': '重新开始',
    'common.exit': '退出',
    'common.back': '返回',
    
    // 自由六步
    'sixSteps.title': '自由六步',
    'sixSteps.subtitle': '点击每一步，开始你的释放旅程',
    'sixSteps.link': '自由六步骤',
    'sixSteps.clickToProgress': '点击卡片推进',
    'sixSteps.complete': '释放完成 ✨'
  },
  en: {
    // SEO 相关
    'seo.title': 'Sedona Method Questions & Emotional Release Tool | SedonaRelease.online',
    'seo.description': 'Practice the Sedona Method online with guided questions for emotional release. Simple, effective technique for letting go of negative emotions and finding inner peace.',
    'seo.keywords': 'Sedona Method, emotional release, letting go, meditation, mental health, emotional wellness, mindfulness, inner peace',
    'seo.h1': 'Sedona Method Emotional Release Practice',
    'seo.intro': 'The Sedona Method is a simple yet powerful technique for releasing unwanted emotions and finding inner peace and freedom.',
    'seo.howItWorks': 'How It Works',
    'seo.step1': 'Choose or describe your current feeling',
    'seo.step2': 'Follow the guided inquiry questions',
    'seo.step3': 'Answer each question honestly',
    'seo.step4': 'Experience natural emotional release',
    'seo.emotionCategories': 'Emotion Categories',
    'seo.benefits': 'Benefits of Practice',
    'seo.benefit1': 'Reduce stress and anxiety',
    'seo.benefit2': 'Improve emotional stability',
    'seo.benefit3': 'Enhance inner peace',
    
    // 主要界面
    'emotion.title': 'How are you feeling right now?',
    'emotion.placeholder': 'Describe your feelings...',
    'emotion.start': 'Begin Journey',
    
    // 快捷选项
    'quick.safety': 'Want Safe',
    'quick.recognition': 'Want Approval',
    'quick.control': 'Want Control',
    
    // 情感分类
    'category.despair': 'Despair & Emptiness',
    'category.grief': 'Grief & Sorrow',
    'category.fear': 'Fear & Anxiety',
    'category.desire': 'Desire & Craving',
    
    // 挑战场景
    'challenge.myFeeling': 'My feeling:',
    'challenge.exit': 'Exit',
    
    // 问题选项
    'option.allow': 'Yes',
    'option.notAllow': 'No',
    'option.uncertain': 'Unsure',
    'option.can': 'Yes',
    'option.cannot': 'No',
    'option.willing': 'Yes',
    'option.notWilling': 'No',
    'option.now': 'Now',
    'option.later': 'Later',
    
    // 回顾场景
    'review.title': 'How do you feel?',
    'review.retry': 'Release Again',
    'review.complete': 'I Feel Freer',
    
    // 结束场景
    'end.title': 'Congratulations! You completed a release.',
    'end.restart': 'Start New Release',
    
    // 通用
    'common.retry': 'Try Again',
    'common.complete': 'Complete',
    'common.restart': 'Start Over',
    'common.exit': 'Exit',
    'common.back': 'Back',
    
    // 自由六步
    'sixSteps.title': 'Six Steps to Freedom',
    'sixSteps.subtitle': 'Click each step to begin your release journey',
    'sixSteps.link': 'Learn the Six Steps',
    'sixSteps.clickToProgress': 'Click cards to progress',
    'sixSteps.complete': 'Release Complete ✨'
  }
} as const

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale][key as keyof typeof translations[typeof locale]] || key
}