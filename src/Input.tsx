import React from 'react';
import { cn } from './cn.js';

export type InputScheme = 'light' | 'dark';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputIconComponentProps = {
  className?: string;
  size?: string | number;
  'aria-hidden'?: boolean;
};
export type InputIconComponent = React.ComponentType<InputIconComponentProps>;
export type InputIcon = React.ReactNode | InputIconComponent;

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  scheme?: InputScheme;
  size?: InputSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  icon?: InputIcon;
  startIcon?: InputIcon;
  endIcon?: InputIcon;
  inputClassName?: string;
  containerClassName?: string;
}

const schemeClasses: Record<InputScheme, { box: string; icon: string; input: string; focus: string }> = {
  light: {
    box: 'bg-white border-zinc-300 border-b-zinc-400 shadow-[0_2px_0_0_#D4D4D8] hover:border-zinc-400',
    icon: 'text-zinc-500',
    input: 'text-zinc-900 placeholder:text-zinc-400',
    focus: 'focus-within:ring-zinc-400/35 focus-within:ring-offset-white',
  },
  dark: {
    box: 'bg-zinc-800 border-zinc-600 border-b-zinc-700 shadow-[0_2px_0_0_#3F3F46] hover:border-zinc-500',
    icon: 'text-zinc-300',
    input: 'text-zinc-100 placeholder:text-zinc-400',
    focus: 'focus-within:ring-zinc-300/35 focus-within:ring-offset-zinc-900',
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

function isIconComponent(value: InputIcon): value is InputIconComponent {
  if (typeof value === 'function') return true;
  if (typeof value === 'object' && value !== null && '$$typeof' in value) return true;
  return false;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      inputClassName,
      id,
      scheme = 'light',
      size = 'md',
      label,
      description,
      error,
      icon,
      startIcon,
      endIcon,
      disabled,
      readOnly,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `input-${generatedId}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    const schemeConfig = schemeClasses[scheme];
    const sizeConfig = sizeClasses[size];
    const resolvedStartIcon = startIcon ?? icon;
    const hasError = Boolean(error);

    const renderIcon = (iconValue: InputIcon | undefined) => {
      if (!iconValue) return null;
      if (isIconComponent(iconValue)) {
        return React.createElement(iconValue, {
          className: cn('shrink-0', sizeConfig.icon),
          'aria-hidden': true,
        });
      }

      return <span className="shrink-0">{iconValue}</span>;
    };

    return (
      <div className={cn('inline-flex w-80 max-w-full min-w-0 flex-col gap-1.5', className)}>
        {label ? (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-semibold leading-5 break-words',
              scheme === 'dark' ? 'text-zinc-100' : 'text-zinc-900',
              disabled && 'text-zinc-500'
            )}
          >
            {label}
          </label>
        ) : null}

        <div
          className={cn(
            'flex w-full min-w-0 items-center overflow-hidden rounded-xl border-2 border-b-4 transition-all duration-150 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2',
            schemeConfig.box,
            schemeConfig.focus,
            sizeConfig.box,
            hasError &&
              'border-red-400 border-b-red-500 shadow-[0_2px_0_0_#FCA5A5] hover:border-red-500 focus-within:ring-red-500/45',
            readOnly &&
              (scheme === 'dark'
                ? 'bg-zinc-700/70 shadow-none hover:border-zinc-600'
                : 'bg-zinc-100/70 shadow-none hover:border-zinc-300'),
            disabled && 'pointer-events-none cursor-not-allowed opacity-60',
            containerClassName
          )}
        >
          {resolvedStartIcon ? (
            <span className={cn('inline-flex items-center justify-center', hasError ? 'text-red-500' : schemeConfig.icon)}>
              {renderIcon(resolvedStartIcon)}
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
              'min-w-0 flex-1 border-none bg-transparent font-medium leading-5 outline-none',
              'disabled:cursor-not-allowed disabled:text-zinc-500',
              schemeConfig.input,
              sizeConfig.input,
              inputClassName
            )}
            {...props}
          />

          {endIcon ? (
            <span className={cn('inline-flex items-center justify-center', hasError ? 'text-red-500' : schemeConfig.icon)}>
              {renderIcon(endIcon)}
            </span>
          ) : null}
        </div>

        {description ? (
          <p
            id={descriptionId}
            className={cn('text-sm leading-5 break-words', scheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600')}
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
  }
);

Input.displayName = 'Input';
