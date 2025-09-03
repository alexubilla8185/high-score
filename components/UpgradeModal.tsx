import React from 'react';
import { useGame } from '../context/GameContext';

interface UpgradeModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const CheckIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onUpgrade }) => {
    const { state } = useGame();
    const isDark = state.theme === 'dark';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-modal-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-gray-200 dark:border-[#00DFA2]/30 rounded-2xl shadow-2xl p-6 sm:p-8 m-4 animate-card-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
            <h2 id="upgrade-title" className="text-3xl font-bold bg-gradient-to-r from-[#0079FF] to-[#00DFA2] text-transparent bg-clip-text mb-2">
                Unlock Pro Features
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">Take your cosmic journey to the next level.</p>
        </div>

        <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-neutral-800/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Free Plan</h3>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <li className="flex items-center"><CheckIcon className="text-teal-500 mr-2" /> AI-Generated Quizzes</li>
                    <li className="flex items-center"><CheckIcon className="text-teal-500 mr-2" /> Three 'Vibe' Levels</li>
                    <li className="flex items-center"><XIcon className="text-pink-500 mr-2" /> Dark & Light Themes</li>
                    <li className="flex items-center"><XIcon className="text-pink-500 mr-2" /> Sound Effects & Haptics</li>
                    <li className="flex items-center"><XIcon className="text-pink-500 mr-2" /> Sassy & Unfiltered AI</li>
                </ul>
            </div>
            <div className="bg-gradient-to-br from-[#0079FF]/20 to-[#00DFA2]/20 p-4 rounded-lg border border-[#00DFA2]/50">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Pro Plan</h3>
                 <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                    <li className="flex items-center"><CheckIcon className="text-teal-500 mr-2" /> AI-Generated Quizzes</li>
                    <li className="flex items-center"><CheckIcon className="text-teal-500 mr-2" /> Three 'Vibe' Levels</li>
                    <li className="flex items-center font-semibold"><CheckIcon className="text-teal-500 mr-2" /> Dark & Light Themes</li>
                    <li className="flex items-center font-semibold"><CheckIcon className="text-teal-500 mr-2" /> Sound Effects & Haptics</li>
                    <li className="flex items-center font-semibold"><CheckIcon className="text-teal-500 mr-2" /> Sassy & Unfiltered AI</li>
                </ul>
            </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
            <button
                onClick={onUpgrade}
                className="w-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900"
            >
                Upgrade Now
            </button>
            <button
                onClick={onClose}
                className="w-full text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 focus-visible:ring-[#0079FF]"
            >
                Maybe Later
            </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
