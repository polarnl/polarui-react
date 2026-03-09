import type React from 'react';
import type { ColorStep, PaletteTone } from './color.js';
import type { UiIcon, UiIconComponent, UiIconComponentProps } from './icon.js';

export type RadioGroupVariant = 'light' | 'dark';
export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupOrientation = 'vertical' | 'horizontal';
export type RadioGroupIconComponentProps = UiIconComponentProps;
export type RadioGroupIconComponent = UiIconComponent;
export type RadioGroupIcon = UiIcon;

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  subtext?: React.ReactNode;
  disabled?: boolean;
  icon?: RadioGroupIcon;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  id?: string;
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: RadioOption) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  subtext?: React.ReactNode;
  error?: React.ReactNode;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: RadioGroupVariant;
  tone?: PaletteTone;
  toneStep?: ColorStep;
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  loop?: boolean;
  allowDeselect?: boolean;
  iconPosition?: 'left' | 'right';
  noOptionsMessage?: React.ReactNode;
  hideIndicator?: boolean;
  listClassName?: string;
  optionClassName?: string;
  indicatorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}
