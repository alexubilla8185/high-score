import React from 'react';
import { useGame } from '../context/GameContext';
import { AIPersonality } from '../types';

const personalityOptions = [
    { id: AIPersonality.Witty, label: 'Witty', description: 'Clever and quirky.' },
    { id: AIPersonality.Sassy, label: 'Sassy (Pro)', description: 'Dry, sarcastic humor.' },
    { id: AIPersonality.Unfiltered, label: 'Unfiltered (Pro)', description: 'Edgy and roasting.' },
];

const AIPersonalitySelector: React.FC = () => {
    const { state, dispatch } = useGame();
    const { aiPersonality } = state;

    const handlePersonalityChange = (personality: AIPersonality) => {
        dispatch({ type: 'SET_AI_PERSONALITY', payload: personality });
    };

    return (
        <div className="w-full max-w-md text-center">
            <h2 className="text-lg font-bold mb-3 text-blue-600 dark:text-[#0079FF]">AI Quizmaster Attitude</h2>
            <div className="relative flex w-full p-1 bg-gray-200/80 dark:bg-neutral-900/80 rounded-full">
                {personalityOptions.map(option => (
                    <button
                        key={option.id}
                        onClick={() => handlePersonalityChange(option.id)}
                        className={`relative flex-1 px-2 sm:px-4 py-2 text-sm sm:text-base font-bold rounded-full transition-colors duration-300 focus:outline-none z-10 ${
                            aiPersonality === option.id
                                ? 'text-white'
                                : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                        }`}
                        aria-pressed={aiPersonality === option.id}
                    >
                        {option.label}
                    </button>
                ))}
                <div
                    className="absolute top-1 h-10 bg-gradient-to-r from-[#0079FF] to-[#00DFA2] rounded-full shadow-md transition-all duration-300 ease-in-out"
                    style={{
                        width: `calc((100% - 8px) / ${personalityOptions.length})`,
                        left: `${(personalityOptions.findIndex(p => p.id === aiPersonality) / personalityOptions.length) * 100}%`,
                        marginLeft: '4px',
                    }}
                />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 h-4">
                {personalityOptions.find(p => p.id === aiPersonality)?.description}
            </p>
        </div>
    );
};

export default AIPersonalitySelector;
