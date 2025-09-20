
import React from 'react';
import { useGame } from '../context/GameContext';
import { useToast } from '../context/ToastContext';
import ToggleSwitch from './ToggleSwitch';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useGame();
  const { addToast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'Higher Please Quiz',
      text: `Challenge your mind with this surreal, AI-powered quiz. Can you get a higher score?`,
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.url);
        addToast('Link copied to clipboard!');
      }
      onClose(); // Close panel after sharing
    } catch (error) {
      console.error('Error sharing:', error);
      addToast('Could not share link.', 'error');
    }
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART_GAME' });
    onClose();
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/60 backdrop-blur-sm animate-modal-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white/80 dark:bg-black/30 backdrop-blur-2xl border-2 border-gray-200 dark:border-neutral-800/50 rounded-2xl shadow-2xl p-6 animate-card-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="settings-title" className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
            aria-label="Close Settings"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="space-y-6">
          <ToggleSwitch
            label="Dark Mode"
            checked={state.theme === 'dark'}
            onChange={() => dispatch({ type: 'TOGGLE_THEME' })}
            ariaLabel="Toggle dark mode theme"
          />
          <ToggleSwitch
            label="Sound"
            checked={!state.isMuted}
            onChange={() => dispatch({ type: 'TOGGLE_SOUND' })}
            ariaLabel="Toggle sound effects"
          />
          <ToggleSwitch
            label="Haptics"
            checked={state.isHapticEnabled}
            onChange={() => dispatch({ type: 'TOGGLE_HAPTIC' })}
            ariaLabel="Toggle haptic feedback"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-neutral-800/50 space-y-4">
            <button
              onClick={handleShare}
              className="w-full bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black"
            >
              Share Game
            </button>
            <button
              onClick={handleRestart}
              className="w-full bg-[#FF0060]/80 hover:bg-[#FF0060] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6FA70] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black"
            >
              Restart Quiz
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
