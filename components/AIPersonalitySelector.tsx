import React from 'react';
import { useGame } from '../context/GameContext';
import { AIPersonality } from '../types';

// FIX: Use correct enum members from AIPersonality.
const personalityOptions = [
    { id: AIPersonality.BobMarley, label: 'Bob Marley', description: 'Chill, philosophical vibes.' },
    { id: AIPersonality.WillieNelson, label: 'Willie Nelson', description: 'Outlaw country wisdom.' },
    { id: AIPersonality.SnoopDogg, label: 'Snoop Dogg', description: 'Laid back G-funk flow.' },
];

const AIPersonalitySelector: React.FC = () => {
    const { state, dispatch } = useGame();
    const { aiPersonality } = state;

    const handlePersonalityChange = (personality: AIPersonality) => {
        // FIX: Add 'SET_AI_PERSONALITY' to Action type and handle in reducer.
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
                        className={`relative flex-1 px-2 sm:px-4 py-2 text-sm sm:text-base font-bold rounded-full transition-colors duration-300 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 dark:focus-visible:ring-offset-neutral-900 focus-visible:ring-[#0079FF] ${
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
                    className="absolute top-1 left-1 h-10 bg-gradient-to-r from-[#0079FF] to-[#00DFA2] rounded-full shadow-md transition-transform duration-300 ease-in-out"
                    style={{
                        width: `calc((100% - 8px) / ${personalityOptions.length})`,
                        transform: `translateX(${personalityOptions.findIndex(p => p.id === aiPersonality) * 100}%)`,
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