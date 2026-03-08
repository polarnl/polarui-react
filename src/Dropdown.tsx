import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from './cn.js';

export type DropdownScheme = 'light' | 'dark';
export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownIconComponentProps = {
  className?: string;
  size?: string | number;
  'aria-hidden'?: boolean;
};
export type DropdownIconComponent = React.ComponentType<DropdownIconComponentProps>;
export type DropdownIcon = React.ReactNode | DropdownIconComponent;

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  icon?: DropdownIcon;
}

export interface DropdownProps {
  id?: string;
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: DropdownOption) => void;
  placeholder?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  scheme?: DropdownScheme;
  size?: DropdownSize;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  noOptionsMessage?: React.ReactNode;
  chevronIcon?: DropdownIcon;
  selectedIcon?: DropdownIcon;
  hideSelectedIcon?: boolean;
  listMinWidth?: number | string;
  className?: string;
  containerClassName?: string;
  triggerClassName?: string;
  listClassName?: string;
}

const schemeClasses: Record<
  DropdownScheme,
  { trigger: string; list: string; option: string; focus: string }
> = {
  light: {
    trigger:
      'bg-white border-zinc-300 border-b-zinc-300 text-zinc-900 shadow-[0_3px_0_0_#D4D4D8,0_10px_18px_-16px_rgba(15,23,42,0.45)] hover:border-zinc-400',
    list: 'bg-white border-zinc-300 shadow-[0_12px_28px_-16px_rgba(15,23,42,0.4)]',
    option: 'text-zinc-900 hover:bg-zinc-100',
    focus: 'focus-visible:ring-zinc-400/35 focus-visible:ring-offset-white',
  },
  dark: {
    trigger:
      'bg-zinc-800 border-zinc-600 border-b-zinc-600 text-zinc-100 shadow-[0_3px_0_0_#52525B,0_10px_18px_-16px_rgba(0,0,0,0.7)] hover:border-zinc-500',
    list: 'bg-zinc-800 border-zinc-600 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.75)]',
    option: 'text-zinc-100 hover:bg-zinc-700',
    focus: 'focus-visible:ring-zinc-300/35 focus-visible:ring-offset-zinc-900',
  },
};

const sizeClasses: Record<DropdownSize, { trigger: string; option: string; icon: string }> = {
  sm: {
    trigger: 'h-10 px-3 text-sm',
    option: 'px-3 py-2 text-sm',
    icon: 'size-4',
  },
  md: {
    trigger: 'h-11 px-3.5 text-base',
    option: 'px-3.5 py-2.5 text-sm',
    icon: 'size-[18px]',
  },
  lg: {
    trigger: 'h-12 px-4 text-base',
    option: 'px-4 py-3 text-base',
    icon: 'size-5',
  },
};

function findNextEnabled(options: DropdownOption[], start: number, direction: 1 | -1): number {
  if (!options.length) return -1;

  for (let step = 1; step <= options.length; step += 1) {
    const index = (start + direction * step + options.length) % options.length;
    if (!options[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function getFirstEnabledIndex(options: DropdownOption[]): number {
  return options.findIndex((option) => !option.disabled);
}

function isIconComponent(value: DropdownIcon): value is DropdownIconComponent {
  if (typeof value === 'function') return true;
  if (typeof value === 'object' && value !== null && '$$typeof' in value) return true;
  return false;
}

const DefaultChevron: DropdownIconComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    className={cn('size-full', className)}
    aria-hidden="true"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DefaultCheck: DropdownIconComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    className={cn('size-full', className)}
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

function renderIcon(icon: DropdownIcon, className: string, size = 16): React.ReactNode {
  if (isIconComponent(icon)) {
    return React.createElement(icon, { className, size, 'aria-hidden': true });
  }

  return <span className={className}>{icon}</span>;
}

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      id,
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select an option',
      label,
      description,
      error,
      scheme = 'light',
      size = 'md',
      disabled,
      required,
      name,
      noOptionsMessage = 'No options available',
      chevronIcon,
      selectedIcon,
      hideSelectedIcon = false,
      listMinWidth = '16rem',
      className,
      containerClassName,
      triggerClassName,
      listClassName,
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const dropdownId = id ?? `dropdown-${generatedId}`;
    const listboxId = `${dropdownId}-listbox`;
    const descriptionId = description ? `${dropdownId}-description` : undefined;
    const errorId = error ? `${dropdownId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const selectedValue = isControlled ? value : internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);

    const [open, setOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

    const rootRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const optionRefs = React.useRef<Array<HTMLLIElement | null>>([]);

    const schemeConfig = schemeClasses[scheme];
    const sizeConfig = sizeClasses[size];
    const hasError = Boolean(error);
    const hasAnyOptionIcons = options.some((option) => Boolean(option.icon));
    const resolvedMinWidth = typeof listMinWidth === 'number' ? `${listMinWidth}px` : listMinWidth;
    const prefersReducedMotion = useReducedMotion();

    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement);

    React.useEffect(() => {
      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        if (!rootRef.current) return;
        if (rootRef.current.contains(event.target as Node)) return;
        setOpen(false);
      };

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);

      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('touchstart', handlePointerDown);
      };
    }, []);

    React.useEffect(() => {
      if (!open) return;

      const selectedIndex = options.findIndex(
        (option) => option.value === selectedValue && !option.disabled,
      );
      const fallbackIndex = getFirstEnabledIndex(options);
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : fallbackIndex);
    }, [open, options, selectedValue]);

    React.useEffect(() => {
      if (!open || highlightedIndex < 0) return;
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }, [highlightedIndex, open]);

    const selectOption = React.useCallback(
      (option: DropdownOption) => {
        if (option.disabled) return;
        if (!isControlled) {
          setInternalValue(option.value);
        }
        onValueChange?.(option.value, option);
        setOpen(false);
      },
      [isControlled, onValueChange],
    );

    const moveHighlight = (direction: 1 | -1) => {
      const start = highlightedIndex >= 0 ? highlightedIndex : direction === 1 ? -1 : 0;
      const nextIndex = findNextEnabled(options, start, direction);
      if (nextIndex >= 0) {
        setHighlightedIndex(nextIndex);
      }
    };

    const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            moveHighlight(1);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            moveHighlight(-1);
          }
          break;
        case 'Home':
          if (!open) return;
          event.preventDefault();
          setHighlightedIndex(getFirstEnabledIndex(options));
          break;
        case 'End':
          if (!open) return;
          event.preventDefault();
          setHighlightedIndex(findNextEnabled(options, 0, -1));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!open) {
            setOpen(true);
          } else if (highlightedIndex >= 0) {
            const option = options[highlightedIndex];
            if (option) {
              selectOption(option);
            }
          }
          break;
        case 'Escape':
          if (!open) return;
          event.preventDefault();
          setOpen(false);
          break;
        case 'Tab':
          setOpen(false);
          break;
        default:
          break;
      }
    };

    return (
      <div
        ref={rootRef}
        className={cn('inline-flex w-80 max-w-full min-w-0 flex-col gap-1.5', className)}
      >
        {label ? (
          <label
            htmlFor={dropdownId}
            className={cn(
              'text-sm font-semibold leading-5 break-words',
              scheme === 'dark' ? 'text-zinc-100' : 'text-zinc-900',
              disabled && 'text-zinc-500',
            )}
          >
            {label}
          </label>
        ) : null}

        <div className={cn('relative w-full', containerClassName)}>
          <button
            ref={triggerRef}
            id={dropdownId}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
              className={cn(
                'flex w-full min-w-0 items-center justify-between overflow-hidden rounded-xl border-2 border-b-[3px] text-left font-medium transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
                schemeConfig.trigger,
                schemeConfig.focus,
                sizeConfig.trigger,
                hasError &&
                  'border-red-400 border-b-red-400 shadow-[0_3px_0_0_#FCA5A5,0_10px_18px_-16px_rgba(127,29,29,0.45)] hover:border-red-500 focus-visible:ring-red-500/45',
                triggerClassName,
              )}
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={handleTriggerKeyDown}
          >
            <span
              className={cn(
                'truncate',
                !selectedOption && (scheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'),
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span
              className={cn(
                'ml-3 shrink-0 transition-transform duration-150 ease-in-out',
                open && 'rotate-180',
                scheme === 'dark' ? 'text-zinc-300' : 'text-zinc-500',
              )}
            >
              {renderIcon(chevronIcon ?? DefaultChevron, cn(sizeConfig.icon), 16)}
            </span>
          </button>

          {name ? (
            <input type="hidden" name={name} value={selectedValue ?? ''} required={required} />
          ) : null}

          <AnimatePresence>
            {open ? (
              <motion.ul
                id={listboxId}
                role="listbox"
                aria-labelledby={dropdownId}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  minWidth: `max(100%, ${resolvedMinWidth})`,
                  maxWidth: 'min(24rem, calc(100vw - 2rem))',
                }}
                className={cn(
                  'origin-top absolute z-50 mt-2 max-h-64 overflow-y-auto overflow-x-hidden rounded-xl border p-1.5',
                  '[scrollbar-width:thin] [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent',
                  '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding',
                  scheme === 'dark'
                    ? '[scrollbar-color:#71717A_transparent] [&::-webkit-scrollbar-thumb]:bg-zinc-500 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400'
                    : '[scrollbar-color:#A1A1AA_transparent] [&::-webkit-scrollbar-thumb]:bg-zinc-400 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500',
                  schemeConfig.list,
                  listClassName,
                )}
              >
                {options.length ? (
                  options.map((option, index) => {
                    const isSelected = option.value === selectedValue;
                    const isHighlighted = highlightedIndex === index;

                    return (
                      <li
                        key={option.value}
                        ref={(element) => {
                          optionRefs.current[index] = element;
                        }}
                        role="option"
                        aria-selected={isSelected}
                        className={cn(
                          'flex cursor-pointer items-start gap-2 rounded-lg transition-colors duration-100 ease-out',
                          sizeConfig.option,
                          schemeConfig.option,
                          isHighlighted && (scheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'),
                          isSelected && (scheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'),
                          option.disabled && 'pointer-events-none opacity-45',
                        )}
                        onMouseEnter={() => {
                          if (!option.disabled) {
                            setHighlightedIndex(index);
                          }
                        }}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectOption(option)}
                      >
                        {hasAnyOptionIcons ? (
                          <span
                            className={cn(
                              'mt-0.5 shrink-0',
                              scheme === 'dark' ? 'text-zinc-300' : 'text-zinc-600',
                            )}
                          >
                            {option.icon ? (
                              renderIcon(option.icon, cn(sizeConfig.icon), 16)
                            ) : (
                              <span className={cn(sizeConfig.icon)} />
                            )}
                          </span>
                        ) : null}

                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{option.label}</span>
                          {option.description ? (
                            <span
                              className={cn(
                                'mt-0.5 block text-xs leading-4 break-words',
                                scheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500',
                              )}
                            >
                              {option.description}
                            </span>
                          ) : null}
                        </span>

                        {!hideSelectedIcon ? (
                          <span
                            className={cn(
                              'mt-0.5 shrink-0',
                              isSelected
                                ? scheme === 'dark'
                                  ? 'text-zinc-200'
                                  : 'text-zinc-700'
                                : 'opacity-0',
                            )}
                          >
                            {renderIcon(selectedIcon ?? DefaultCheck, cn(sizeConfig.icon), 16)}
                          </span>
                        ) : null}
                      </li>
                    );
                  })
                ) : (
                  <li
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm',
                      scheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500',
                    )}
                  >
                    {noOptionsMessage}
                  </li>
                )}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </div>

        {description ? (
          <p
            id={descriptionId}
            className={cn(
              'text-sm leading-5 break-words',
              scheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600',
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

Dropdown.displayName = 'Dropdown';
