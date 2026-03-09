import React from 'react';
import { cn } from '../utils/cn.js';
import { shiftColorStep, toneStepAlphaClass, toneStepClass } from '../tokens/color.js';
import type { CheckboxProps, CheckboxSize } from '../types/checkbox.js';

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

const sizeClasses: Record<CheckboxSize, string> = {
  sm: 'size-4 aspect-square rounded-md',
  md: 'size-5 aspect-square rounded-md',
  lg: 'size-6 aspect-square rounded-md',
};

const iconSizeClasses: Record<CheckboxSize, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
};

const textSizeClasses: Record<CheckboxSize, string> = {
  sm: 'text-sm',
  md: 'text-[15px]',
  lg: 'text-base',
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      id,
      label = 'Checkbox w/ label',
      description,
      error,
      invalid,
      tone,
      toneStep,
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
    const resolvedToneStep = toneStep ?? 500;
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

    const iconStep = shiftColorStep(resolvedToneStep, 1);
    const shadowStep = shiftColorStep(resolvedToneStep, -2);
    const borderStep = shiftColorStep(resolvedToneStep, 0);
    const ringStep = shiftColorStep(resolvedToneStep, 1);
    const checkedBorderClass = toneStepClass('peer-checked:border', resolvedTone, borderStep);
    const indeterminateBorderClass = toneStepClass(
      'peer-indeterminate:border',
      resolvedTone,
      borderStep,
    );
    const checkedIconClass = toneStepClass('peer-checked:text', resolvedTone, iconStep);
    const indeterminateIconClass = toneStepClass('peer-indeterminate:text', resolvedTone, iconStep);
    const checkedShadowColorClass = toneStepClass('peer-checked:shadow', resolvedTone, shadowStep);
    const indeterminateShadowColorClass = toneStepClass(
      'peer-indeterminate:shadow',
      resolvedTone,
      shadowStep,
    );
    const focusRingClass = toneStepAlphaClass(
      'peer-focus-visible:ring',
      resolvedTone,
      ringStep,
      45,
    );

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
            'relative mt-0.5 inline-flex shrink-0 items-center justify-center border-2 border-zinc-300 bg-white bg-clip-padding text-transparent shadow-[inset_0_-2px_0_0_#D4D4D8] transition-all duration-150 ease-in-out group-hover:border-zinc-400 group-hover:bg-zinc-50 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white peer-active:translate-y-px peer-active:shadow-none',
            'peer-checked:shadow-[inset_0_-2px_0_0] peer-indeterminate:shadow-[inset_0_-2px_0_0]',
            checkedBorderClass,
            indeterminateBorderClass,
            checkedIconClass,
            indeterminateIconClass,
            checkedShadowColorClass,
            indeterminateShadowColorClass,
            focusRingClass,
            sizeClasses[resolvedSize],
            hasError &&
              'border-red-300 group-hover:border-red-400 peer-checked:border-red-500 peer-checked:shadow-[inset_0_-2px_0_0_#FCA5A5] peer-indeterminate:border-red-500 peer-indeterminate:shadow-[inset_0_-2px_0_0_#FCA5A5] peer-checked:text-red-600 peer-indeterminate:text-red-600 peer-focus-visible:ring-red-500/45',
          )}
          aria-hidden="true"
        >
          <span
            className={cn(
              'pointer-events-none absolute left-1/2 top-[calc(50%-1px)] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-in-out',
              checkedState && !indeterminate ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
              iconSizeClasses[resolvedSize],
            )}
          >
            <CheckIcon className="size-full" />
          </span>
          <span
            className={cn(
              'pointer-events-none absolute left-1/2 top-[calc(50%-1px)] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-in-out',
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

Checkbox.displayName = 'Checkbox';
