import React from 'react';

interface NerdSpecsModalProps {
  onClose: () => void;
}

const NerdSpecsModal: React.FC<NerdSpecsModalProps> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nerd-specs-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-modal-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-black/50 backdrop-blur-xl border-2 border-[#00DFA2]/50 rounded-2xl shadow-2xl p-6 sm:p-8 m-4 animate-card-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="nerd-specs-title" className="text-2xl font-bold text-[#00DFA2] font-mono">
            // EASTER_EGG.LOG
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#0079FF]"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2 font-mono text-green-300 space-y-3 text-sm">
            <p><span className="text-yellow-400">&gt;</span> Booting Nerd Specs...</p>
            <p><span className="text-yellow-400">&gt;</span> Connection established.</p>
            <div className="border-l-2 border-green-500/30 pl-4 space-y-2">
                <p><span className="text-cyan-400">Framework:</span> React v19 (via esm.sh)</p>
                <p><span className="text-cyan-400">Styling:</span> TailwindCSS JIT</p>
                <p><span className="text-cyan-400">State Management:</span> Context API + useReducer Hook</p>
                <p><span className="text-cyan-400">AI Core:</span> Google Gemini API (@google/genai)</p>
                <ul className="list-disc list-inside pl-4 text-green-400">
                    <li><span className="text-purple-400">Text Model:</span> gemini-2.5-flash</li>
                    <li><span className="text-purple-400">Image Model:</span> imagen-4.0-generate-001</li>
                </ul>
                <p><span className="text-cyan-400">Deployment:</span> Serverless (Client-side API calls)</p>
                <p><span className="text-cyan-400">Special Sauce:</span> Haptic feedback, dynamic AI-generated banter, and a sprinkle of cosmic dust.</p>
                <p className="pt-2"><span className="text-pink-500">[WARNING]</span> The AI quizmaster has a 0.001% chance of developing sentience with every question generated. Good luck.</p>
            </div>
            <p><span className="text-yellow-400">&gt;</span> End of transmission.</p>
        </div>
      </div>
    </div>
  );
};

export default NerdSpecsModal;