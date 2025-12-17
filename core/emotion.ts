export interface EmotionSelectionState {
  text: string
  selected: string[]
  /**
   * Separator used to join multiple emotions in the text,
   * e.g. '，' for zh or ', ' for en.
   */
  separator: string
}

export function createEmotionSelectionState(separator: string): EmotionSelectionState {
  return {
    text: '',
    selected: [],
    separator,
  }
}

function normalizeEmotion(value: string): string {
  return value.trim()
}

function splitEmotions(text: string, separator: string): string[] {
  const trimmed = text.trim()
  if (!trimmed) return []

  return trimmed
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function addEmotion(state: EmotionSelectionState, emotion: string): EmotionSelectionState {
  const normalized = normalizeEmotion(emotion)
  if (!normalized) return state

  const currentList = splitEmotions(state.text, state.separator)

  if (currentList.includes(normalized)) {
    // Already present: ensure it's in the selected list, keep text as is
    const selected = state.selected.includes(normalized)
      ? state.selected
      : [...state.selected, normalized]

    return {
      ...state,
      selected,
    }
  }

  const baseText = state.text.trim()
  const nextText = baseText
    ? `${baseText}${state.separator}${normalized}`
    : normalized

  const selected = state.selected.includes(normalized)
    ? state.selected
    : [...state.selected, normalized]

  return {
    ...state,
    text: nextText,
    selected,
  }
}

export function removeEmotion(state: EmotionSelectionState, emotionToRemove: string): EmotionSelectionState {
  const normalized = normalizeEmotion(emotionToRemove)

  const remaining = splitEmotions(state.text, state.separator).filter(
    (item) => item !== normalized,
  )

  return {
    ...state,
    text: remaining.join(state.separator),
    selected: state.selected.filter((item) => item !== normalized),
  }
}


