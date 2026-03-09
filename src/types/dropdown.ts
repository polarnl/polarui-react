import type React from 'react';
import type { ColorStep, PaletteTone } from './color.js';
import type { UiIcon, UiIconComponent, UiIconComponentProps } from './icon.js';

export type DropdownVariant = 'light' | 'dark';
export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownIconComponentProps = UiIconComponentProps;
export type DropdownIconComponent = UiIconComponent;
export type DropdownIcon = UiIcon;

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
  invalid?: boolean;
  variant?: DropdownVariant;
  tone?: PaletteTone;
  toneStep?: ColorStep;
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
