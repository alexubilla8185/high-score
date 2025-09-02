import React from 'react';
import { useGame } from '../context/GameContext';

const HapticOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2 8 2 2-2 2 2 2-2 2"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="m22 8-2 2 2 2-2 2 2 2"/>
        <rect width="8" height="14" x="8" y="5" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const HapticOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="8" height="14" x="8" y="5" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const HapticToggle: React.FC = () => {
    const { state, dispatch } = useGame();

    const handleToggle = () => {
        dispatch({ type: 'TOGGLE_HAPTIC' });
    };

    return (
        <button
            onClick={handleToggle}
            aria-label={`Turn haptic feedback ${state.isHapticEnabled ? 'off' : 'on'}`}
            className="w-12 h-12 bg-gray-200 dark:bg-neutral-800/80 rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg hover:scale-110 transition-all transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
        >
            {state.isHapticEnabled ? <HapticOnIcon /> : <HapticOffIcon />}
        </button>
    );
};

export default HapticToggle;