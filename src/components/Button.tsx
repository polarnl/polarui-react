'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type {
  ButtonAsAnchorProps,
  ButtonAsButtonProps,
  ButtonBaseProps,
  ButtonIcon,
  ButtonIconNode,
  ButtonProps,
  ButtonSize,
  ButtonTextColor,
} from '../types/button.js';
import { cn } from '../utils/cn.js';
import {
  getDefaultOnToneText,
  shiftColorStep,
  toneStepAlphaClass,
  toneStepClass,
} from '../tokens/color.js';

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

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      as = 'button',
      tone,
      toneStep,
      textColor: textColorProp,
      icon,
      iconNode,
      iconSize,
      iconClassName,
      iconSide = 'left',
      size: sizeProp,
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
    const resolvedSize: ButtonSize = sizeProp ?? 'md';
    const resolvedTextColor: ButtonTextColor =
      textColorProp ?? getDefaultOnToneText(resolvedTone, resolvedToneStep);
    const resolvedText = textColorClasses[resolvedTextColor];
    const isDisabled = Boolean(disabled || loading);
    const labelContent = loading ? loadingLabel : children;
    const hasLabel = labelContent !== undefined && labelContent !== null && labelContent !== '';
    const resolvedIconComponent = icon as ButtonIcon | undefined;
    const resolvedIconNode = iconNode as ButtonIconNode | undefined;
    const isIconOnly = !hasLabel && Boolean(resolvedIconComponent || resolvedIconNode);
    const resolvedIconSize = iconSize ?? iconPixelSizeByButtonSize[resolvedSize];
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
      'relative inline-flex items-center justify-center rounded-xl bg-clip-padding font-bold tracking-wide outline-none transition-[transform,box-shadow,filter] duration-150 ease-in-out active:translate-y-[3px] active:shadow-[inset_0_-1px_0_0] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      'shadow-[inset_0_-5px_0_0]',
      bgClass,
      hoverBgClass,
      shadowColorClass,
      ringClass,
      resolvedText,
      isIconOnly ? iconOnlySizeClasses[resolvedSize] : sizeClasses[resolvedSize],
      isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
      className,
    );

    const content = (
      <span
        className={cn(
          'relative -translate-y-0.5 inline-flex items-center',
          hasLabel ? 'gap-2.5' : 'gap-0',
          iconSide === 'right' && !loading && 'flex-row-reverse',
        )}
      >
        {loading ? (
          <span className="shrink-0">{spinner}</span>
        ) : resolvedIconComponent ? (
          <span className="shrink-0">
            {React.createElement(resolvedIconComponent, {
              className: cn('shrink-0', iconClassName),
              size: resolvedIconSize,
              'aria-hidden': true,
            })}
          </span>
        ) : resolvedIconNode ? (
          <span className={cn('shrink-0', iconClassName)}>{resolvedIconNode}</span>
        ) : null}
        {hasLabel ? <span>{labelContent}</span> : null}
      </span>
    );

    const tapProps =
      !isDisabled && !prefersReducedMotion
        ? ({
            whileTap: { scale: 0.992, y: 2 },
            transition: { type: 'spring', stiffness: 560, damping: 34, mass: 0.28 },
          } as const)
        : undefined;

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
