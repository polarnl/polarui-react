import type React from 'react';
import type { ColorStep, PaletteTone } from './color.js';
import type { UiIcon, UiIconComponent, UiIconComponentProps } from './icon.js';

export type InputVariant = 'light' | 'dark';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputIconComponentProps = UiIconComponentProps;
export type InputIconComponent = UiIconComponent;
export type InputIcon = UiIcon;

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  tone?: PaletteTone;
  toneStep?: ColorStep;
  size?: InputSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  invalid?: boolean;
  icon?: InputIcon;
  startIcon?: InputIcon;
  endIcon?: InputIcon;
  inputClassName?: string;
  containerClassName?: string;
}
