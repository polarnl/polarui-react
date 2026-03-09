import type { ColorStep, PaletteTone } from '../types/color.js';
import colors from 'tailwindcss/colors';

export const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export const PALETTE_TONES = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
] as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function shiftColorStep(step: ColorStep, offset: number): ColorStep {
  const index = COLOR_STEPS.indexOf(step);
  const nextIndex = clamp(index + offset, 0, COLOR_STEPS.length - 1);
  return COLOR_STEPS[nextIndex]!;
}

export function toneStepClass(prefix: string, tone: PaletteTone, step: ColorStep): string {
  return `${prefix}-${tone}-${step}`;
}

export function toneStepAlphaClass(
  prefix: string,
  tone: PaletteTone,
  step: ColorStep,
  alpha: number,
): string {
  return `${prefix}-${tone}-${step}/${alpha}`;
}

export function getDefaultOnToneText(tone: PaletteTone, step: ColorStep): 'white' | 'black' {
  if (step <= 400) return 'black';
  if (step >= 700) return 'white';

  switch (tone) {
    case 'amber':
    case 'yellow':
    case 'lime':
    case 'stone':
      return 'black';
    default:
      return 'white';
  }
}

function getToneScale(tone: PaletteTone): Record<string, string> | undefined {
  const scale = colors[tone];
  return typeof scale === 'object' && scale !== null ? (scale as Record<string, string>) : undefined;
}

export function resolveToneColor(tone: PaletteTone, step: ColorStep): string {
  const scale = getToneScale(tone);
  const value = scale?.[String(step)];
  if (value) return value;

  const fallbackScale = getToneScale('blue');
  return fallbackScale?.[String(step)] ?? fallbackScale?.['500'] ?? '#3b82f6';
}

export function withAlpha(color: string, alpha: number): string {
  const clamped = clamp(alpha, 0, 100);
  return `color-mix(in oklab, ${color} ${clamped}%, transparent)`;
}
