

import React from 'react';
import { Vibe } from '../types';
import { useGame } from '../context/GameContext';
import Logo from './Logo';
import AIPersonalitySelector from './AIPersonalitySelector';

const BobMarleyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-teal-500 dark:text-[#00DFA2] group-hover:animate-pulse">
        <path d="M17.8285 6.17174C17.8285 6.17174 15.6067 10.8286 12.0001 10.8286C8.39347 10.8286 6.17163 6.17174 6.17163 6.17174C6.17163 6.17174 10.8285 8.39357 10.8285 12.0002C10.8285 15.6068 6.17163 17.8286 6.17163 17.8286C6.17163 17.8286 8.39347 13.1717 12.0001 13.1717C15.6067 13.1717 17.8285 17.8286 17.8285 17.8286C17.8285 17.8286 13.1716 15.6068 13.1716 12.0002C13.1716 8.39357 17.8285 6.17174 17.8285 6.17174Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const WillieNelsonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-yellow-500 dark:text-[#F6FA70] transform group-hover:-rotate-6 transition-transform">
    <path d="M5 12C5 9.23858 7.23858 7 10 7H14C16.7614 7 19 9.23858 19 12V14H5V12Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M19 14L17.3137 17.3726C16.9248 18.1504 16.1111 18.6667 15.2229 18.6667H8.77715C7.88891 18.6667 7.07521 18.1504 6.68633 17.3726L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const SnoopDoggIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-500 dark:text-[#0079FF] group-hover:translate-y-[-2px] transition-transform">
        <path d="M5 12H9C9.55228 12 10 12.4477 10 13V15H4V13C4 12.4477 4.44772 12 5 12Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 12H19C19.5523 12 20 12.4477 20 13V15H14V13C14 12.4477 14.4477 12 15 12Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 13.5H14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 12L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 12L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const vibes = [
    { 
        vibe: Vibe.Buzzed,
        icon: <BobMarleyIcon />, 
        title: 'Buzzed', 
        subtitle: 'For a Light Toke',
        description: "Chill questions for when you're just starting to feel it. Easy laughs, no heavy thinking.",
        hoverClasses: 'hover:scale-[1.02]',
    },
    { 
        vibe: Vibe.Toasted, 
        icon: <WillieNelsonIcon />, 
        title: 'Toasted', 
        subtitle: 'Perfectly Baked',
        description: 'The sweet spot. A mix of trippy riddles and weird scenarios for the seasoned stoner.',
        hoverClasses: 'hover:scale-[1.02] hover:-rotate-1',
    },
    { 
        vibe: Vibe.Voyager, 
        icon: <SnoopDoggIcon />, 
        title: 'Voyager', 
        subtitle: 'Interstellar Flight',
        description: "Buckle up, space cadet. These questions will bend reality and maybe your brain a little.",
        hoverClasses: 'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-[#0079FF]/30',
    },
];

const StartScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    
    const handleStartGame = (vibe: Vibe) => {
        dispatch({ type: 'START_GAME', payload: { vibe, aiPersonality: state.aiPersonality } });
    };
    
    return (
        <div className="w-full max-w-2xl text-center flex flex-col items-center justify-center animate-card-fade-in-up">
            <Logo />
            <h1 className="sr-only">Higher Please</h1>
            <div className="w-full max-w-lg flex flex-col items-center">
                <div className="mb-8 w-full">
                    <AIPersonalitySelector />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-teal-600 dark:text-[#00DFA2]">Now, Set Your Altitude</h2>
                <div className="w-full space-y-4">
                {vibes.map((v, index) => (
                    <button
                        key={v.vibe}
                        onClick={() => handleStartGame(v.vibe)}
                        className={`w-full p-5 bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-200 dark:border-neutral-800 rounded-xl text-left flex items-center space-x-5 hover:bg-gray-100/70 dark:hover:bg-neutral-800/70 hover:border-[#0079FF] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] ${v.hoverClasses}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex-shrink-0">{v.icon}</div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{v.title} <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">- {v.subtitle}</span></h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300">{v.description}</p>
                        </div>
                    </button>
                ))}
                </div>
            </div>
        </div>
    );
};

export default StartScreen;