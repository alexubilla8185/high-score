
import React from 'react';
import Logo from './Logo';
import { useToast } from '../context/ToastContext';

interface LandingPageProps {
  onEnterApp: () => void;
  onPlayDemo: () => void;
  onTakeTour: () => void;
}

const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500/20 to-blue-500/20 text-[#00DFA2] rounded-lg flex items-center justify-center shadow-inner">
      <div className="w-14 h-14 bg-white/80 dark:bg-black/50 rounded-md flex items-center justify-center text-3xl">
          {children}
      </div>
  </div>
);

const StrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 14C9.5 14 7 12 7 9C7 6 9.5 4 11 4C12.5 4 15 6 15 9C15 12 12.5 14 11 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 4V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 14V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5 11.5L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 6.5L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LyricIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M9 18V5L20 3V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 19C18.6569 19 20 17.6569 20 16C20 14.3431 18.6569 13 17 13C15.3431 13 14 14.3431 14 16C14 17.6569 15.3431 19 17 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MunchieIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M5 13L19 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4.5 18H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10C5 6.68629 7.68629 4 11 4H13C16.3137 4 19 6.68629 19 10V10H5V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 16L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 16L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);


const comingSoonGames = [
    {
        icon: <StrainIcon />,
        title: 'Guess the Strain',
        description: 'Match the bud to the iconic name.'
    },
    {
        icon: <LyricIcon />,
        title: 'Finish the Lyric',
        description: 'Test your knowledge of stoner anthems.'
    },
    {
        icon: <MunchieIcon />,
        title: 'The Munchie Mashup',
        description: 'Invent a dish from random ingredients.'
    }
];

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onPlayDemo, onTakeTour }) => {
  const { addToast } = useToast();

  const handleWaitlistSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
    if (emailInput.value) {
      addToast("You're on the list! We'll keep you posted.", 'success');
      emailInput.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center flex flex-col items-center justify-center pt-16 pb-20 animate-card-fade-in-up">
        <Logo className="w-40 h-40 sm:w-48 sm:h-48 mb-6" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
          Test Your Vibe.
        </h1>
        <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 mb-10">
          An AI-powered quiz that generates surreal and funny questions to see how high your consciousness can fly. Are you buzzed, toasted, or a cosmic voyager?
        </p>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <button
            onClick={onEnterApp}
            className="w-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-black dark:text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00DFA2]/40 dark:hover:shadow-[#00DFA2]/30 hover:scale-105 transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#00DFA2]"
          >
            Enter App
          </button>
          <button
            onClick={onPlayDemo}
            className="w-full bg-white/50 dark:bg-neutral-800/50 border-2 border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-white font-bold py-4 px-8 rounded-full shadow-sm hover:bg-gray-100/50 dark:hover:bg-neutral-800 hover:border-[#0079FF] transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
          >
            Play Demo
          </button>
           <button onClick={onTakeTour} className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0079FF] rounded-sm">
              Or, see how it works first
            </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-20 border-t border-gray-200 dark:border-neutral-800/50">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-600 dark:text-[#00DFA2]">A Quiz Unlike Any Other</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center animate-content-fade-in p-6 rounded-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-500/5 dark:from-[#0079FF]/20 to-transparent border border-gray-200/50 dark:border-neutral-800 hover:border-blue-400/50 dark:hover:border-[#0079FF]/50" style={{ animationDelay: '200ms' }}>
            <FeatureIcon>🧠</FeatureIcon>
            <h3 className="text-xl font-bold mt-4 mb-2">Infinite Questions</h3>
            <p className="text-neutral-600 dark:text-neutral-300">Powered by Google's Gemini AI, every quiz is completely unique. Never see the same question twice.</p>
          </div>
          <div className="flex flex-col items-center animate-content-fade-in p-6 rounded-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-teal-500/5 dark:from-[#00DFA2]/20 to-transparent border border-gray-200/50 dark:border-neutral-800 hover:border-teal-400/50 dark:hover:border-[#00DFA2]/50" style={{ animationDelay: '400ms' }}>
            <FeatureIcon>🎶</FeatureIcon>
            <h3 className="text-xl font-bold mt-4 mb-2">Themed Spirit Guides</h3>
            <p className="text-neutral-600 dark:text-neutral-300">Choose your vibe with guides like Bob Marley and Snoop Dogg for a specially tailored quiz experience.</p>
          </div>
          <div className="flex flex-col items-center animate-content-fade-in p-6 rounded-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-yellow-500/5 dark:from-[#F6FA70]/20 to-transparent border border-gray-200/50 dark:border-neutral-800 hover:border-yellow-400/50 dark:hover:border-[#F6FA70]/50" style={{ animationDelay: '600ms' }}>
            <FeatureIcon>🤖</FeatureIcon>
            <h3 className="text-xl font-bold mt-4 mb-2">Witty AI Banter</h3>
            <p className="text-neutral-600 dark:text-neutral-300">Our AI quizmaster reacts to your answers with clever, custom-generated feedback. It's a conversation.</p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="w-full max-w-5xl py-20 border-t border-gray-200 dark:border-neutral-800/50">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-500 dark:text-neutral-400">Freshly Rolled Features</h2>
        <p className="text-center text-neutral-600 dark:text-neutral-300 mb-12 max-w-2xl mx-auto">Here's a sneak peek at the new mini-games currently in development. Sign up for the waitlist below to be notified when they drop.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {comingSoonGames.map((game, index) => (
            <div
              key={index}
              className="w-full p-6 bg-white/30 dark:bg-neutral-900/40 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-2xl text-center flex flex-col items-center justify-start animate-content-fade-in opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-105 hover:border-solid hover:border-[#00DFA2]"
              style={{ animationDelay: `${200 + index * 200}ms` }}
              aria-label={`${game.title} - Coming Soon`}
            >
              <div className="flex-shrink-0 text-neutral-500 dark:text-neutral-400 transition-colors text-3xl mb-3">{game.icon}</div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">{game.title}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{game.description}</p>
                <span className="mt-4 inline-block bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">COMING SOON</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="w-full max-w-3xl py-20 border-t border-gray-200 dark:border-neutral-800/50 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
        <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-xl mx-auto">Be the first to know about new features, mini-games, and special events. We're just getting started.</p>
        <form onSubmit={handleWaitlistSubmit} className="max-w-xl mx-auto w-full">
          <div className="relative p-1 rounded-full cta-button bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] shadow-lg">
            <div className="flex items-center bg-white dark:bg-black rounded-full transition-colors duration-300">
              <div className="pl-5 pr-2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                <MailIcon />
              </div>
              <input
                type="email"
                name="email"
                placeholder="your.email@cosmic.net"
                required
                className="flex-grow w-full py-4 bg-transparent text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-0 border-none"
              />
              <button 
                type="submit" 
                className="m-1 flex-shrink-0 cta-button bg-gradient-to-r from-[#0079FF] to-[#00DFA2] text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-all transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black dark:focus-visible:ring-offset-black focus-visible:ring-[#00DFA2]"
              >
                Get Notified
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LandingPage;
