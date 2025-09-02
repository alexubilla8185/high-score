import React, { useRef, useEffect } from 'react';

interface LogoProps {
  onTripleClick?: () => void;
  onClick?: () => void;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ onTripleClick, onClick, className }) => {
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

  const handleClick = () => {
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
  
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
      title={onClick ? 'Back to Home' : 'What secrets do you hold?'}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className || "w-24 h-24 mb-4"}
        aria-label="High Score Logo"
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

        {/* Eyes (happy/high) - Changed from droopy to happy arcs */}
        <path d="M28 50 C 34 44, 40 44, 46 50" stroke="white" strokeWidth="5" strokeLinecap="round" fill="transparent" />
        <path d="M54 50 C 60 44, 66 44, 72 50" stroke="white" strokeWidth="5" strokeLinecap="round" fill="transparent" />
        
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