import type { Question } from '@/types'

export interface ChallengeState {
  /**
   * Index of the current question in the questions array.
   */
  index: number
  /**
   * Raw answers chosen by the user, in order.
   */
  answers: string[]
  /**
   * Generated answer text for the current question, using Question.answerTemplate.
   */
  currentAnswerText: string
  /**
   * Whether the generated answer text is currently visible.
   */
  isAnswerVisible: boolean
}

export function createInitialChallengeState(): ChallengeState {
  return {
    index: 0,
    answers: [],
    currentAnswerText: '',
    isAnswerVisible: false,
  }
}

export function getCurrentQuestion(questions: Question[], state: ChallengeState): Question {
  return questions[state.index]
}

export interface SubmitAnswerResult {
  /**
   * Updated state after recording the user's answer.
   */
  state: ChallengeState
  /**
   * Whether there are more questions after the current one.
   */
  hasMore: boolean
}

/**
 * Record the user's answer for the current question and generate the display text.
 * This does NOT advance to the next question yet, so you can show the answer first
 * and then call `goToNextQuestion` after a delay.
 */
export function submitAnswer(
  state: ChallengeState,
  questions: Question[],
  answer: string,
): SubmitAnswerResult {
  const currentQuestion = getCurrentQuestion(questions, state)
  const updatedAnswers = [...state.answers, answer]

  const answerText = currentQuestion.answerTemplate(answer)
  const isLastQuestion = state.index >= questions.length - 1

  return {
    state: {
      ...state,
      answers: updatedAnswers,
      currentAnswerText: answerText,
      isAnswerVisible: true,
    },
    hasMore: !isLastQuestion,
  }
}

export interface AdvanceResult {
  /**
   * Updated state after attempting to advance.
   */
  state: ChallengeState
  /**
   * True if we have reached the end of the questions.
   */
  done: boolean
}

/**
 * Move to the next question if available.
 * If already at the last question, returns `done: true` without changing the index.
 * This also resets the visibility of the answer text.
 */
export function goToNextQuestion(
  state: ChallengeState,
  questions: Question[],
): AdvanceResult {
  const isLastQuestion = state.index >= questions.length - 1

  if (isLastQuestion) {
    return {
      state,
      done: true,
    }
  }

  return {
    state: {
      ...state,
      index: state.index + 1,
      isAnswerVisible: false,
      currentAnswerText: '',
    },
    done: false,
  }
}

/**
 * Explicitly hide the current answer text without changing the question index.
 */
export function hideAnswer(state: ChallengeState): ChallengeState {
  return {
    ...state,
    isAnswerVisible: false,
    currentAnswerText: '',
  }
}


