import { Question } from '@/types'

export const challengeQuestions: Question[] = [
    {
        text: 'Could you let it be here?',
        options: ['Yes', 'No', 'Unsure'],
        answerTemplate: (answer: string) => `I ${answer.toLowerCase() === 'yes' ? 'can let it be here' : answer.toLowerCase() === 'no' ? 'can not let it be here' : 'am unsure if I could let it be here'}`,
        guidance: 'Feel it fully, without resistance or judgment.'
    },
    {
        text: 'Could you let it go?',
        options: ['Yes', 'No', 'Unsure'],
        answerTemplate: (answer: string) => `I ${answer.toLowerCase() === 'yes' ? 'can let it go' : answer.toLowerCase() === 'no' ? 'can not let it go' : 'am unsure if I could let it go'}`,
        guidance: 'Don\'t think or worry. Whatever you answer, you will eventually release.'
    },
    {
        text: 'Would you let it go?',
        options: ['Yes', 'No', 'Unsure'],
        answerTemplate: (answer: string) => `I ${answer.toLowerCase() === 'yes' ? 'will let it go' : answer.toLowerCase() === 'no' ? 'will not let it go' : 'am unsure if I would'}`,
        guidance: 'Follow your first instinct, keep breathing.'
    },
    {
        text: 'When?',
        options: ['Now', 'Unsure', 'Later'],
        answerTemplate: (answer: string) => answer === 'Now' ? 'I let it go now' : answer === 'Later' ? 'I will let it go later' : 'I\'m unsure when',
        guidance: 'You can choose to let go at any time.'
    }
]