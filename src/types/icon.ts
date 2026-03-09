import type React from 'react';

export type UiIconComponentProps = {
  className?: string;
  size?: string | number;
  'aria-hidden'?: boolean;
};

export type UiIconComponent = React.ComponentType<UiIconComponentProps>;
export type UiIcon = React.ReactNode;
