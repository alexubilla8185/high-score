import React, { useState } from 'react';
import Spinner from './Spinner';
import Logo from './Logo';

// Icons for password visibility
const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .95-3.112 3.548-5.441 6.542-6.175M12 12a3 3 0 11-6 0 3 3 0 016 0zM17.58 17.58A9.953 9.953 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .95-3.112 3.548-5.441 6.542-6.175m2.59.045A9.953 9.953 0 0121.542 12c-1.274 4.057-5.064 7-9.542 7a9.953 9.953 0 01-2.591-.375M1 1l22 22" />
    </svg>
);

// Icon for the back button
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


interface AuthModalProps {
  onClose: () => void;
  onSignInSuccess: () => void;
  onTakeTour: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSignInSuccess, onTakeTour }) => {
  const [view, setView] = useState<'initial' | 'signin'>('initial');

  // State for sign-in form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (password.toLowerCase() === 'google') {
        onSignInSuccess();
      } else {
        setError('Incorrect password. Psst... it\'s "google".');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
      setIsLoading(false);
    }, 500);
  };

  const renderInitialView = () => (
    <div key="initial" className="animate-modal-fade-in flex flex-col items-center justify-center text-center p-6 sm:p-8">
        <h2 id="auth-title" className="text-2xl font-bold bg-gradient-to-r from-[#0079FF] to-[#00DFA2] text-transparent bg-clip-text mb-6">
            Welcome to High Score
        </h2>
        <div className="w-full flex flex-col gap-4">
            <button
                onClick={() => setView('signin')}
                className="w-full bg-[#0079FF] hover:bg-[#005cbf] text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
            >
                Sign In
            </button>
            <button
                onClick={onTakeTour}
                className="w-full bg-gradient-to-r from-[#FF0060] to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform transform focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
            >
                Take the Tour
            </button>
        </div>
    </div>
  );

  const renderSignInView = () => (
    <div key="signin" className="animate-modal-fade-in p-6 sm:p-8">
        <button 
            onClick={() => setView('initial')}
            className="absolute top-4 left-4 text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
            aria-label="Go back"
        >
            <BackArrowIcon />
        </button>
        <Logo 
          className="w-20 h-20 mx-auto mb-4" 
          eyesDown={isInputFocused}
        />
        
        <h2 id="signin-title" className="text-center text-2xl font-bold bg-gradient-to-r from-[#0079FF] to-[#00DFA2] text-transparent bg-clip-text mb-1">
          Get Your High Score
        </h2>
        <p className="text-center text-neutral-600 dark:text-neutral-300 mb-6 text-sm">
          Sign in to unlock Pro features.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="block w-full bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-300 dark:border-neutral-700 rounded-lg p-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 transition-all"
            />
          </div>
          <div className="relative">
            <label htmlFor="password-input" className="sr-only">Password</label>
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (hint: google)"
              className="block w-full bg-white/50 dark:bg-neutral-900/50 border-2 border-gray-300 dark:border-neutral-700 rounded-lg p-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 transition-all"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 focus-visible:ring-[#00DFA2]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-center text-pink-600 dark:text-[#FF0060]">{error}</p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full flex justify-center items-center bg-[#0079FF] hover:bg-[#005cbf] text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner /> : 'Sign In'}
            </button>
            <a href="#" className="text-sm text-center text-blue-600 dark:text-[#0079FF] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] rounded-sm">Forgot Password?</a>
          </div>
        </form>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-modal-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm bg-white/60 dark:bg-black/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-neutral-800/50 transition-transform duration-300 ${isShaking ? 'animate-shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
            onClick={onClose}
            className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF] z-20"
            aria-label="Close"
        >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {view === 'initial' ? renderInitialView() : renderSignInView()}
      </div>
    </div>
  );
};

export default AuthModal;