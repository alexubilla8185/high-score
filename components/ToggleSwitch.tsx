
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  ariaLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, ariaLabel }) => {
  return (
    <label htmlFor={label} className="flex items-center justify-between cursor-pointer w-full">
      <span className="text-lg font-medium text-gray-900 dark:text-white">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          id={label}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-label={ariaLabel || label}
        />
        <div className={`block w-14 h-8 rounded-full transition-colors ${checked ? 'bg-[#00DFA2]' : 'bg-gray-300 dark:bg-neutral-700'}`}></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
