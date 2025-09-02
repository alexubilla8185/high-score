
import React, { useEffect, useState } from 'react';

interface FeedbackOverlayProps {
  feedback: string;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ feedback }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in on mount
    const timer = setTimeout(() => setShow(true), 50); // Short delay to ensure transition triggers
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role="dialog"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`transition-all duration-500 ease-out transform ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <p className="text-3xl md:text-5xl font-bold text-center text-white max-w-4xl bg-gradient-to-r from-[#0079FF] via-[#00DFA2] to-[#F6FA70] text-transparent bg-clip-text drop-shadow-lg">
          "{feedback}"
        </p>
      </div>
    </div>
  );
};

export default FeedbackOverlay;