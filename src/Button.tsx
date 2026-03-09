'use client';

import React from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { cn } from './cn.js';

export type ButtonTone = 'sky' | 'orange' | 'red' | 'green' | 'blue' | 'dark' | 'light';
export type ButtonTextColor = 'white' | 'black';
export type ButtonIconSide = 'left' | 'right';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonElement = 'button' | 'a';
export type ButtonIconComponentProps = {
  className?: string;
  size?: string | number;
  'aria-hidden'?: boolean;
};
export type ButtonIconComponent = React.ComponentType<ButtonIconComponentProps>;
export type ButtonIcon = React.ReactNode | ButtonIconComponent;

interface ButtonBaseProps {
  tone?: ButtonTone;
  textColor?: ButtonTextColor;
  icon?: ButtonIcon;
  iconSize?: number;
  iconClassName?: string;
  iconSide?: ButtonIconSide;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
  spinner?: React.ReactNode;
  children?: React.ReactNode;
  as?: ButtonElement;
}

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<HTMLMotionProps<'button'>, 'ref' | 'color' | 'children' | 'disabled'> & {
    as?: 'button';
    disabled?: boolean;
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<HTMLMotionProps<'a'>, 'ref' | 'color' | 'children'> & {
    as: 'a';
    disabled?: boolean;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const colorClasses: Record<
  ButtonTone,
  { tone: string; focus: string; defaultText: ButtonTextColor }
> = {
  sky: {
    tone: 'bg-sky-400 hover:bg-sky-300 border-b-sky-600 shadow-[0_4px_0_0_#0284C7]',
    focus: 'focus-visible:ring-sky-500/45',
    defaultText: 'white',
  },
  orange: {
    tone: 'bg-orange-500 hover:bg-orange-400 border-b-orange-700 shadow-[0_4px_0_0_#C2410C]',
    focus: 'focus-visible:ring-orange-500/45',
    defaultText: 'white',
  },
  red: {
    tone: 'bg-red-500 hover:bg-red-400 border-b-red-800 shadow-[0_4px_0_0_#991B1B]',
    focus: 'focus-visible:ring-red-500/45',
    defaultText: 'white',
  },
  green: {
    tone: 'bg-emerald-500 hover:bg-emerald-400 border-b-emerald-700 shadow-[0_4px_0_0_#047857]',
    focus: 'focus-visible:ring-emerald-500/45',
    defaultText: 'white',
  },
  blue: {
    tone: 'bg-blue-500 hover:bg-blue-400 border-b-blue-700 shadow-[0_4px_0_0_#1D4ED8]',
    focus: 'focus-visible:ring-blue-500/45',
    defaultText: 'white',
  },
  dark: {
    tone: 'bg-zinc-700 hover:bg-zinc-600 border-b-zinc-900 shadow-[0_4px_0_0_#18181B]',
    focus: 'focus-visible:ring-zinc-400/45',
    defaultText: 'white',
  },
  light: {
    tone: 'bg-zinc-50 hover:bg-white border-b-zinc-300 shadow-[0_4px_0_0_#D4D4D8]',
    focus: 'focus-visible:ring-zinc-500/45',
    defaultText: 'black',
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg font-bold',
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 w-9 p-0',
  md: 'h-11 w-11 p-0',
  lg: 'h-12 w-12 p-0',
};

const iconPixelSizeByButtonSize: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

const textColorClasses: Record<ButtonTextColor, string> = {
  white: 'text-white',
  black: 'text-zinc-900',
};

const defaultSpinner = (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path
      className="opacity-90"
      fill="currentColor"
      d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2z"
    />
  </svg>
);

function isIconComponent(value: ButtonIcon): value is ButtonIconComponent {
  if (typeof value === 'function') return true;
  if (typeof value === 'object' && value !== null && '$$typeof' in value) return true;
  return false;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      as = 'button',
      tone,
      textColor,
      icon,
      iconSize,
      iconClassName,
      iconSide = 'left',
      size = 'md',
      loading = false,
      loadingLabel = 'Loading',
      spinner = defaultSpinner,
      children,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const resolvedTone = tone ?? 'blue';
    const colorConfig = colorClasses[resolvedTone];
    const resolvedText = textColorClasses[textColor ?? colorConfig.defaultText];
    const isDisabled = Boolean(disabled || loading);
    const labelContent = loading ? loadingLabel : children;
    const hasLabel = labelContent !== undefined && labelContent !== null && labelContent !== '';
    const isIconOnly = !hasLabel && Boolean(icon);
    const resolvedIconSize = iconSize ?? iconPixelSizeByButtonSize[size];
    const hasAccessibleName = Boolean(
      (props as { 'aria-label'?: string })['aria-label'] ||
      (props as { 'aria-labelledby'?: string })['aria-labelledby'] ||
      (props as { title?: string }).title,
    );

    React.useEffect(() => {
      if (!isIconOnly) return;
      if (!hasAccessibleName) {
        // eslint-disable-next-line no-console
        console.warn(
          'Button: icon-only buttons should include aria-label, aria-labelledby, or title.',
        );
      }
    }, [hasAccessibleName, isIconOnly]);

    const sharedClassName = cn(
      'relative inline-flex items-center justify-center rounded-xl border-b-4 px-6 py-3 font-bold tracking-wide outline-none transition-all duration-150 ease-in-out active:translate-y-[2px] active:border-b-2 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      colorConfig.tone,
      colorConfig.focus,
      resolvedText,
      isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
      isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
      className,
    );

    const content = (
      <span
        className={cn(
          'inline-flex items-center',
          hasLabel ? 'gap-2.5' : 'gap-0',
          iconSide === 'right' && !loading && 'flex-row-reverse',
        )}
      >
        {loading ? (
          <span className="shrink-0">{spinner}</span>
        ) : icon ? (
          isIconComponent(icon) ? (
            <span className="shrink-0">
              {React.createElement(icon, {
                className: cn('shrink-0', iconClassName),
                size: resolvedIconSize,
                'aria-hidden': true,
              })}
            </span>
          ) : (
            <span className={cn('shrink-0', iconClassName)}>{icon}</span>
          )
        ) : null}
        {hasLabel ? <span>{labelContent}</span> : null}
      </span>
    );

    const motionProps = {
      ...(style ? { style } : {}),
      ...(!isDisabled && !prefersReducedMotion ? { whileTap: { scale: 0.98 } } : {}),
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      (
        props as { onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void }
      ).onClick?.(event);
    };

    if (as === 'a') {
      const { onClick: _userOnClick, ...anchorProps } = props as Omit<
        ButtonAsAnchorProps,
        keyof ButtonBaseProps
      >;

      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-busy={loading || undefined}
          aria-disabled={isDisabled || undefined}
          tabIndex={isDisabled ? -1 : anchorProps.tabIndex}
          {...anchorProps}
          {...motionProps}
          className={sharedClassName}
          onClick={handleClick}
        >
          {content}
        </motion.a>
      );
    }

    const { onClick: _userOnClick, ...buttonProps } = props as Omit<
      ButtonAsButtonProps,
      keyof ButtonBaseProps
    >;

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={(buttonProps as { type?: 'button' | 'submit' | 'reset' }).type ?? 'button'}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...buttonProps}
        {...motionProps}
        className={sharedClassName}
        onClick={handleClick}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
