import React from 'react';
import { useGame } from '../context/GameContext';

const LostAstronautIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mb-6 text-yellow-500 dark:text-[#F6FA70] animate-pulse-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Helmet */}
        <circle cx="12" cy="12" r="8" />
        {/* Visor reflection */}
        <path d="M9.09 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
        {/* Floating away */}
        <path d="M18 19l2 2" />
        <path d="M4 5l2 2" />
        <path d="M20 5l-2 2" />
        <path d="M6 19l-2 2" />
    </svg>
);


interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const { dispatch } = useGame();
  
  const handleRetry = () => {
    dispatch({ type: 'RESTART_GAME' });
  };
  
  return (
    <div className="w-full max-w-lg text-center flex flex-col items-center justify-center p-4 sm:p-6 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-500/30 dark:border-[#FF0060]/50 animate-card-fade-in-up">
      <LostAstronautIcon />
      <h2 className="text-3xl font-bold text-pink-600 dark:text-[#FF0060] mb-3">Houston, We Have a Glitch</h2>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-md">
        A cosmic ray seems to have interfered with our transmission. Here's the technical debrief:
      </p>
      <pre className="w-full bg-gray-100 dark:bg-neutral-900/50 p-3 rounded-lg text-left text-sm text-pink-700 dark:text-pink-300 mb-8 overflow-x-auto">
        <code>{error}</code>
      </pre>
      <button
        onClick={handleRetry}
        className="bg-[#0079FF] hover:bg-[#005cbf] text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
      >
        Return to Home Base
      </button>
    </div>
  );
};

export default ErrorDisplay;