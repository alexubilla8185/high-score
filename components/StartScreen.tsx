

import React from 'react';
import { Vibe, AIPersonality } from '../types';
import { useGame } from '../context/GameContext';
import { useToast } from '../context/ToastContext';
import Logo from './Logo';

const BobMarleyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 text-teal-500 dark:text-[#00DFA2] group-hover:animate-pulse">
        <path d="M17.8285 6.17174C17.8285 6.17174 15.6067 10.8286 12.0001 10.8286C8.39347 10.8286 6.17163 6.17174 6.17163 6.17174C6.17163 6.17174 10.8285 8.39357 10.8285 12.0002C10.8285 15.6068 6.17163 17.8286 6.17163 17.8286C6.17163 17.8286 8.39347 13.1717 12.0001 13.1717C15.6067 13.1717 17.8285 17.8286 17.8285 17.8286C17.8285 17.8286 13.1716 15.6068 13.1716 12.0002C13.1716 8.39357 17.8285 6.17174 17.8285 6.17174Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const WillieNelsonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500 dark:text-[#F6FA70] transform group-hover:-rotate-6 transition-transform">
    <path d="M5 12C5 9.23858 7.23858 7 10 7H14C16.7614 7 19 9.23858 19 12V14H5V12Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M19 14L17.3137 17.3726C16.9248 18.1504 16.1111 18.6667 15.2229 18.6667H8.77715C7.88891 18.6667 7.07521 18.1504 6.68633 17.3726L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const SnoopDoggIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 dark:text-[#0079FF] group-hover:translate-y-[-2px] transition-transform">
        <path d="M5 12H9C9.55228 12 10 12.4477 10 13V15H4V13C4 12.4477 4.44772 12 5 12Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 12H19C19.5523 12 20 12.4477 20 13V15H14V13C14 12.4477 14.4477 12 15 12Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 13.5H14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 12L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 12L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const StrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 14C9.5 14 7 12 7 9C7 6 9.5 4 11 4C12.5 4 15 6 15 9C15 12 12.5 14 11 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 4V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 14V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5 11.5L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 6.5L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LyricIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M9 18V5L20 3V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 19C18.6569 19 20 17.6569 20 16C20 14.3431 18.6569 13 17 13C15.3431 13 14 14.3431 14 16C14 17.6569 15.3431 19 17 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MunchieIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M5 13L19 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4.5 18H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10C5 6.68629 7.68629 4 11 4H13C16.3137 4 19 6.68629 19 10V10H5V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 16L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 16L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const vibes = [
    { 
        vibe: Vibe.Buzzed,
        personality: AIPersonality.BobMarley,
        icon: <BobMarleyIcon />, 
        title: 'Bob Marley', 
        subtitle: 'The "Roots" Level',
        description: "Chill, spiritual questions on reggae, Rasta culture, and classic philosophy. A mellow riddim for the soul.",
        hoverClasses: 'hover:scale-[1.02]',
    },
    { 
        vibe: Vibe.Toasted, 
        personality: AIPersonality.WillieNelson,
        icon: <WillieNelsonIcon />, 
        title: 'Willie Nelson', 
        subtitle: 'The "Outlaw" Level',
        description: "Laid-back, story-based questions on stoner cinema, music history, and the munchies. For the seasoned traveler.",
        hoverClasses: 'hover:scale-[1.02] hover:-rotate-1',
    },
    { 
        vibe: Vibe.Voyager,
        personality: AIPersonality.SnoopDogg,
        icon: <SnoopDoggIcon />, 
        title: 'Snoop Dogg', 
        subtitle: 'The "Chronic" Level',
        description: "Fo shizzle. Modern, creative questions on pop culture, highdeas, and trippy visuals to bend your reality.",
        hoverClasses: 'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-[#0079FF]/30',
    },
];

const comingSoonGames = [
    {
        icon: <StrainIcon />,
        title: 'Guess the Strain',
        description: 'Match the bud to the iconic name.'
    },
    {
        icon: <LyricIcon />,
        title: 'Finish the Lyric',
        description: 'Test your knowledge of stoner anthems.'
    },
    {
        icon: <MunchieIcon />,
        title: 'The Munchie Mashup',
        description: 'Invent a dish from random ingredients.'
    }
];

const StartScreen: React.FC = () => {
    const { dispatch } = useGame();
    const { addToast } = useToast();
    
    const handleStartGame = (vibe: Vibe, personality: AIPersonality) => {
        dispatch({ type: 'START_GAME', payload: { vibe, aiPersonality: personality } });
    };

    const handleComingSoon = () => {
        addToast("Patience, young padawan. These special rounds are still brewin'.", 'info');
    };
    
    return (
        <div className="w-full max-w-2xl text-center flex flex-col items-center justify-center animate-card-fade-in-up">
            <Logo />
            <h1 className="sr-only">Higher Please</h1>
            <div className="w-full max-w-lg flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-teal-600 dark:text-[#00DFA2]">Choose Your Spirit Guide</h2>
                <div className="w-full space-y-4">
                {vibes.map((v, index) => (
                    <button
                        key={v.vibe}
                        onClick={() => handleStartGame(v.vibe, v.personality)}
                        className={`w-full p-4 sm:p-5 bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-200 dark:border-neutral-800 rounded-xl text-left flex items-center space-x-4 sm:space-x-5 hover:bg-gray-100/70 dark:hover:bg-neutral-800/70 hover:border-[#0079FF] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] ${v.hoverClasses}`}
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

                <div className="w-full mt-8 border-t-2 border-dashed border-gray-200 dark:border-neutral-800 pt-6">
                    <h3 className="text-xl font-bold text-center mb-4 text-neutral-500 dark:text-neutral-400">
                        Freshly Rolled Features
                        <span className="block text-xs font-medium">(Coming Soon)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {comingSoonGames.map((game, index) => (
                            <button
                                key={index}
                                onClick={handleComingSoon}
                                className="w-full p-4 bg-white/30 dark:bg-neutral-900/40 border-2 border-gray-200 dark:border-neutral-800 rounded-xl text-center flex flex-col items-center justify-center hover:bg-gray-100/50 dark:hover:bg-neutral-800/60 hover:border-[#0079FF]/50 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] opacity-70 hover:opacity-100"
                                aria-label={`${game.title} - Coming Soon`}
                            >
                                <div className="flex-shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-[#0079FF] transition-colors">{game.icon}</div>
                                <div className="mt-2">
                                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">{game.title}</h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-300">{game.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;