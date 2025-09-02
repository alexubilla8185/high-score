import React from 'react';
import { useGame } from '../context/GameContext';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
  </svg>
);

interface ThemeToggleProps {
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle }) => {
  const { state } = useGame();

  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
      className="w-12 h-12 bg-gray-200 dark:bg-neutral-800/80 rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg hover:scale-110 transition-all transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
    >
      {state.theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;