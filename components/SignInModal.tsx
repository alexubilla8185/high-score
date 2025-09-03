import React, { useState } from 'react';
import Spinner from './Spinner';

interface SignInModalProps {
  onClose: () => void;
  onSignInSuccess: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onSignInSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for effect
    setTimeout(() => {
      if (password.toLowerCase() === 'google') {
        onSignInSuccess();
      } else {
        setError('Incorrect password. The secret word is not so secret.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500); // Animation duration
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-modal-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm bg-white/80 dark:bg-black/30 backdrop-blur-2xl border-2 border-gray-200 dark:border-[#0079FF]/50 rounded-2xl shadow-2xl p-8 m-4 animate-card-fade-in-up transition-transform duration-300 ${isShaking ? 'animate-shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="signin-title" className="text-center text-3xl font-bold bg-gradient-to-r from-[#0079FF] to-[#00DFA2] text-transparent bg-clip-text mb-2">
          Enter the Cosmos
        </h2>
        <p className="text-center text-neutral-600 dark:text-neutral-300 mb-8">
          The password is "google". For now.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cosmic_traveler"
              className="block w-full bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-300 dark:border-neutral-700 rounded-lg p-3 shadow-sm focus:border-[#00DFA2] focus:ring focus:ring-[#00DFA2]/50 focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Secret Word
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-300 dark:border-neutral-700 rounded-lg p-3 shadow-sm focus:border-[#00DFA2] focus:ring focus:ring-[#00DFA2]/50 focus:outline-none transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-center text-pink-600 dark:text-[#FF0060] animate-modal-fade-in">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full mt-2 flex justify-center items-center cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner /> : 'Sign In'}
            </button>
          </div>
        </form>
         <button
            onClick={onClose}
            className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF]"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
      </div>
    </div>
  );
};

export default SignInModal;