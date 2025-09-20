import React from 'react';

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface SettingsButtonProps {
    onClick: () => void;
    isActive: boolean;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick, isActive }) => {
    const baseClasses = "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]";
    
    const inactiveClasses = "bg-gray-500/10 dark:bg-white/10 text-teal-600 dark:text-[#00DFA2] hover:scale-110";

    const activeClasses = "bg-gradient-to-br from-teal-500 to-green-400 text-white scale-110";

    return (
        <button
            onClick={onClick}
            aria-label="Open settings panel"
            aria-pressed={isActive}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <SettingsIcon />
        </button>
    );
};

export default SettingsButton;
