'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from './cn.js';

export type ButtonColor = 'sky' | 'orange' | 'red' | 'green' | 'blue' | 'dark' | 'light';
export type ButtonTextColor = 'white' | 'black';
export type ButtonIconSide = 'left' | 'right';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'color'> {
  color?: ButtonColor;
  textColor?: ButtonTextColor;
  icon?: React.ReactNode;
  iconSide?: ButtonIconSide;
  size?: ButtonSize;
  children?: React.ReactNode;
}

const colorClasses: Record<ButtonColor, { tone: string; defaultText: ButtonTextColor }> = {
  sky: {
    tone: 'bg-sky-400 hover:bg-sky-300 border-b-sky-600 shadow-[0_4px_0_0_#0284C7]',
    defaultText: 'white',
  },
  orange: {
    tone: 'bg-orange-500 hover:bg-orange-400 border-b-orange-700 shadow-[0_4px_0_0_#C2410C]',
    defaultText: 'white',
  },
  red: {
    tone: 'bg-red-500 hover:bg-red-400 border-b-red-800 shadow-[0_4px_0_0_#991B1B]',
    defaultText: 'white',
  },
  green: {
    tone: 'bg-emerald-500 hover:bg-emerald-400 border-b-emerald-700 shadow-[0_4px_0_0_#047857]',
    defaultText: 'white',
  },
  blue: {
    tone: 'bg-blue-500 hover:bg-blue-400 border-b-blue-700 shadow-[0_4px_0_0_#1D4ED8]',
    defaultText: 'white',
  },
  dark: {
    tone: 'bg-zinc-700 hover:bg-zinc-600 border-b-zinc-900 shadow-[0_4px_0_0_#18181B]',
    defaultText: 'white',
  },
  light: {
    tone: 'bg-zinc-50 hover:bg-white border-b-zinc-300 shadow-[0_4px_0_0_#D4D4D8]',
    defaultText: 'black',
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg font-bold',
};

const textColorClasses: Record<ButtonTextColor, string> = {
  white: 'text-white',
  black: 'text-zinc-900',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = 'blue',
      textColor,
      icon,
      iconSide = 'left',
      size = 'md',
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const colorConfig = colorClasses[color];
    const resolvedText = textColorClasses[textColor ?? colorConfig.defaultText];

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        {...(style ? { style } : {})}
        {...(!disabled && { whileTap: { scale: 0.98 } })}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl border-b-4 px-6 py-3 font-bold tracking-wide outline-none transition-all duration-150 ease-in-out active:translate-y-[2px] active:border-b-2 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          colorConfig.tone,
          resolvedText,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <span className={cn('inline-flex items-center gap-2.5', iconSide === 'right' && 'flex-row-reverse')}>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
