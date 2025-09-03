
import React, { useState } from 'react';
import { Vibe, AIPersonality } from '../types';
import { useGame } from '../context/GameContext';
import NerdSpecsModal from './NerdSpecsModal';
import Logo from './Logo';
import SignInModal from './SignInModal';
import AIPersonalitySelector from './AIPersonalitySelector';

const GoProIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 dark:text-[#0079FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
    const { state, dispatch } = useGame();
    const { isPro, aiPersonality } = state;
    
    const [showNerdSpecsModal, setShowNerdSpecsModal] = useState(false);
    const [isSignInModalVisible, setSignInModalVisible] = useState(false);
    const [splashTapped, setSplashTapped] = useState(false);
    
    const handleStartGame = (vibe: Vibe) => {
        dispatch({ type: 'START_GAME', payload: { vibe, aiPersonality } });
    };

    const handleTakeTour = () => {
        dispatch({ type: 'START_DEMO_TOUR' });
    };

    const handleGoProClick = () => {
        setSignInModalVisible(true);
    };

    const handleSignInSuccess = () => {
        dispatch({ type: 'UPGRADE_TO_PRO' });
        setSignInModalVisible(false);
    };
    
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const handleSplashTap = () => {
        setSplashTapped(!splashTapped);
    };

    return (
        <>
            {/* The Vibe selection screen for Pro users */}
            {isPro && (
                <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center animate-card-fade-in-up">
                    <Logo onTripleClick={() => setShowNerdSpecsModal(true)} />
                    <h1 className="sr-only">High Score</h1>
                    <div className="w-full max-w-md flex flex-col items-center">
                        <AIPersonalitySelector />

                        <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-[#00DFA2] mt-8">Choose Your Vibe</h2>
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
                            onClick={handleLogout}
                            className="mt-6 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] rounded"
                        >
                        &larr; Log Out
                        </button>
                    </div>
                </div>
            )}
            
            {/* The Welcome/Splash screen for non-Pro users */}
            {!isPro && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                    { !splashTapped ? (
                        <div className="animate-card-fade-in-up cursor-pointer" onClick={handleSplashTap}>
                            <Logo 
                                className="w-48 h-48 sm:w-56 sm:h-56" 
                                onTripleClick={() => setShowNerdSpecsModal(true)}
                            />
                            <p className="mt-4 text-xl font-semibold text-neutral-500 animate-pulse">Tap the face to begin</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center animate-card-fade-in-up">
                            <div className="w-full max-w-lg bg-white/60 dark:bg-black/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-neutral-800/50 p-6 grid sm:grid-cols-2 gap-6 items-center">
                                {/* Left side: Logo & Tour Button */}
                                <div className="relative flex flex-col items-center justify-center">
                                    <Logo 
                                        onClick={handleSplashTap} 
                                        className="w-32 h-32 cursor-pointer"
                                        onTripleClick={() => setShowNerdSpecsModal(true)}
                                    />
                                    <button
                                        onClick={handleTakeTour}
                                        className="mt-[-25px] relative z-10 bg-gradient-to-r from-[#FF0060] to-pink-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform transform"
                                    >
                                        Take the Tour
                                    </button>
                                </div>
                                
                                {/* Right side: Go Pro */}
                                <div className="flex flex-col text-center sm:text-left h-full justify-center space-y-4">
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <GoProIcon /> 
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0079FF] to-[#00DFA2] text-transparent bg-clip-text ml-2">
                                            Go Pro
                                        </h2>
                                    </div>
                                    <p className="text-neutral-600 dark:text-neutral-300">
                                        Unlock themes, sounds, haptics, and more AI personalities.
                                    </p>
                                    <button
                                        onClick={handleGoProClick}
                                        className="w-full bg-gradient-to-r from-teal-400 to-green-500 text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-teal-500/30 dark:hover:shadow-teal-400/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-4 text-center">(Tap the face again to go back)</p>
                        </div>
                    )}
                </div>
            )}
            
            {showNerdSpecsModal && <NerdSpecsModal onClose={() => setShowNerdSpecsModal(false)} />}

            {isSignInModalVisible && (
                <SignInModal 
                    onClose={() => setSignInModalVisible(false)}
                    onSignInSuccess={handleSignInSuccess}
                />
            )}
        </>
    );
};

export default StartScreen;