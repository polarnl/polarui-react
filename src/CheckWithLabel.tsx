import React from 'react';
import { cn } from './cn.js';

export type CheckWithLabelTone = 'sky' | 'orange' | 'red' | 'green' | 'blue' | 'dark' | 'light';
export type CheckWithLabelSize = 'sm' | 'md' | 'lg';

export interface CheckWithLabelProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  invalid?: boolean;
  tone?: CheckWithLabelTone;
  size?: CheckWithLabelSize;
  indeterminate?: boolean;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3.5 8.5L6.5 11.5L12.5 5.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 8H12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const sizeClasses: Record<CheckWithLabelSize, string> = {
  sm: 'size-4 rounded-md',
  md: 'size-5 rounded-md',
  lg: 'size-6 rounded-lg',
};

const iconSizeClasses: Record<CheckWithLabelSize, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
};

const textSizeClasses: Record<CheckWithLabelSize, string> = {
  sm: 'text-sm',
  md: 'text-[15px]',
  lg: 'text-base',
};

const toneClasses: Record<CheckWithLabelTone, { checked: string; icon: string; focus: string }> = {
  sky: {
    checked:
      'peer-checked:border-sky-500 peer-indeterminate:border-sky-500 peer-checked:shadow-[0_2px_0_0_#7DD3FC] peer-indeterminate:shadow-[0_2px_0_0_#7DD3FC]',
    icon: 'peer-checked:text-sky-600 peer-indeterminate:text-sky-600',
    focus: 'peer-focus-visible:ring-sky-500/45',
  },
  orange: {
    checked:
      'peer-checked:border-orange-500 peer-indeterminate:border-orange-500 peer-checked:shadow-[0_2px_0_0_#FDBA74] peer-indeterminate:shadow-[0_2px_0_0_#FDBA74]',
    icon: 'peer-checked:text-orange-600 peer-indeterminate:text-orange-600',
    focus: 'peer-focus-visible:ring-orange-500/45',
  },
  red: {
    checked:
      'peer-checked:border-red-500 peer-indeterminate:border-red-500 peer-checked:shadow-[0_2px_0_0_#FCA5A5] peer-indeterminate:shadow-[0_2px_0_0_#FCA5A5]',
    icon: 'peer-checked:text-red-600 peer-indeterminate:text-red-600',
    focus: 'peer-focus-visible:ring-red-500/45',
  },
  green: {
    checked:
      'peer-checked:border-emerald-500 peer-indeterminate:border-emerald-500 peer-checked:shadow-[0_2px_0_0_#86EFAC] peer-indeterminate:shadow-[0_2px_0_0_#86EFAC]',
    icon: 'peer-checked:text-emerald-600 peer-indeterminate:text-emerald-600',
    focus: 'peer-focus-visible:ring-emerald-500/45',
  },
  blue: {
    checked:
      'peer-checked:border-blue-500 peer-indeterminate:border-blue-500 peer-checked:shadow-[0_2px_0_0_#93C5FD] peer-indeterminate:shadow-[0_2px_0_0_#93C5FD]',
    icon: 'peer-checked:text-blue-600 peer-indeterminate:text-blue-600',
    focus: 'peer-focus-visible:ring-blue-500/45',
  },
  dark: {
    checked:
      'peer-checked:border-zinc-700 peer-indeterminate:border-zinc-700 peer-checked:shadow-[0_2px_0_0_#A1A1AA] peer-indeterminate:shadow-[0_2px_0_0_#A1A1AA]',
    icon: 'peer-checked:text-zinc-800 peer-indeterminate:text-zinc-800',
    focus: 'peer-focus-visible:ring-zinc-500/45',
  },
  light: {
    checked:
      'peer-checked:border-zinc-400 peer-indeterminate:border-zinc-400 peer-checked:shadow-[0_2px_0_0_#D4D4D8] peer-indeterminate:shadow-[0_2px_0_0_#D4D4D8]',
    icon: 'peer-checked:text-zinc-700 peer-indeterminate:text-zinc-700',
    focus: 'peer-focus-visible:ring-zinc-500/45',
  },
};

export const CheckWithLabel = React.forwardRef<HTMLInputElement, CheckWithLabelProps>(
  (
    {
      className,
      id,
      label = 'Checkbox w/ label',
      description,
      error,
      invalid,
      tone,
      size,
      indeterminate = false,
      checked,
      defaultChecked,
      onChange,
      disabled,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const generatedId = React.useId();
    const inputId = id ?? `check-${generatedId}`;
    const hasError = Boolean(invalid || error);
    const resolvedTone = tone ?? 'blue';
    const resolvedSize = size ?? 'md';
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = hasError ? `${inputId}-error` : undefined;
    const describedBy =
      [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
    const checkedState = isControlled ? Boolean(checked) : uncontrolledChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledChecked(event.target.checked);
      }
      onChange?.(event);
    };

    React.useEffect(() => {
      if (!inputRef.current) return;
      inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const toneConfig = toneClasses[resolvedTone];

    return (
      <label
        className={cn(
          'group inline-flex items-start gap-3 align-top',
          disabled ? 'pointer-events-none cursor-not-allowed opacity-60' : 'cursor-pointer',
          className,
        )}
        htmlFor={inputId}
      >
        <input
          id={inputId}
          ref={inputRef}
          type="checkbox"
          checked={checkedState}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-checked={indeterminate ? 'mixed' : checkedState}
          aria-describedby={describedBy}
          className="sr-only peer"
          {...props}
        />
        <span
          className={cn(
            'relative mt-0.5 inline-flex shrink-0 items-center justify-center border-2 border-zinc-300 bg-white text-transparent shadow-[0_2px_0_0_#D4D4D8] transition-all duration-150 ease-in-out group-hover:border-zinc-400 group-hover:bg-zinc-50 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white peer-active:translate-y-px peer-active:shadow-none',
            sizeClasses[resolvedSize],
            toneConfig.checked,
            toneConfig.icon,
            toneConfig.focus,
            hasError &&
              'border-red-300 group-hover:border-red-400 peer-checked:border-red-500 peer-checked:shadow-[0_2px_0_0_#FCA5A5] peer-indeterminate:border-red-500 peer-indeterminate:shadow-[0_2px_0_0_#FCA5A5] peer-checked:text-red-600 peer-indeterminate:text-red-600 peer-focus-visible:ring-red-500/45',
          )}
          aria-hidden="true"
        >
          <span
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-in-out',
              checkedState && !indeterminate ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
              iconSizeClasses[resolvedSize],
            )}
          >
            <CheckIcon className="size-full" />
          </span>
          <span
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-in-out',
              indeterminate ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
              iconSizeClasses[resolvedSize],
            )}
          >
            <IndeterminateIcon className="size-full" />
          </span>
        </span>
        <span className="inline-flex min-w-0 flex-col gap-0.5">
          <span
            className={cn(
              'leading-5 font-semibold text-zinc-900',
              textSizeClasses[resolvedSize],
              disabled && 'text-zinc-500',
            )}
          >
            {label}
          </span>
          {description ? (
            <span id={descriptionId} className="text-sm leading-5 text-zinc-600">
              {description}
            </span>
          ) : null}
          {error ? (
            <span id={errorId} className="text-sm leading-4 font-medium text-red-600">
              {error}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

CheckWithLabel.displayName = 'CheckWithLabel';
