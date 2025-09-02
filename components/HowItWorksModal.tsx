import React, { useState } from 'react';

interface HowItWorksModalProps {
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'noobs' | 'nerds'>('noobs');

  const renderContent = () => {
    if (activeTab === 'noobs') {
      return (
        <div className="space-y-4 text-neutral-600 dark:text-neutral-300">
          <p>Welcome to High Score! Here’s the simple version:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Press 'How High':</strong> You'll choose a "vibe" for your quiz—from lighthearted to mind-bending.</li>
            <li><strong>Answer Questions:</strong> You'll get 10 questions. They can be multiple choice, short answer, or even ask you about a trippy AI-generated image.</li>
            <li><strong>Get Witty Feedback:</strong> Sometimes, our AI Quizmaster will have a funny reaction to your short answers. Don't be alarmed, it's friendly. Mostly.</li>
            <li><strong>See Your Score:</strong> At the end, you'll get a score, a title, and some cosmic advice based on how you did.</li>
            <li><strong>Level Up:</strong> If you're feeling it, you can continue to the next vibe for a new challenge!</li>
          </ul>
        </div>
      );
    }
    return (
      <div className="space-y-4 text-neutral-600 dark:text-neutral-300">
        <p>This is a modern web app built with React, TypeScript, and TailwindCSS. It leverages the Google Gemini API for dynamic, AI-powered content.</p>
        <ul className="list-disc list-inside space-y-3 pl-2">
          <li><strong>Architecture:</strong> State is managed globally with React's Context API and a `useReducer` hook for predictable state transitions.</li>
          <li><strong>AI Integration:</strong> We use the `@google/genai` SDK to communicate with the `gemini-2.5-flash` model for generating questions and `imagen-4.0-generate-001` for images.</li>
          <li><strong>Structured Output:</strong> We send a detailed prompt and a `responseSchema` to the Gemini API, forcing it to return a clean JSON array of questions, which we then parse and display. This ensures reliability.</li>
          <li><strong>Resiliency:</strong> Image generation includes a retry mechanism, and if it still fails, it gracefully falls back to a text-based question to ensure the quiz is never broken.</li>
        </ul>
        <div className="pt-4">
          <h4 className="font-semibold text-lg text-teal-600 dark:text-[#00DFA2] mb-2">Simple Changelog</h4>
          <ul className="list-disc list-inside text-sm space-y-1 pl-2">
            <li>v2.5: Implemented the "True Black" dark mode for higher contrast. Revamped the main CTA with a unique, animated gradient. Unified component styling for a more cohesive look.</li>
            <li>v2.0: Major architectural refactor to use a centralized state reducer (useReducer & Context). Added focus-visible states for accessibility, `useMemo` for performance, and retry logic for image generation.</li>
            <li>v1.6: Replaced "How It Works" text link with a floating icon button.</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-it-works-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-modal-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-neutral-800/50 rounded-2xl shadow-2xl p-6 sm:p-8 m-4 animate-card-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="how-it-works-title" className="text-2xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079FF]"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="mb-6 border-b border-gray-200 dark:border-neutral-800">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab('noobs')}
              className={`py-3 px-1 font-medium text-lg border-b-2 transition-colors rounded-t-sm focus:outline-none focus-visible:bg-gray-200 dark:focus-visible:bg-neutral-800 ${
                activeTab === 'noobs' ? 'border-[#0079FF] text-gray-900 dark:text-white' : 'border-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Noobs
            </button>
            <button
              onClick={() => setActiveTab('nerds')}
              className={`py-3 px-1 font-medium text-lg border-b-2 transition-colors rounded-t-sm focus:outline-none focus-visible:bg-gray-200 dark:focus-visible:bg-neutral-800 ${
                activeTab === 'nerds' ? 'border-[#0079FF] text-gray-900 dark:text-white' : 'border-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              Nerds
            </button>
          </nav>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;