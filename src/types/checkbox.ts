import type React from 'react';
import type { ColorStep, PaletteTone } from './color.js';

export type CheckboxTone = PaletteTone;
export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  invalid?: boolean;
  tone?: CheckboxTone;
  toneStep?: ColorStep;
  size?: CheckboxSize;
  indeterminate?: boolean;
}
