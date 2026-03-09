import React from 'react';
import { isIconComponent as isUiIconComponent } from '../types/icon.js';
import type {
  RadioGroupIcon,
  RadioGroupProps,
  RadioGroupSize,
  RadioGroupVariant,
  RadioOption,
} from '../types/radio.js';
import { cn } from '../utils/cn.js';
import { resolveToneColor, shiftColorStep, withAlpha } from '../tokens/color.js';

const schemeClasses: Record<
  RadioGroupVariant,
  {
    title: string;
    helperText: string;
    optionSurface: string;
    optionDescription: string;
    optionIcon: string;
    indicator: string;
    focusOffset: string;
    emptyState: string;
  }
> = {
  light: {
    title: 'text-zinc-900',
    helperText: 'text-zinc-600',
    optionSurface:
      'border-zinc-300 bg-white text-zinc-900 shadow-[inset_0_-3px_0_0_#D4D4D8,0_10px_18px_-16px_rgba(15,23,42,0.45)]',
    optionDescription: 'text-zinc-600',
    optionIcon: 'text-zinc-500',
    indicator: 'border-zinc-300 bg-white',
    focusOffset: 'peer-focus-visible:ring-offset-white',
    emptyState: 'border-zinc-300 bg-zinc-50 text-zinc-500',
  },
  dark: {
    title: 'text-zinc-100',
    helperText: 'text-zinc-400',
    optionSurface:
      'border-zinc-600 bg-zinc-800 text-zinc-100 shadow-[inset_0_-3px_0_0_#52525B,0_10px_18px_-16px_rgba(0,0,0,0.72)]',
    optionDescription: 'text-zinc-400',
    optionIcon: 'text-zinc-300',
    indicator: 'border-zinc-500 bg-zinc-800',
    focusOffset: 'peer-focus-visible:ring-offset-zinc-900',
    emptyState: 'border-zinc-600 bg-zinc-800 text-zinc-400',
  },
};

const sizeClasses: Record<
  RadioGroupSize,
  {
    option: string;
    label: string;
    description: string;
    indicator: string;
    dot: string;
    icon: string;
    iconPx: number;
  }
> = {
  sm: {
    option: 'px-3 py-2 gap-2.5',
    label: 'text-sm leading-5',
    description: 'text-xs leading-4',
    indicator: 'size-[18px]',
    dot: 'size-2',
    icon: 'size-4',
    iconPx: 16,
  },
  md: {
    option: 'px-3.5 py-2.5 gap-3',
    label: 'text-[15px] leading-5',
    description: 'text-sm leading-5',
    indicator: 'size-[22px]',
    dot: 'size-2.5',
    icon: 'size-[18px]',
    iconPx: 18,
  },
  lg: {
    option: 'px-4 py-3 gap-3.5',
    label: 'text-base leading-6',
    description: 'text-sm leading-5',
    indicator: 'size-[26px]',
    dot: 'size-3',
    icon: 'size-5',
    iconPx: 20,
  },
};

function getFirstEnabledIndex(options: RadioOption[], groupDisabled: boolean): number {
  return options.findIndex((option) => !groupDisabled && !option.disabled);
}

function getLastEnabledIndex(options: RadioOption[], groupDisabled: boolean): number {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!groupDisabled && !options[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function findNextEnabledIndex(
  options: RadioOption[],
  start: number,
  direction: 1 | -1,
  groupDisabled: boolean,
  loop: boolean,
): number {
  if (!options.length) return -1;

  let index = start;

  for (let step = 0; step < options.length; step += 1) {
    index += direction;

    if (loop) {
      if (index < 0) index = options.length - 1;
      if (index >= options.length) index = 0;
    } else if (index < 0 || index >= options.length) {
      return -1;
    }

    const option = options[index];
    if (!groupDisabled && option && !option.disabled) {
      return index;
    }
  }

  return -1;
}

function renderRadioIcon(icon: RadioGroupIcon | undefined, className: string, size: number): React.ReactNode {
  if (!icon) return null;
  if (isUiIconComponent(icon)) {
    return React.createElement(icon, { className, size, 'aria-hidden': true });
  }

  return <span className={className}>{icon}</span>;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      id,
      name,
      options,
      value,
      defaultValue,
      onValueChange,
      onChange,
      label,
      description,
      subtext,
      error,
      invalid,
      required,
      disabled = false,
      readOnly = false,
      variant = 'light',
      tone = 'blue',
      toneStep = 500,
      size = 'md',
      orientation = 'vertical',
      loop = true,
      allowDeselect = false,
      iconPosition = 'left',
      noOptionsMessage = 'No options available',
      hideIndicator = false,
      className,
      style,
      listClassName,
      optionClassName,
      indicatorClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const groupId = id ?? `radio-${generatedId}`;
    const groupName = name ?? `${groupId}-name`;
    const groupLabelId = label ? `${groupId}-label` : undefined;
    const resolvedSubtext = description ?? subtext;
    const descriptionId = resolvedSubtext ? `${groupId}-description` : undefined;
    const hasError = Boolean(invalid || error);
    const errorId = hasError ? `${groupId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    const labelledBy = [ariaLabelledBy, groupLabelId].filter(Boolean).join(' ') || undefined;
    const resolvedAriaLabel = labelledBy ? undefined : ariaLabel;
    const schemeConfig = schemeClasses[variant];
    const sizeConfig = sizeClasses[size];
    const optionRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const selectedValue = isControlled ? value : uncontrolledValue;

    const selectedBorderStep = shiftColorStep(toneStep, 0);
    const selectedDotStep = shiftColorStep(toneStep, 1);
    const selectedShadowStep = shiftColorStep(toneStep, -2);
    const hoverBorderStep = shiftColorStep(toneStep, 2);
    const ringStep = shiftColorStep(toneStep, 1);

    const toneStyle = {
      '--polarui-radio-selected-border': resolveToneColor(tone, selectedBorderStep),
      '--polarui-radio-selected-dot': resolveToneColor(tone, selectedDotStep),
      '--polarui-radio-selected-shadow': resolveToneColor(tone, selectedShadowStep),
      '--polarui-radio-selected-bg': withAlpha(resolveToneColor(tone, toneStep), 14),
      '--polarui-radio-hover-border': resolveToneColor(tone, hoverBorderStep),
      '--polarui-radio-ring': withAlpha(resolveToneColor(tone, ringStep), 45),
      '--tw-ring-color': 'var(--polarui-radio-ring)',
    } as React.CSSProperties & Record<string, string>;
    const mergedStyle = {
      ...toneStyle,
      ...(style ?? {}),
    } as React.CSSProperties;

    const firstEnabledIndex = getFirstEnabledIndex(options, disabled);
    const checkedEnabledIndex = options.findIndex(
      (option) => option.value === selectedValue && !disabled && !option.disabled,
    );
    const tabStopIndex = checkedEnabledIndex >= 0 ? checkedEnabledIndex : firstEnabledIndex;

    const commitSelection = React.useCallback(
      (nextOption: RadioOption) => {
        if (!isControlled) {
          setUncontrolledValue(nextOption.value);
        }
        onValueChange?.(nextOption.value, nextOption);
      },
      [isControlled, onValueChange],
    );

    const clearSelection = React.useCallback(
      (currentOption: RadioOption) => {
        if (!isControlled) {
          setUncontrolledValue('');
        }
        onValueChange?.('', currentOption);
      },
      [isControlled, onValueChange],
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, option: RadioOption) => {
      if (disabled || option.disabled) {
        event.preventDefault();
        return;
      }

      if (readOnly) {
        event.preventDefault();
        return;
      }

      commitSelection(option);
      onChange?.(event);
    };

    const handleInputClick = (
      event: React.MouseEvent<HTMLInputElement>,
      option: RadioOption,
      isSelected: boolean,
    ) => {
      if (disabled || option.disabled || readOnly) {
        event.preventDefault();
        return;
      }

      if (allowDeselect && !required && isSelected) {
        event.preventDefault();
        clearSelection(option);
      }
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (disabled || options[index]?.disabled) return;

      if (readOnly && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        return;
      }

      let nextIndex = -1;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          nextIndex = findNextEnabledIndex(options, index, 1, disabled, loop);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          nextIndex = findNextEnabledIndex(options, index, -1, disabled, loop);
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = getFirstEnabledIndex(options, disabled);
          break;
        case 'End':
          event.preventDefault();
          nextIndex = getLastEnabledIndex(options, disabled);
          break;
        default:
          break;
      }

      if (nextIndex < 0) return;

      const nextOption = options[nextIndex];
      if (!nextOption) return;

      if (!readOnly) {
        commitSelection(nextOption);
      }

      optionRefs.current[nextIndex]?.focus();
    };

    return (
      <div
        ref={ref}
        style={mergedStyle}
        className={cn('inline-flex w-80 max-w-full min-w-0 flex-col gap-1.5', className)}
        {...restProps}
      >
        {label ? (
          <p
            id={groupLabelId}
            className={cn('text-sm font-semibold leading-5 break-words', schemeConfig.title, labelClassName)}
          >
            {label}
            {required ? <span className="ml-1 text-red-500">*</span> : null}
          </p>
        ) : null}

        <div
          role="radiogroup"
          aria-labelledby={labelledBy}
          aria-label={resolvedAriaLabel}
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          aria-readonly={readOnly || undefined}
          className={cn(
            'min-w-0',
            orientation === 'horizontal' ? 'flex flex-wrap items-stretch gap-2' : 'flex flex-col gap-2',
            listClassName,
          )}
        >
          {options.length ? (
            options.map((option, index) => {
              const optionDisabled = Boolean(disabled || option.disabled);
              const isSelected = option.value === selectedValue;
              const optionId = `${groupId}-option-${index}`;
              const optionSubtext = option.description ?? option.subtext;
              const optionDescriptionId = optionSubtext ? `${optionId}-description` : undefined;
              const icon = renderRadioIcon(
                option.icon,
                cn(
                  sizeConfig.icon,
                  isSelected && !hasError
                    ? 'text-[var(--polarui-radio-selected-dot)]'
                    : schemeConfig.optionIcon,
                ),
                sizeConfig.iconPx,
              );

              return (
                <label
                  key={option.value}
                  htmlFor={optionId}
                  className={cn(
                    'min-w-0',
                    orientation === 'horizontal' ? 'min-w-[12rem] flex-1' : 'w-full',
                    optionDisabled ? 'pointer-events-none cursor-not-allowed opacity-60' : 'cursor-pointer',
                    readOnly && !optionDisabled && 'cursor-default',
                  )}
                >
                  <input
                    id={optionId}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type="radio"
                    name={groupName}
                    value={option.value}
                    checked={isSelected}
                    required={required}
                    disabled={optionDisabled}
                    tabIndex={index === tabStopIndex ? 0 : -1}
                    aria-describedby={optionDescriptionId}
                    className="peer sr-only"
                    onChange={(event) => handleInputChange(event, option)}
                    onClick={(event) => handleInputClick(event, option, isSelected)}
                    onKeyDown={(event) => handleInputKeyDown(event, index)}
                  />

                  <span
                    className={cn(
                      'min-w-0 relative flex w-full items-start rounded-xl border-2 bg-clip-padding transition-all duration-150 ease-in-out peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--polarui-radio-ring)] peer-focus-visible:ring-offset-2',
                      sizeConfig.option,
                      schemeConfig.optionSurface,
                      schemeConfig.focusOffset,
                      !hasError &&
                        !isSelected &&
                        !optionDisabled &&
                        'hover:border-[var(--polarui-radio-hover-border)]',
                      !hasError &&
                        isSelected &&
                        'border-[var(--polarui-radio-selected-border)] bg-[var(--polarui-radio-selected-bg)] shadow-[inset_0_-3px_0_0_var(--polarui-radio-selected-shadow)]',
                      hasError &&
                        !isSelected &&
                        'border-red-300 hover:border-red-400',
                      hasError &&
                        isSelected &&
                        'border-red-500 bg-red-500/10 shadow-[inset_0_-3px_0_0_#FCA5A5]',
                      hasError && 'peer-focus-visible:ring-red-500/45',
                      optionClassName,
                    )}
                  >
                    {hideIndicator ? null : (
                      <span
                        className={cn(
                          'mt-0.5 inline-flex shrink-0 -translate-y-[0.5px] items-center justify-center rounded-full border-2 transition-all duration-150 ease-in-out',
                          sizeConfig.indicator,
                          schemeConfig.indicator,
                          !hasError &&
                            isSelected &&
                            'border-[var(--polarui-radio-selected-border)]',
                          hasError && isSelected && 'border-red-500',
                          indicatorClassName,
                        )}
                      >
                        <span
                          className={cn(
                            'pointer-events-none block rounded-full transition-all duration-150 ease-in-out',
                            sizeConfig.dot,
                            !hasError ? 'bg-[var(--polarui-radio-selected-dot)]' : 'bg-red-600',
                            isSelected ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
                          )}
                        />
                      </span>
                    )}

                    {iconPosition === 'left' ? icon : null}

                    <span className="min-w-0 flex-1">
                      <span className={cn('block font-semibold break-words', sizeConfig.label)}>
                        {option.label}
                      </span>
                      {optionSubtext ? (
                        <span
                          id={optionDescriptionId}
                          className={cn('mt-0.5 block break-words', sizeConfig.description, schemeConfig.optionDescription)}
                        >
                          {optionSubtext}
                        </span>
                      ) : null}
                    </span>

                    {iconPosition === 'right' ? icon : null}
                  </span>
                </label>
              );
            })
          ) : (
            <div className={cn('rounded-xl border px-3 py-2 text-sm', schemeConfig.emptyState)}>
              {noOptionsMessage}
            </div>
          )}
        </div>

        {resolvedSubtext ? (
          <p
            id={descriptionId}
            className={cn('text-sm leading-5 break-words', schemeConfig.helperText, descriptionClassName)}
          >
            {resolvedSubtext}
          </p>
        ) : null}

        {error ? (
          <p
            id={errorId}
            className={cn('text-sm font-medium leading-5 text-red-600 break-words', errorClassName)}
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
