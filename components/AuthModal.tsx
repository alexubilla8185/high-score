

import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import Logo from './Logo';

// Icons - Using complete and valid SVG paths
const EyeOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const EyeClosedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-3.59-3.59" /></svg>;
const ThemeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" /></svg>;
const HapticIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 8l-1 2 1 2M20 8l1 2-1 2" /></svg>;
const SoundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5 5 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>;
const AIBanterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;

const proFeatures = [
    { icon: <AIBanterIcon />, title: "Unlock AI Personalities", description: "Engage with Sassy or Unfiltered quizmasters." },
    { icon: <ThemeIcon />, title: "Personalize Your Vibe", description: "Switch between light and dark themes." },
    { icon: <><SoundIcon /><HapticIcon /></>, title: "Engage Your Senses", description: "Experience sounds and haptic feedback." }
];

interface AuthModalProps {
    onClose: () => void;
    onSignInSuccess: () => void;
    onTakeTour: () => void;
}

type AuthView = 'initial' | 'signin' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSignInSuccess, onTakeTour }) => {
    const [view, setView] = useState<AuthView>('initial');
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({ email: '', password: '', confirmPassword: '' });

    // Reset form state when view changes
    useEffect(() => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setValidationErrors({ email: '', password: '', confirmPassword: '' });
        setAuthError('');
        // Fix: Corrected typo from `setIsPasswordVisible` to `setPasswordVisible`.
        setPasswordVisible(false);
    }, [view]);

    // Real-time validation for sign-up form
    useEffect(() => {
        if (view !== 'signup') return;

        const newErrors = { email: '', password: '', confirmPassword: '' };
        
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        
        if (password && password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }
        
        if (confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        
        setValidationErrors(newErrors);
    }, [email, password, confirmPassword, view]);


    // Add keyboard support for closing modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError('');
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For this demo, we'll just simulate a successful sign-in
        // In a real app, you would handle actual authentication logic here
        if (email === "fail@test.com") {
             setAuthError('Invalid credentials. Please try again.');
             setIsLoading(false);
        } else {
            onSignInSuccess();
        }
    };

    const isSignUpFormValid = 
        email &&
        password &&
        confirmPassword &&
        !validationErrors.email &&
        !validationErrors.password &&
        !validationErrors.confirmPassword;
        
    const renderForm = (isSignUp: boolean) => (
        <div className="w-full text-center">
            <button onClick={() => setView('initial')} className="absolute top-3 left-3 text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black" aria-label="Back">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div className="flex justify-center mb-4">
                 <Logo className="w-24 h-24" eyesDown={isInputFocused} />
            </div>
            <h2 className="text-3xl font-bold mb-2">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6">to unlock Pro features.</p>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="text-left">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        className="w-full bg-gray-100 dark:bg-neutral-800 border-2 border-transparent focus:border-[#0079FF] focus:bg-white dark:focus:bg-black rounded-lg p-3 text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-colors"
                    />
                    {isSignUp && validationErrors.email && <p className="text-pink-600 dark:text-[#FF0060] text-xs mt-1 ml-1">{validationErrors.email}</p>}
                </div>
                <div className="relative text-left">
                     <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        className="w-full bg-gray-100 dark:bg-neutral-800 border-2 border-transparent focus:border-[#0079FF] focus:bg-white dark:focus:bg-black rounded-lg p-3 pr-10 text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-colors"
                    />
                     <button
                        type="button"
                        onClick={() => setPasswordVisible(!isPasswordVisible)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-neutral-500 hover:text-black dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] rounded-lg"
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    >
                        {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </button>
                     {isSignUp && validationErrors.password && <p className="text-pink-600 dark:text-[#FF0060] text-xs mt-1 ml-1">{validationErrors.password}</p>}
                </div>
                {isSignUp && (
                    <div className="text-left">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            className="w-full bg-gray-100 dark:bg-neutral-800 border-2 border-transparent focus:border-[#0079FF] focus:bg-white dark:focus:bg-black rounded-lg p-3 pr-10 text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-colors"
                        />
                        {validationErrors.confirmPassword && <p className="text-pink-600 dark:text-[#FF0060] text-xs mt-1 ml-1">{validationErrors.confirmPassword}</p>}
                    </div>
                )}
                {authError && <p className="text-pink-600 dark:text-[#FF0060] text-sm animate-shake">{authError}</p>}
                <button type="submit" disabled={isLoading || (isSignUp && !isSignUpFormValid)} className="w-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#00DFA2] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                    {isLoading ? <Spinner /> : (isSignUp ? 'Create & Go Pro' : 'Sign In & Go Pro')}
                </button>
            </form>
             <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button onClick={() => setView(isSignUp ? 'signin' : 'signup')} className="font-bold text-[#0079FF] hover:underline ml-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0079FF] rounded-sm">
                    {isSignUp ? 'Sign In' : 'Create one'}
                </button>
            </p>
        </div>
    );

    const renderInitialView = () => (
        <div className="text-center">
            <div className="flex justify-center mb-4">
                <Logo className="w-28 h-28" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Go Cosmic with Pro</h2>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8">Unlock the full High Score experience.</p>
            
            <div className="space-y-4 text-left mb-8">
                {proFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500/20 to-blue-500/20 text-[#00DFA2] rounded-lg flex items-center justify-center shadow-inner">
                            <div className="w-10 h-10 bg-white/80 dark:bg-black/50 rounded-md flex items-center justify-center text-2xl">
                                {feature.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                 <button onClick={() => setView('signup')} className="w-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#00DFA2]">
                    Create Account
                </button>
                 <button onClick={() => setView('signin')} className="w-full bg-white/50 dark:bg-neutral-800/50 border-2 border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full shadow-sm hover:bg-gray-100/50 dark:hover:bg-neutral-800 hover:border-[#0079FF] transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]">
                    Sign In
                </button>
                <button onClick={onTakeTour} className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0079FF] rounded-sm">
                    Take the Tour
                </button>
            </div>
        </div>
    );
    
    return (
        <div role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-50/80 dark:bg-black/80 backdrop-blur-md animate-modal-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-md bg-white/80 dark:bg-black/30 backdrop-blur-2xl border-2 border-gray-200 dark:border-neutral-800/50 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col max-h-[90vh] animate-card-fade-in-up" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black" aria-label="Close">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                {view === 'initial' && renderInitialView()}
                {view === 'signin' && renderForm(false)}
                {view === 'signup' && renderForm(true)}
            </div>
        </div>
    );
};

export default AuthModal;
