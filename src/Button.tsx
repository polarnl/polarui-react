'use client';

import React from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { cn } from './cn.js';
import {
  getDefaultOnToneText,
  type ColorStep,
  type PaletteTone,
  shiftColorStep,
  toneStepAlphaClass,
  toneStepClass,
} from './color-system.js';

export type ButtonTone = PaletteTone;
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
  toneStep?: ColorStep;
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
      toneStep,
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
    const resolvedToneStep = toneStep ?? 500;
    const resolvedText =
      textColorClasses[textColor ?? getDefaultOnToneText(resolvedTone, resolvedToneStep)];
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

    const hoverStep = shiftColorStep(resolvedToneStep, -1);
    const borderStep = shiftColorStep(resolvedToneStep, 2);
    const ringStep = shiftColorStep(resolvedToneStep, 1);
    const bgClass = toneStepClass('bg', resolvedTone, resolvedToneStep);
    const hoverBgClass = toneStepClass('hover:bg', resolvedTone, hoverStep);
    const borderClass = toneStepClass('border-b', resolvedTone, borderStep);
    const shadowColorClass = toneStepClass('shadow', resolvedTone, borderStep);
    const ringClass = toneStepAlphaClass('focus-visible:ring', resolvedTone, ringStep, 45);

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
      'relative inline-flex items-center justify-center rounded-xl border-b-4 font-bold tracking-wide outline-none transition-all duration-150 ease-in-out active:translate-y-[2px] active:border-b-2 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      'shadow-[0_4px_0_0]',
      bgClass,
      hoverBgClass,
      borderClass,
      shadowColorClass,
      ringClass,
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

    const tapProps =
      !isDisabled && !prefersReducedMotion ? ({ whileTap: { scale: 0.98 } } as const) : undefined;

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
          {...(style
            ? ({ style: style as NonNullable<HTMLMotionProps<'a'>['style']> } as const)
            : {})}
          {...tapProps}
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
        {...(style ? ({ style } as const) : {})}
        {...tapProps}
        className={sharedClassName}
        onClick={handleClick}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
