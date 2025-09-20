import React from 'react';

const HowItWorksIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface HowItWorksButtonProps {
    onClick: () => void;
    isActive: boolean;
}

const HowItWorksButton: React.FC<HowItWorksButtonProps> = ({ onClick, isActive }) => {
    const baseClasses = "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]";
    
    const inactiveClasses = "bg-gray-500/10 dark:bg-white/10 text-blue-600 dark:text-[#0079FF] hover:scale-110";
    
    const activeClasses = "bg-gradient-to-br from-blue-500 to-cyan-400 text-white scale-110";

    return (
        <button
            onClick={onClick}
            aria-label="How it works"
            aria-pressed={isActive}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <HowItWorksIcon />
        </button>
    );
};

export default HowItWorksButton;
