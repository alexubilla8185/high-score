

import React, { createContext, useReducer, useContext, useEffect, useRef, FC, PropsWithChildren } from 'react';
import { GameState, Question, Vibe, Action, QuestionType } from '../types';
import { fetchQuizQuestions, fetchFunnyFeedback } from '../services/geminiService';
import { demoQuestions } from '../services/demoData';

type Theme = 'light' | 'dark';

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
}

const initialState: GameStateShape = {
  gameState: GameState.Idle,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  error: null,
  vibe: null,
  feedback: null,
  isProcessingAnswer: false,
  time: 0,
  theme: 'dark', // Default, will be updated by effect
  isDemoMode: false,
};

// Define a new action type specifically for setting the initial theme.
type SetThemeAction = { type: 'SET_THEME'; payload: Theme };

const GameContext = createContext<{ state: GameStateShape; dispatch: React.Dispatch<Action | SetThemeAction> } | undefined>(undefined);

const gameReducer = (state: GameStateShape, action: Action | SetThemeAction): GameStateShape => {
  switch (action.type) {
    case 'START_GAME':
      return { ...initialState, theme: state.theme, gameState: GameState.Loading, vibe: action.payload, isDemoMode: false };
    case 'START_DEMO':
      return { ...initialState, theme: state.theme, gameState: GameState.Loading, isDemoMode: true };
    case 'GAME_LOAD_SUCCESS':
      return { ...state, gameState: GameState.Playing, questions: action.payload };
    case 'GAME_LOAD_FAILURE':
      return { ...state, gameState: GameState.Error, error: action.payload };
    case 'ANSWER_QUESTION':
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
        return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
      return state; // No change if it's the last question
    case 'FINISH_GAME':
      return { ...state, gameState: GameState.Finished };
    case 'RESTART_GAME':
      return { ...initialState, theme: state.theme };
    case 'CONTINUE_TO_NEXT_VIBE':
        return { ...initialState, theme: state.theme, gameState: GameState.Loading, vibe: action.payload, isDemoMode: false };
    case 'TICK_TIMER':
        return { ...state, time: state.time + 1 };
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
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const GameProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const timerRef = useRef<number | null>(null);
  
  // Refactored effect for setting initial theme
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Set the theme in state without causing a re-toggle
    dispatch({ type: 'SET_THEME', payload: initialTheme });
  }, []); // Run only once on mount


  // Effect for fetching questions when game starts
  useEffect(() => {
    if (state.gameState === GameState.Loading) {
      if (state.isDemoMode) {
        // In demo mode, shuffle static questions and pick 5 for a quick, variable game.
        setTimeout(() => {
          const shuffled = [...demoQuestions].sort(() => 0.5 - Math.random());
          dispatch({ type: 'GAME_LOAD_SUCCESS', payload: shuffled.slice(0, 5) });
        }, 800);
      } else if (state.vibe) {
        // In a real game, fetch from the API
        fetchQuizQuestions(state.vibe)
          .then(questions => {
            dispatch({ type: 'GAME_LOAD_SUCCESS', payload: questions });
          })
          .catch(err => {
            console.error(err);
            const message = err instanceof Error ? err.message : 'An unknown cosmic anomaly occurred.';
            dispatch({ type: 'GAME_LOAD_FAILURE', payload: message });
          });
      }
    }
  }, [state.gameState, state.vibe, state.isDemoMode]);
  
  // Effect for managing the game timer
  useEffect(() => {
    if (state.gameState === GameState.Playing) {
      timerRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.gameState]);
  
  // Effect for processing answers
  useEffect(() => {
    if (state.userAnswers.length === state.currentQuestionIndex + 1 && state.gameState === GameState.Playing) {
      const processAnswer = async () => {
        dispatch({ type: 'PROCESS_ANSWER_START' });

        const currentQuestion = state.questions[state.currentQuestionIndex];
        const userAnswer = state.userAnswers[state.currentQuestionIndex];
        
        let feedbackToShow: string | null = null;
        let delay = 500;

        if (state.isDemoMode && currentQuestion.demoFeedback) {
            // In demo mode, use pre-written feedback
            feedbackToShow = currentQuestion.demoFeedback;
        } else if (!state.isDemoMode && currentQuestion.type === QuestionType.ShortAnswer && Math.random() < 0.4) {
            // In a real game, try fetching live feedback
            try {
                feedbackToShow = await fetchFunnyFeedback(currentQuestion.question, userAnswer);
            } catch (error) {
                console.error("Failed to get feedback, proceeding without it.", error);
            }
        }

        if (feedbackToShow) {
            dispatch({ type: 'SHOW_FEEDBACK', payload: feedbackToShow });
            delay = 4000; // Give user time to read feedback
        }

        setTimeout(() => {
          dispatch({ type: 'HIDE_FEEDBACK' });
          if (state.currentQuestionIndex < state.questions.length - 1) {
            dispatch({ type: 'NEXT_QUESTION' });
          } else {
            dispatch({ type: 'FINISH_GAME' });
          }
          dispatch({ type: 'PROCESS_ANSWER_END' });
        }, delay);
      };
      
      processAnswer();
    }
  }, [state.userAnswers, state.currentQuestionIndex, state.questions, state.gameState, state.isDemoMode]);

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