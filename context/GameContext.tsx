import React, { createContext, useReducer, useContext, useEffect, useRef, FC, PropsWithChildren } from 'react';
import { GameState, Question, Vibe, Action, QuestionType, AIPersonality } from '../types';
import { fetchQuizQuestions, fetchFunnyFeedback } from '../services/geminiService';
import { demoQuestions } from '../services/demoData';
import { playSound } from '../services/audioPlayer';
import { triggerHaptic, HapticPattern } from '../services/haptic';
import { useAuth } from './AuthContext';

type Theme = 'light' | 'dark';

export const QUESTION_TIME_LIMIT = 45; // in seconds
const ANSWER_TIMED_OUT = '__TIMES_UP__';

interface GameStateShape {
  gameState: GameState;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: string[];
  error: string | null;
  vibe: Vibe | null;
  feedback: string | null;
  isProcessingAnswer: boolean;
  time: number;
  theme: Theme;
  isDemoMode: boolean;
  isMuted: boolean;
  isHapticEnabled: boolean;
  isPro: boolean;
  aiPersonality: AIPersonality;
}

const getInitialState = (): Omit<GameStateShape, 'theme' | 'isMuted' | 'isHapticEnabled' | 'isPro' | 'aiPersonality'> => ({
  gameState: GameState.Idle,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  error: null,
  vibe: null,
  feedback: null,
  isProcessingAnswer: false,
  time: QUESTION_TIME_LIMIT,
  isDemoMode: false,
});

const initialState: GameStateShape = {
    ...getInitialState(),
    theme: 'dark',
    isMuted: true,
    isHapticEnabled: true,
    isPro: false, // Default to false, will be upgraded on login
    aiPersonality: AIPersonality.BobMarley,
};

// Define private action types for setting initial state values.
type PrivateAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_SOUND'; payload: boolean }
  | { type: 'SET_HAPTIC'; payload: boolean };

const GameContext = createContext<{ state: GameStateShape; dispatch: React.Dispatch<Action | PrivateAction> } | undefined>(undefined);

const gameReducer = (state: GameStateShape, action: Action | PrivateAction): GameStateShape => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, ...getInitialState(), gameState: GameState.Loading, vibe: action.payload.vibe, aiPersonality: action.payload.aiPersonality, isDemoMode: false, isPro: state.isPro };
    case 'START_DEMO':
      return { ...state, ...getInitialState(), gameState: GameState.Loading, isDemoMode: true };
    case 'START_DEMO_TOUR':
      return { ...state, gameState: GameState.DemoTour };
    case 'GAME_LOAD_SUCCESS':
      return { ...state, gameState: GameState.Playing, questions: action.payload, time: QUESTION_TIME_LIMIT };
    case 'GAME_LOAD_FAILURE':
      return { ...state, gameState: GameState.Error, error: action.payload };
    case 'ANSWER_QUESTION':
      // Prevent answering if already answered
      if (state.userAnswers.length > state.currentQuestionIndex) return state;
      return { ...state, userAnswers: [...state.userAnswers, action.payload] };
    case 'PROCESS_ANSWER_START':
      return { ...state, isProcessingAnswer: true };
    case 'PROCESS_ANSWER_END':
      return { ...state, isProcessingAnswer: false };
    case 'SHOW_FEEDBACK':
      return { ...state, feedback: action.payload };
    case 'HIDE_FEEDBACK':
      return { ...state, feedback: null };
    case 'NEXT_QUESTION':
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, time: QUESTION_TIME_LIMIT };
      }
      return state; // No change if it's the last question
    case 'FINISH_GAME':
      return { ...state, gameState: GameState.Finished };
    case 'RESTART_GAME':
      return { ...state, ...getInitialState(), isPro: state.isPro, aiPersonality: state.aiPersonality }; // Keep pro status and personality on restart
    case 'LOGOUT':
      return { ...state, ...getInitialState(), isPro: false, aiPersonality: AIPersonality.BobMarley };
    case 'CONTINUE_TO_NEXT_VIBE':
        return { ...state, ...getInitialState(), gameState: GameState.Loading, vibe: action.payload.vibe, aiPersonality: action.payload.aiPersonality, isDemoMode: false, isPro: state.isPro };
    case 'TICK_TIMER':
        return { ...state, time: Math.max(0, state.time - 1) };
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { ...state, theme: newTheme };
    }
    case 'TOGGLE_SOUND': {
      const newMutedState = !state.isMuted;
      localStorage.setItem('soundMuted', JSON.stringify(newMutedState));
      return { ...state, isMuted: newMutedState };
    }
    case 'TOGGLE_HAPTIC': {
        const newHapticState = !state.isHapticEnabled;
        localStorage.setItem('hapticEnabled', JSON.stringify(newHapticState));
        return { ...state, isHapticEnabled: newHapticState };
    }
    case 'SET_AI_PERSONALITY':
        return { ...state, aiPersonality: action.payload };
    case 'UPGRADE_TO_PRO': {
        return { ...state, isPro: true };
    }
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_SOUND':
      return { ...state, isMuted: action.payload };
    case 'SET_HAPTIC':
        return { ...state, isHapticEnabled: action.payload };
    default:
      return state;
  }
};

export const GameProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { user } = useAuth();
  const timerRef = useRef<number | null>(null);
  
  // Effect for setting initial theme, sound, and haptic state from localStorage
  useEffect(() => {
    // Theme
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    // Default to dark mode if no theme is set in localStorage.
    const initialTheme = storedTheme || 'dark';

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    dispatch({ type: 'SET_THEME', payload: initialTheme });

    // Sound (default to not muted)
    const storedMuted = localStorage.getItem('soundMuted');
    const initialMuted = storedMuted ? JSON.parse(storedMuted) : false;
    dispatch({ type: 'SET_SOUND', payload: initialMuted });

    // Haptic (default to enabled)
    const storedHaptic = localStorage.getItem('hapticEnabled');
    const initialHaptic = storedHaptic ? JSON.parse(storedHaptic) : true;
    dispatch({ type: 'SET_HAPTIC', payload: initialHaptic });
  }, []);


  // Effect for fetching questions when game starts
  useEffect(() => {
    if (state.gameState === GameState.Loading) {
      if (state.isDemoMode) {
        setTimeout(() => {
          const shuffled = [...demoQuestions].sort(() => 0.5 - Math.random());
          dispatch({ type: 'GAME_LOAD_SUCCESS', payload: shuffled.slice(0, 5) });
        }, 800);
      } else if (state.vibe) {
        const token = user?.token?.access_token;
        fetchQuizQuestions(state.vibe, state.aiPersonality, token)
          .then(questions => dispatch({ type: 'GAME_LOAD_SUCCESS', payload: questions }))
          .catch(err => {
            console.error(err);
            const message = err instanceof Error ? err.message : 'An unknown cosmic anomaly occurred.';
            dispatch({ type: 'GAME_LOAD_FAILURE', payload: message });
          });
      }
    }
  }, [state.gameState, state.vibe, state.isDemoMode, state.aiPersonality, user]);
  
  // Effect for managing the game timer (countdown)
  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (state.gameState === GameState.Playing) {
      const hasAnswered = state.userAnswers.length > state.currentQuestionIndex;
      if (state.time > 0 && !hasAnswered) {
        timerRef.current = window.setTimeout(() => {
          dispatch({ type: 'TICK_TIMER' });
        }, 1000);
      } else if (state.time === 0 && !hasAnswered) {
        dispatch({ type: 'ANSWER_QUESTION', payload: ANSWER_TIMED_OUT });
      }
    } else {
      clearTimer();
    }
    
    return clearTimer;
  }, [state.gameState, state.time, state.currentQuestionIndex, state.userAnswers.length]);
  
  // Effect for processing answers
  useEffect(() => {
    // This effect runs only when a new answer has been submitted.
    if (state.userAnswers.length === state.currentQuestionIndex + 1 && state.gameState === GameState.Playing) {
      const processAnswer = async () => {
        dispatch({ type: 'PROCESS_ANSWER_START' });

        const currentQuestion = state.questions[state.currentQuestionIndex];
        const userAnswer = state.userAnswers[state.currentQuestionIndex];
        const isTimedOut = userAnswer === ANSWER_TIMED_OUT;
        const isCorrect = !isTimedOut && userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();
        
        let feedbackToShow: string | null = null;
        let hapticPattern: HapticPattern | null = null;
        let delay = 500;

        if(isTimedOut) {
            feedbackToShow = "Time's Up!";
            hapticPattern = 'time_up';
            if (!state.isMuted) playSound('incorrect');
        } else {
            hapticPattern = isCorrect ? 'correct' : 'incorrect';
            if (!state.isMuted) playSound(isCorrect ? 'correct' : 'incorrect');

            const isTextEntry = currentQuestion.type === QuestionType.ShortAnswer || currentQuestion.type === QuestionType.ImageQuestion;
            if (state.isDemoMode && isTextEntry && currentQuestion.demoFeedback?.length) {
                const feedbackOptions = currentQuestion.demoFeedback;
                feedbackToShow = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
            } else if (!state.isDemoMode && isTextEntry && Math.random() < 0.4) {
                try {
                    const token = user?.token?.access_token;
                    feedbackToShow = await fetchFunnyFeedback(currentQuestion.question, userAnswer, state.aiPersonality, token);
                } catch (error) {
                    console.error("Failed to get feedback, proceeding without it.", error);
                }
            }
        }
        
        if (state.isHapticEnabled && hapticPattern) {
            triggerHaptic(hapticPattern);
        }

        if (feedbackToShow) {
            dispatch({ type: 'SHOW_FEEDBACK', payload: feedbackToShow });
            delay = 4000;
        }

        setTimeout(() => {
          dispatch({ type: 'HIDE_FEEDBACK' });
          if (state.currentQuestionIndex < state.questions.length - 1) {
            if (!state.isMuted) playSound('next');
            dispatch({ type: 'NEXT_QUESTION' });
          } else {
            if (!state.isMuted) playSound('finish');
            dispatch({ type: 'FINISH_GAME' });
          }
          dispatch({ type: 'PROCESS_ANSWER_END' });
        }, delay);
      };
      
      processAnswer();
    }
  }, [state.userAnswers.length, state.currentQuestionIndex, state.questions, state.gameState, state.isDemoMode, state.isMuted, state.isHapticEnabled, state.aiPersonality, dispatch, user]);


  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};