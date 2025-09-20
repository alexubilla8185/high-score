import React from 'react';
import Logo from './Logo';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
  onStartTour: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartQuiz, onStartTour }) => {
  return (
    <div className="w-full max-w-2xl text-center flex flex-col items-center justify-center animate-card-fade-in-up">
      <Logo className="w-40 h-40 sm:w-48 sm:h-48 mb-6" />
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
        Ready to Test Your Vibe?
      </h1>
      <p className="max-w-xl text-lg text-neutral-600 dark:text-neutral-300 mb-10">
        An AI-powered quiz that generates surreal and funny questions to see how high your consciousness can fly. Are you buzzed, toasted, or a cosmic voyager?
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={onStartQuiz}
          className="w-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#00DFA2]"
        >
          Start Cosmic Quiz
        </button>
        <button
          onClick={onStartTour}
          className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors font-semibold py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] rounded-md"
        >
          How does this work?
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
