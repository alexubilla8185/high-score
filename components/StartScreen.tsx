import React, { useState } from 'react';
import { Vibe } from '../types';
import { useGame } from '../context/GameContext';
import HowItWorksModal from './HowItWorksModal';
import NerdSpecsModal from './NerdSpecsModal';
import Logo from './Logo';

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ProIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-yellow-400 dark:text-[#F6FA70]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.75 18l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L20.25 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

const FreeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
);

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
  const [showVibeSelection, setShowVibeSelection] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showNerdSpecsModal, setShowNerdSpecsModal] = useState(false);
  const { dispatch } = useGame();

  const handleSignInAndSelectVibe = () => {
    dispatch({ type: 'UPGRADE_TO_PRO' });
    setShowVibeSelection(true);
  };
  
  const handleStartGame = (vibe: Vibe) => {
    dispatch({ type: 'START_GAME', payload: vibe });
  };

  const handleDemo = () => {
    dispatch({ type: 'START_DEMO' });
  };

  return (
    <>
      <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center animate-page-fade-in">
        <Logo onTripleClick={() => setShowNerdSpecsModal(true)} />
        <h1 className="sr-only">High Score</h1>
        
        {!showVibeSelection ? (
          <div className="w-full animate-card-fade-in-up">
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 px-4 max-w-xl mx-auto">
              Is your brain feeling a little fuzzy, or are you just enlightened? Let's find out.
            </p>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                {/* Pro Card */}
                <div className="bg-white/50 dark:bg-neutral-900/50 border-2 border-transparent hover:border-[#00DFA2] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-[#00DFA2]/20 transform hover:-translate-y-1">
                    <ProIcon />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Go Pro</h2>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-6 flex-grow">Unlock all features for the full cosmic experience.</p>
                    <button
                        onClick={handleSignInAndSelectVibe}
                        className="w-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-xl py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black"
                    >
                        Sign In
                    </button>
                </div>

                {/* Demo Card */}
                <div className="bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-[#0079FF] hover:shadow-2xl hover:shadow-[#0079FF]/20 transform hover:-translate-y-1">
                    <FreeIcon />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free Play</h2>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-6 flex-grow">Try a sample quiz and get a feel for the cosmos.</p>
                    <button
                        onClick={handleDemo}
                        className="w-full bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-gray-800 dark:text-white font-bold text-lg py-3 px-6 rounded-full shadow-sm hover:bg-gray-100/50 dark:hover:bg-neutral-800/50 hover:border-[#0079FF] hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black"
                    >
                        Try a Demo
                    </button>
                </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md flex flex-col items-center animate-card-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-[#00DFA2]">Choose Your Vibe</h2>
            <div className="w-full space-y-4">
              {vibes.map((v, index) => (
                <button
                  key={v.vibe}
                  onClick={() => handleStartGame(v.vibe)}
                  className="w-full p-5 bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-200 dark:border-neutral-800 rounded-xl text-left flex items-center space-x-5 hover:bg-gray-100/70 dark:hover:bg-neutral-800/70 hover:border-[#0079FF] transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF]"
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
              onClick={() => setShowVibeSelection(false)}
              className="mt-6 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] rounded"
            >
              &larr; Back
            </button>
          </div>
        )}
      </div>
      
      <div className="fixed bottom-4 right-4 z-20">
        <button
          onClick={() => setShowHowItWorksModal(true)}
          aria-label="How it works"
          className="w-14 h-14 md:w-16 md:h-16 bg-gray-200/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg hover:scale-110 transition-all transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
        >
          <InfoIcon />
        </button>
      </div>

      {showHowItWorksModal && <HowItWorksModal onClose={() => setShowHowItWorksModal(false)} />}
      {showNerdSpecsModal && <NerdSpecsModal onClose={() => setShowNerdSpecsModal(false)} />}
    </>
  );
};

export default StartScreen;
