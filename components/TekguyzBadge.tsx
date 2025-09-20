

import React from 'react';

const LogomarkIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      <title>TEKGUYZ Logomark</title>
      <circle cx="16" cy="16" r="15" fill="none" strokeWidth="2" stroke="currentColor" />
      <path d="M 13 10 L 9 13 L 13 16" strokeWidth="2.5" fill="none" stroke="currentColor" />
      <path d="M 19 10 L 23 13 L 19 16" strokeWidth="2.5" fill="none" stroke="currentColor" />
      <path d="M 10 21 Q 16 26 22 21" strokeWidth="2.5" fill="none" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  );
};

interface TekguyzBadgeProps {
  theme: 'dark' | 'light';
  onIconClick: () => void;
}

const TekguyzBadge: React.FC<TekguyzBadgeProps> = ({ theme = 'dark', onIconClick }) => {
  const themeClasses = {
    dark: 'bg-black text-gray-400',
    light: 'bg-white text-gray-500'
  };
  
  const hoverClasses = {
    dark: 'hover:text-white',
    light: 'hover:text-black'
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center px-3 py-1.5 rounded-lg shadow-lg transition-colors duration-300 text-xs font-semibold z-50 ${themeClasses[theme]}`}
    >
      <button
        onClick={onIconClick}
        aria-label="Show app specifications"
        className={`p-1 -ml-1 mr-1.5 rounded-full transition-colors duration-300 ${hoverClasses[theme]} focus:outline-none focus-visible:ring-2 focus-visible:ring-current`}
      >
        <LogomarkIcon className="w-4 h-4" />
      </button>
      <a
        href="https://tekguyz.com?ref=made-by-tekguyz"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${hoverClasses[theme]} focus:outline-none focus-visible:underline`}
      >
        <span>Made by <strong>TEKGUYZ</strong></span>
      </a>
    </div>
  );
};

export default TekguyzBadge;