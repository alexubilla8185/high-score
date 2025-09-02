
import React, { useState } from 'react';
import { Vibe } from '../types';
import { useGame } from '../context/GameContext';
import HowItWorksModal from './HowItWorksModal';
import Logo from './Logo';

const BuzzedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-yellow-500 dark:text-[#F6FA70] group-hover:animate-pulse">
    <path d="M12 2L13.84 8.16L20 10L13.84 11.84L12 18L10.16 11.84L4 10L10.16 8.16L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 15L18.67 16.33L17.33 16.67L18.67 17L19 18.33L19.33 17L20.67 16.67L19.33 16.33L19 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 6L6.5 7.5L5 8L6.5 8.5L7 10L7.5 8.5L9 8L7.5 7.5L7 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ToastedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-teal-500 dark:text-[#00DFA2] group-hover:animate-spin">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const VoyagerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-500 dark:text-[#0079FF] transform group-hover:-rotate-12 transition-transform duration-300">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
        <path d="M15.5 8.5L8.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const vibes = [
  { vibe: Vibe.Buzzed, icon: <BuzzedIcon />, title: 'Feeling Buzzed', description: 'Lighthearted, silly, and slightly goofy. Perfect for a gentle lift-off.' },
  { vibe: Vibe.Toasted, icon: <ToastedIcon />, title: 'Perfectly Toasted', description: 'The classic experience. Creative riddles and surreal questions for a happy medium.' },
  { vibe: Vibe.Voyager, icon: <VoyagerIcon />, title: 'Cosmic Voyager', description: 'Deeply philosophical and reality-bending. For when you want to question everything.' },
];

const StartScreen: React.FC = () => {
  const [showVibes, setShowVibes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useGame();

  const handleStart = (vibe: Vibe) => {
    dispatch({ type: 'START_GAME', payload: vibe });
  };

  return (
    <>
      <div className="w-full max-w-md text-center flex flex-col items-center justify-center animate-page-fade-in">
        <Logo />
        <h1 className="sr-only">High Score</h1>
        
        {!showVibes ? (
          <div className="w-full animate-card-fade-in-up">
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 px-4">
              Is your brain feeling a little fuzzy, or are you just enlightened? Let's find out.
            </p>
            <button
              onClick={() => setShowVibes(true)}
              className="w-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black"
            >
              How High
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-[#00DFA2] animate-card-fade-in-up">Choose Your Vibe</h2>
            <div className="w-full space-y-4">
              {vibes.map((v, index) => (
                <button
                  key={v.vibe}
                  onClick={() => handleStart(v.vibe)}
                  className="w-full p-5 bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-200 dark:border-neutral-800 rounded-xl text-left flex items-center space-x-5 hover:bg-gray-100/70 dark:hover:bg-neutral-800/70 hover:border-[#0079FF] transition-all duration-300 group animate-card-fade-in-up focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">{v.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{v.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">{v.description}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowVibes(false)}
              className="mt-6 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] rounded"
            >
              &larr; Back
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setShowModal(true)}
          aria-label="How it works"
          className="w-14 h-14 bg-gradient-to-br from-[#0079FF] to-[#00DFA2] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform transform hover:shadow-[#0079FF]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
      </div>
      
      {showModal && <HowItWorksModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default StartScreen;