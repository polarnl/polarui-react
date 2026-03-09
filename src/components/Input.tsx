import React from 'react';
import type {
  InputIcon,
  InputIconComponent,
  InputIconNode,
  InputProps,
  InputSize,
  InputVariant,
} from '../types/input.js';
import { cn } from '../utils/cn.js';
import { shiftColorStep, toneStepAlphaClass, toneStepClass } from '../tokens/color.js';

const schemeClasses: Record<
  InputVariant,
  { box: string; icon: string; input: string; focus: string }
> = {
  light: {
    box: 'bg-white border-zinc-300 shadow-[inset_0_-4px_0_0_#D4D4D8,0_10px_18px_-16px_rgba(15,23,42,0.45)]',
    icon: 'text-zinc-500',
    input: 'text-zinc-900 placeholder:text-zinc-400',
    focus: 'focus-within:ring-offset-white',
  },
  dark: {
    box: 'bg-zinc-800 border-zinc-600 shadow-[inset_0_-4px_0_0_#52525B,0_10px_18px_-16px_rgba(0,0,0,0.7)]',
    icon: 'text-zinc-300',
    input: 'text-zinc-100 placeholder:text-zinc-400',
    focus: 'focus-within:ring-offset-zinc-900',
  },
};

const sizeClasses: Record<InputSize, { box: string; icon: string; input: string }> = {
  sm: {
    box: 'h-10 px-3 gap-2',
    icon: 'size-4',
    input: 'text-sm',
  },
  md: {
    box: 'h-11 px-3.5 gap-2.5',
    icon: 'size-[18px]',
    input: 'text-base',
  },
  lg: {
    box: 'h-12 px-4 gap-3',
    icon: 'size-5',
    input: 'text-base',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      inputClassName,
      id,
      variant,
      tone,
      toneStep,
      size = 'md',
      label,
      description,
      error,
      invalid,
      icon,
      iconNode,
      startIcon,
      startIconNode,
      endIcon,
      endIconNode,
      disabled,
      readOnly,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `input-${generatedId}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy =
      [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    const resolvedVariant = variant ?? 'light';
    const resolvedTone = tone ?? 'blue';
    const resolvedToneStep = toneStep ?? 500;
    const schemeConfig = schemeClasses[resolvedVariant];
    const sizeConfig = sizeClasses[size];
    const resolvedStartIconComponent = startIcon ?? icon;
    const resolvedStartIconNode = startIconNode ?? iconNode;
    const resolvedEndIconComponent = endIcon;
    const resolvedEndIconNode = endIconNode;
    const hasError = Boolean(invalid || error);
    const focusStep = shiftColorStep(resolvedToneStep, 1);
    const hoverBorderStep = shiftColorStep(resolvedToneStep, 2);
    const focusRingClass = toneStepAlphaClass('focus-within:ring', resolvedTone, focusStep, 40);
    const hoverBorderClass = toneStepClass('hover:border', resolvedTone, hoverBorderStep);

    const renderIcon = (
      iconCmp: InputIconComponent | undefined,
      node: InputIconNode | undefined,
    ): React.ReactNode => {
      if (iconCmp) {
        return React.createElement(iconCmp, {
          className: cn('shrink-0', sizeConfig.icon),
          'aria-hidden': true,
        });
      }

      if (!node) return null;
      return <span className="shrink-0">{node}</span>;
    };

    return (
      <div className={cn('inline-flex w-80 max-w-full min-w-0 flex-col gap-1.5', className)}>
        {label ? (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-semibold leading-5 break-words',
              resolvedVariant === 'dark' ? 'text-zinc-100' : 'text-zinc-900',
              disabled && 'text-zinc-500',
            )}
          >
            {label}
          </label>
        ) : null}

        <div
          className={cn(
            'min-w-0 rounded-xl border-2 bg-clip-padding transition-all duration-150 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 flex w-full items-center',
            schemeConfig.box,
            schemeConfig.focus,
            sizeConfig.box,
            focusRingClass,
            hoverBorderClass,
            hasError &&
              'border-red-400 shadow-[inset_0_-4px_0_0_#FCA5A5,0_10px_18px_-16px_rgba(127,29,29,0.45)] hover:border-red-500 focus-within:ring-red-500/45',
            readOnly &&
              (resolvedVariant === 'dark'
                ? 'bg-zinc-700/70 shadow-none hover:border-zinc-600'
                : 'bg-zinc-100/70 shadow-none hover:border-zinc-300'),
            disabled && 'pointer-events-none cursor-not-allowed opacity-60',
            containerClassName,
          )}
        >
          {resolvedStartIconComponent || resolvedStartIconNode ? (
            <span
              className={cn(
                'relative -translate-y-0.5 inline-flex items-center justify-center',
                hasError ? 'text-red-500' : schemeConfig.icon,
              )}
            >
              {renderIcon(resolvedStartIconComponent, resolvedStartIconNode)}
            </span>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            type={props.type ?? 'text'}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              'relative -translate-y-0.5 min-w-0 flex-1 border-none bg-transparent font-medium leading-5 outline-none',
              'disabled:cursor-not-allowed disabled:text-zinc-500',
              schemeConfig.input,
              sizeConfig.input,
              inputClassName,
            )}
            {...props}
          />

          {resolvedEndIconComponent || resolvedEndIconNode ? (
            <span
              className={cn(
                'relative -translate-y-0.5 inline-flex items-center justify-center',
                hasError ? 'text-red-500' : schemeConfig.icon,
              )}
            >
              {renderIcon(resolvedEndIconComponent, resolvedEndIconNode)}
            </span>
          ) : null}
        </div>

        {description ? (
          <p
            id={descriptionId}
            className={cn(
              'text-sm leading-5 break-words',
              resolvedVariant === 'dark' ? 'text-zinc-400' : 'text-zinc-600',
            )}
          >
            {description}
          </p>
        ) : null}

        {error ? (
          <p id={errorId} className="text-sm font-medium leading-5 text-red-600 break-words">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
