import React from 'react';
import { cn } from './cn.js';

export interface CheckWithLabelProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <path
      d="M1 4L3.5 6.5L9 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckWithLabel = React.forwardRef<HTMLInputElement, CheckWithLabelProps>(
  ({ className, label = 'Checkbox w/ label', checked, defaultChecked, onChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);

    // Use controlled or uncontrolled pattern
    const checkedState = checked !== undefined ? checked : isChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        className={cn(
          'inline-flex items-center gap-2 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checkedState}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <span
          className={cn(
            'relative shrink-0 size-4 rounded-md overflow-hidden transition-colors duration-150',
            checkedState
              ? 'bg-[#38bdf8] text-[#171717]'
              : 'border-2 border-[#38bdf8] bg-transparent'
          )}
        >
          {checkedState && <CheckIcon />}
        </span>
        <span className="font-semibold text-[14px] leading-5 tracking-[-0.084px] text-[#171717]">
          {label}
        </span>
      </label>
    );
  }
);

CheckWithLabel.displayName = 'CheckWithLabel';
