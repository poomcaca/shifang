export type Scene = 'input' | 'challenge' | 'review' | 'end'

export interface FlowState {
  /**
   * Current screen of the experience.
   */
  scene: Scene
  /**
   * User's currently selected emotion text.
   */
  selectedEmotion: string
}

export function createInitialFlowState(): FlowState {
  return {
    scene: 'input',
    selectedEmotion: '',
  }
}

export function selectEmotion(state: FlowState, emotion: string): FlowState {
  return {
    ...state,
    selectedEmotion: emotion,
    scene: 'challenge',
  }
}

export function completeChallenge(state: FlowState): FlowState {
  return {
    ...state,
    scene: 'review',
  }
}

export function retryChallenge(state: FlowState): FlowState {
  return {
    ...state,
    scene: 'challenge',
  }
}

export function restartFlow(): FlowState {
  return createInitialFlowState()
}

export function exitToInput(state: FlowState): FlowState {
  return {
    ...state,
    selectedEmotion: '',
    scene: 'input',
  }
}


