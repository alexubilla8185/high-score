
import React, { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';

// Single Toast Component
const Toast: React.FC<{ message: string; type: string; onDismiss: () => void }> = ({ message, type, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(onDismiss, 300); // Match animation duration
      return () => clearTimeout(exitTimer);
    }, 3700); // Start exit animation before it's removed from state

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const bgColor = type === 'error' ? 'bg-pink-600 dark:bg-[#FF0060]' : 'bg-teal-600 dark:bg-[#00DFA2]';

  return (
    <div
      style={{ animation: isExiting ? 'toast-out 0.3s ease forwards' : 'toast-in 0.3s ease forwards' }}
      className={`relative w-full max-w-sm p-4 rounded-xl shadow-2xl text-white ${bgColor} flex items-center justify-between pointer-events-auto`}
      role="alert"
    >
      <p className="font-semibold">{message}</p>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(onDismiss, 300);
        }}
        className="ml-4 p-1 rounded-full hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Dismiss"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
};

// Toast Container Component
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 p-4 sm:p-6 space-y-3 z-[100] pointer-events-none w-full max-w-md">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
