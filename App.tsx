import React, { useState } from 'react';
import { GameState } from './types';
import { useGame, QUESTION_TIME_LIMIT } from './context/GameContext';

import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';
import Spinner from './components/Spinner';
import Timer from './components/Timer';
import FeedbackOverlay from './components/FeedbackOverlay';
import ThemeToggle from './components/ThemeToggle';
import SoundToggle from './components/SoundToggle';
import HapticToggle from './components/HapticToggle';
import UpgradeModal from './components/UpgradeModal';

const App: React.FC = () => {
  const { state, dispatch } = useGame();
  const { 
    gameState, 
    questions, 
    currentQuestionIndex, 
    error, 
    time, 
    feedback, 
    isProcessingAnswer,
    isDemoMode,
    isPro
  } = state;

  const [isUpgradeModalVisible, setUpgradeModalVisible] = useState(false);

  const handlePremiumFeatureToggle = (actionType: 'TOGGLE_HAPTIC' | 'TOGGLE_SOUND' | 'TOGGLE_THEME') => {
    if (isPro) {
      dispatch({ type: actionType });
    } else {
      setUpgradeModalVisible(true);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.Loading:
        return <div className="flex flex-col items-center justify-center h-full"><Spinner /><p className="mt-4 text-lg text-teal-600 dark:text-[#00DFA2]">Generating your cosmic quiz...</p></div>;
      
      case GameState.Playing:
        const timePercentage = Math.max(0, (time / QUESTION_TIME_LIMIT) * 100);
        return (
          <>
            <div className="w-full max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-teal-600 dark:text-[#00DFA2]">
                      Question {currentQuestionIndex + 1}
                      <span className="text-neutral-500 dark:text-neutral-300">/{questions.length}</span>
                    </p>
                    {isDemoMode && <span className="bg-yellow-400/20 text-yellow-500 dark:text-[#F6FA70] text-xs font-bold px-2 py-1 rounded-full">DEMO</span>}
                  </div>
                  <Timer time={time} />
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-2.5 mb-2">
                  <div className="bg-gradient-to-r from-[#0079FF] to-[#00DFA2] h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-1.5 mb-6">
                <div 
                    className="bg-yellow-400 dark:bg-[#F6FA70] h-1.5 rounded-full" 
                    style={{ width: `${timePercentage}%`, transition: 'width 1s linear' }}
                ></div>
              </div>
            </div>
            <QuestionCard />
          </>
        );
      
      case GameState.Finished:
        return <ResultsScreen />;
      
      case GameState.Error:
        return <div className="text-center">
                <p className="text-xl text-pink-600 dark:text-[#FF0060]">{error}</p>
                <button
                  onClick={() => window.location.reload()} // Simple reload to restart fully
                  className="mt-6 bg-[#0079FF] hover:bg-[#005cbf] text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black"
                >
                  Try Again
                </button>
              </div>;
      
      case GameState.Idle:
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#0079FF] selection:text-white">
        <div className="fixed top-4 right-4 z-10 flex items-center gap-3">
          <HapticToggle onToggle={() => handlePremiumFeatureToggle('TOGGLE_HAPTIC')} />
          <SoundToggle onToggle={() => handlePremiumFeatureToggle('TOGGLE_SOUND')} />
          <ThemeToggle onToggle={() => handlePremiumFeatureToggle('TOGGLE_THEME')} />
        </div>
        <main className="w-full max-w-3xl flex flex-col items-center justify-center flex-grow">
          {renderContent()}
        </main>
        {feedback && <FeedbackOverlay feedback={feedback} />}
        {isProcessingAnswer && !feedback && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-200/50 dark:bg-black/50 backdrop-blur-sm">
            <Spinner />
          </div>
        )}
        {isUpgradeModalVisible && (
          <UpgradeModal 
            onClose={() => setUpgradeModalVisible(false)} 
            onUpgrade={() => {
              dispatch({ type: 'UPGRADE_TO_PRO' });
              setUpgradeModalVisible(false);
            }} 
          />
        )}
    </div>
  );
};

export default App;