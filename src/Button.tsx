import React from 'react';
import { cn } from './cn.js';

export type ButtonColor = 'sky' | 'orange' | 'red' | 'green' | 'blue' | 'dark' | 'light';
export type ButtonTextColor = 'white' | 'black';
export type ButtonIconSide = 'left' | 'right';
export type ButtonScheme = 'dark' | 'light';

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconSide?: ButtonIconSide;
};

type SolidButtonProps = ButtonBaseProps & {
  variant?: 'solid';
  color?: ButtonColor;
  textColor?: ButtonTextColor;
};

type TransparentButtonProps = ButtonBaseProps & {
  variant: 'transparent';
  icon?: React.ReactNode;
  iconSide?: ButtonIconSide;
  textColor?: ButtonTextColor;
  scheme?: ButtonScheme;
};

export type ButtonProps = SolidButtonProps | TransparentButtonProps;

const solidColorConfig: Record<ButtonColor, { border: string; from: string; to: string; hoverFrom: string; hoverTo: string }> = {
  sky: {
    border: '#38bdf8',
    from: '#7DD3FC',
    to: '#38BDF8',
    hoverFrom: '#CFEEFC',
    hoverTo: '#38BDF8',
  },
  orange: {
    border: '#f97316',
    from: '#FDBA74',
    to: '#F97316',
    hoverFrom: '#FED7AA',
    hoverTo: '#F97316',
  },
  red: {
    border: '#dc2626',
    from: '#F87171',
    to: '#DC2626',
    hoverFrom: '#FCA5A5',
    hoverTo: '#DC2626',
  },
  green: {
    border: '#22c55e',
    from: '#4ADE80',
    to: '#22C55E',
    hoverFrom: '#86EFAC',
    hoverTo: '#22C55E',
  },
  blue: {
    border: '#3b82f6',
    from: '#93C5FD',
    to: '#3B82F6',
    hoverFrom: '#BFDBFE',
    hoverTo: '#3B82F6',
  },
  dark: {
    border: '#404040',
    from: '#737373',
    to: '#404040',
    hoverFrom: '#A3A3A3',
    hoverTo: '#404040',
  },
  light: {
    border: '#e5e5e5',
    from: '#fafafa',
    to: '#e5e5e5',
    hoverFrom: '#ffffff',
    hoverTo: '#f5f5f5',
  },
};

const textColorConfig: Record<ButtonTextColor, string> = {
  white: '#fafafa',
  black: '#262626',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = 'Button', className, icon, iconSide = 'left', disabled, variant = 'solid', ...props }, ref) => {
    if (variant == "solid") {
      const { color = 'sky', textColor, ...buttonProps } = props as SolidButtonProps;
      const colors = solidColorConfig[color];

      const resolvedTextColor = textColor
        ? textColorConfig[textColor]
        : ['orange', 'red', 'blue', 'light'].includes(color) ? textColorConfig.black : textColorConfig.white;

      return (
        <button
          ref={ref}
          disabled={disabled}
          style={{
            borderColor: colors.border,
            backgroundImage: `linear-gradient(to bottom, ${colors.from}, ${colors.to})`,
            color: resolvedTextColor,
          }}
          className={cn(
            'group',
            'relative overflow-hidden',
            'w-auto min-h-12',
            'px-5 py-3',
            'rounded-xl',
            'border-[1.6px] border-solid',
            'inline-flex items-center justify-center gap-2.5',
            'font-bold text-[16px] leading-5.5 tracking-[-0.112px]',
            'transition-transform duration-100 ease-in-out',
            'active:scale-95',
            'cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed active:scale-100',
            className
          )}
          {...buttonProps}
        >
          {/* Hover gradient overlay */}
          <span
            style={{
              backgroundImage: `linear-gradient(to bottom, ${colors.hoverFrom}, ${colors.hoverTo})`,
            }}
            className={cn(
              'absolute inset-0 ',
              'opacity-0 transition-opacity duration-200 ease-in-out',
              'pointer-events-none',
              !disabled && 'group-hover:opacity-100'
            )}
            aria-hidden="true"
          />
          <span className={cn('relative z-10 flex items-center gap-2.5', iconSide === 'right' && 'flex-row-reverse')}>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
          </span>
        </button>
      );
    }
    if (variant == "transparent") {
      const { scheme = 'light', textColor, ...buttonProps } = props as TransparentButtonProps;
      const hoverClass = scheme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-neutral-100';
      const resolvedTextColor = textColor
        ? textColorConfig[textColor]
        : scheme === 'dark'
          ? textColorConfig.white
          : textColorConfig.black;
      return (
        <button
          ref={ref}
          disabled={disabled}
          style={{
            color: resolvedTextColor,
          }}
          className={cn(
            `${hoverClass} font-bold relative`,
            'overflow-hidden rounded-xl w-auto min-h-12 p-3',
            'transition-colors duration-100 ease-in-out',
            'active:scale-95',
            'cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed active:scale-100',
            className
          )}
          {...buttonProps}
        >
          <span className={cn('relative z-10 flex items-center gap-2.5', iconSide === 'right' && 'flex-row-reverse')}>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
          </span>
        </button>
      );
    }
  }
);

Button.displayName = 'Button';
