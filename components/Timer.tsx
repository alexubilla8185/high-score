
import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-yellow-100/50 dark:bg-neutral-900/50 text-yellow-600 dark:text-[#F6FA70] font-mono text-lg py-1 px-3 rounded-md">
      <span>{formatTime(time)}</span>
    </div>
  );
};

export default Timer;