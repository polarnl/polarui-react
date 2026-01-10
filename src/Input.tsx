import React from 'react';
import { cn } from './cn.js';

export type InputScheme = 'light' | 'dark';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  scheme?: InputScheme;
  icon?: React.ReactNode;
}

const schemeConfig: Record<InputScheme, { bg: string; border: string; text: string; placeholder: string }> = {
  dark: {
    bg: '#262626',
    border: '#404040',
    text: '#d4d4d4',
    placeholder: '#737373',
  },
  light: {
    bg: '#fafafa',
    border: '#d4d4d4',
    text: '#171717',
    placeholder: '#a3a3a3',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, scheme = 'light', icon, disabled, ...props }, ref) => {
    const colors = schemeConfig[scheme];

    return (
      <div
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
        className={cn(
          'flex items-center gap-3',
          'p-3',
          'rounded-xl',
          'border border-solid',
          'overflow-hidden',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        {icon && (
          <span
            style={{ color: colors.text }}
            className="shrink-0 size-5 flex items-center justify-center"
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          style={{
            color: colors.text,
            backgroundColor: 'transparent',
          }}
          className={cn(
            'flex-1 min-w-0',
            'font-medium text-[16px] leading-5.5 tracking-[-0.112px]',
            'outline-none border-none',
            'placeholder:opacity-60',
            disabled && 'cursor-not-allowed'
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
