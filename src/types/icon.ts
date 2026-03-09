import type React from 'react';

export type UiIconComponentProps = {
  className?: string;
  size?: string | number;
  'aria-hidden'?: boolean;
};

export type UiIconComponent = React.ComponentType<UiIconComponentProps>;
export type UiIcon = React.ReactNode | UiIconComponent;

export function isIconComponent(value: UiIcon): value is UiIconComponent {
  if (typeof value === 'function') return true;
  if (typeof value === 'object' && value !== null && '$$typeof' in value) return true;
  return false;
}
