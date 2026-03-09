import type React from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import type { ColorStep, PaletteTone } from './color.js';
import type { UiIcon, UiIconComponent, UiIconComponentProps } from './icon.js';

export type ButtonTone = PaletteTone;
export type ButtonTextColor = 'white' | 'black';
export type ButtonIconSide = 'left' | 'right';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonElement = 'button' | 'a';
export type ButtonIconComponentProps = UiIconComponentProps;
export type ButtonIconComponent = UiIconComponent;
export type ButtonIcon = UiIcon;

export interface ButtonBaseProps {
  tone?: ButtonTone;
  toneStep?: ColorStep;
  textColor?: ButtonTextColor;
  icon?: ButtonIcon;
  iconSize?: number;
  iconClassName?: string;
  iconSide?: ButtonIconSide;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
  spinner?: React.ReactNode;
  children?: React.ReactNode;
  as?: ButtonElement;
}

export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<HTMLMotionProps<'button'>, 'ref' | 'color' | 'children' | 'disabled'> & {
    as?: 'button';
    disabled?: boolean;
  };

export type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<HTMLMotionProps<'a'>, 'ref' | 'color' | 'children'> & {
    as: 'a';
    disabled?: boolean;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;
