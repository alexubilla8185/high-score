

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
import Logo from './components/Logo';
import InteractiveDemo from './components/InteractiveDemo';
import ShareButton from './components/ShareButton';
import WelcomeScreen from './components/WelcomeScreen';
import ToastContainer from './components/ToastContainer';
import TekguyzBadge from './components/TekguyzBadge';
import NerdSpecsModal from './components/NerdSpecsModal';

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
    isDemoMode
  } = state;

  const [hasSeenWelcome, setHasSeenWelcome] = useState(() => sessionStorage.getItem('hasSeenWelcome') === 'true');
  const [showNerdSpecs, setShowNerdSpecs] = useState(false);

  const handlePremiumFeatureToggle = (actionType: 'TOGGLE_HAPTIC' | 'TOGGLE_SOUND' | 'TOGGLE_THEME') => {
    dispatch({ type: actionType });
  };

  const handleLogoClick = () => {
    dispatch({ type: 'RESTART_GAME' });
  };

  const handleStartQuiz = () => {
    sessionStorage.setItem('hasSeenWelcome', 'true');
    setHasSeenWelcome(true);
  };

  const handleStartTour = () => {
    sessionStorage.setItem('hasSeenWelcome', 'true');
    setHasSeenWelcome(true);
    dispatch({ type: 'START_DEMO_TOUR' });
  };

  const renderContent = () => {
    if (!hasSeenWelcome && gameState === GameState.Idle) {
      return <WelcomeScreen onStartQuiz={handleStartQuiz} onStartTour={handleStartTour} />;
    }
    
    switch (gameState) {
      case GameState.Loading:
        return (
          <div className="flex flex-col items-center justify-center h-full animate-card-fade-in-up">
            <Logo className="w-32 h-32 animate-spin-slow" />
            <p className="mt-4 text-lg text-teal-600 dark:text-[#00DFA2] animate-pulse-subtle">Generating your cosmic quiz...</p>
          </div>
        );
      
      case GameState.Playing:
        const timePercentage = Math.max(0, (time / QUESTION_TIME_LIMIT) * 100);
        return (
          <div key={currentQuestionIndex} className="w-full flex flex-col items-center animate-card-fade-in-up">
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
                  <div className="bg-gradient-to-r from-[#0079FF] to-[#00DFA2] h-2.5 rounded-full progress-bar-inner" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-1.5 mb-6">
                <div 
                    className="bg-yellow-400 dark:bg-[#F6FA70] h-1.5 rounded-full timer-bar-inner" 
                    style={{ width: `${timePercentage}%` }}
                ></div>
              </div>
            </div>
            <QuestionCard />
          </div>
        );
      
      case GameState.Finished:
        return <ResultsScreen />;

      case GameState.DemoTour:
        return <InteractiveDemo />;
      
      case GameState.Error:
        return <div className="text-center animate-card-fade-in-up">
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
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex flex-col items-center justify-start sm:justify-center p-4 font-sans selection:bg-[#0079FF] selection:text-white">
        <ToastContainer />
        {( (isDemoMode && (gameState === GameState.Playing || gameState === GameState.Finished)) || gameState === GameState.DemoTour) && (
          <div className="fixed top-4 left-4 z-50">
            <Logo onClick={handleLogoClick} className="w-16 h-16" />
          </div>
        )}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          <ShareButton />
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
        <TekguyzBadge theme={state.theme} onIconClick={() => setShowNerdSpecs(true)} />
        {showNerdSpecs && <NerdSpecsModal onClose={() => setShowNerdSpecs(false)} />}
    </div>
  );
};

export default App;