import React from 'react';
import { useGame } from '../context/GameContext';

const HapticOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l-1 2 1 2M20 8l1 2-1 2" />
    </svg>
);

const HapticOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" />
    </svg>
);

interface HapticToggleProps {
    onToggle: () => void;
}

const HapticToggle: React.FC<HapticToggleProps> = ({ onToggle }) => {
    const { state } = useGame();

    return (
        <button
            onClick={onToggle}
            aria-label={`Turn haptic feedback ${state.isHapticEnabled ? 'off' : 'on'}`}
            className="w-12 h-12 bg-gray-200 dark:bg-neutral-800/80 rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-lg hover:scale-110 transition-all transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
        >
            {state.isHapticEnabled ? <HapticOnIcon /> : <HapticOffIcon />}
        </button>
    );
};

export default HapticToggle;