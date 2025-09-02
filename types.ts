export enum QuestionType {
  MultipleChoice = "MULTIPLE_CHOICE",
  ShortAnswer = "SHORT_ANSWER",
  ImageQuestion = "IMAGE_QUESTION",
}

export interface Question {
  type: QuestionType;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  imageUrl?: string;
  imagePrompt?: string; // For internal use in generation
  demoFeedback?: string[]; // For simulating AI feedback in demo mode
}

export enum GameState {
  Idle = "idle",
  Loading = "loading",
  Playing = "playing",
  Finished = "finished",
  Error = "error",
}

export enum Vibe {
  Buzzed = "BUZZED",
  Toasted = "TOASTED",
  Voyager = "VOYAGER",
}

// Action types for the reducer
export type Action =
  | { type: 'START_GAME'; payload: Vibe }
  | { type: 'START_DEMO' }
  | { type: 'GAME_LOAD_SUCCESS'; payload: Question[] }
  | { type: 'GAME_LOAD_FAILURE'; payload: string }
  | { type: 'ANSWER_QUESTION'; payload: string }
  | { type: 'PROCESS_ANSWER_START' }
  | { type: 'PROCESS_ANSWER_END' }
  | { type: 'SHOW_FEEDBACK'; payload: string }
  | { type: 'HIDE_FEEDBACK' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_GAME' }
  | { type: 'RESTART_GAME' }
  | { type: 'CONTINUE_TO_NEXT_VIBE'; payload: Vibe }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TICK_TIMER' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_HAPTIC' }
  | { type: 'UPGRADE_TO_PRO' };