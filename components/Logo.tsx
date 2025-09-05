import React, { useRef, useEffect } from 'react';

interface LogoProps {
  onTripleClick?: () => void;
  onClick?: () => void;
  className?: string;
  eyesDown?: boolean;
}

const Logo: React.FC<LogoProps> = ({ onTripleClick, onClick, className, eyesDown = false }) => {
  const clickCount = useRef(0);
  const clickTimer = useRef<number | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  const handleWrapperClick = () => {
    clickCount.current += 1;

    // If a multi-click handler exists, use a timeout to differentiate clicks
    if (onTripleClick) {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      // If it's a triple-click, act immediately and cancel any pending single-click.
      if (clickCount.current === 3) {
        onTripleClick();
        clickCount.current = 0; // Reset
        return;
      }
      
      // If it's a single click, set a timer. If another click comes, it will be cancelled.
      clickTimer.current = window.setTimeout(() => {
        if (clickCount.current === 1 && onClick) {
            onClick();
        }
        clickCount.current = 0; // Reset count after the delay
      }, 250); // Standard multi-click time

    } else if (onClick) {
      // If there's no triple-click handler, fire single clicks immediately for responsiveness
      onClick();
    }
  };
  
  const leftEyePath = eyesDown ? "M28 52 C 34 58, 40 58, 46 52" : "M28 50 C 34 44, 40 44, 46 50";
  const rightEyePath = eyesDown ? "M54 52 C 60 58, 66 58, 72 52" : "M54 50 C 60 44, 66 44, 72 50";

  return (
    <div
      onClick={handleWrapperClick}
      className={onClick ? 'cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00DFA2] focus-visible:ring-offset-4 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-black rounded-full' : ''}
      title={onClick ? 'Back to Home / Restart Game' : 'What secrets do you hold?'}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyPress={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
        }
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className || "w-24 h-24 mb-4"}`}
        aria-label="Higher Please Logo"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0079FF" />
            <stop offset="50%" stopColor="#00DFA2" />
            <stop offset="100%" stopColor="#F6FA70" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur">
              {/* Animate the glow effect for the joint tip */}
              <animate 
                attributeName="stdDeviation" 
                values="1.5; 3; 1.5" 
                dur="2s" 
                repeatCount="indefinite"
                begin="0s" 
              />
            </feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Face */}
        <circle cx="50" cy="50" r="48" fill="url(#logo-gradient)" />

        {/* Eyes (happy/high) - with transition */}
        <path d={leftEyePath} stroke="white" strokeWidth="5" strokeLinecap="round" fill="transparent" style={{ transition: 'd 0.3s ease-in-out' }} />
        <path d={rightEyePath} stroke="white" strokeWidth="5" strokeLinecap="round" fill="transparent" style={{ transition: 'd 0.3s ease-in-out' }} />
        
        {/* Mouth (simple smile) */}
        <path d="M35 70 Q 50 85, 65 70" stroke="white" strokeWidth="5" strokeLinecap="round" fill="transparent" />
        
        {/* Joint - Rotated and positioned to come from the side of the smile */}
        <g transform="rotate(15 65 70)">
            {/* Paper */}
            <rect x="65" y="65" width="30" height="10" fill="white" rx="3" />
            {/* Ash/Tip - now with animated glow */}
            <rect x="95" y="65" width="5" height="10" fill="#FF0060" rx="2" filter="url(#glow)" />
        </g>
        
      </svg>
    </div>
  );
};

export default Logo;