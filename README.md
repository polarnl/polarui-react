# PolarUI React

PolarUI React is a Tailwind-first component library by PolarNL.

It currently includes:

- `Button`
- `Input`
- `Checkbox`
- `Dropdown`

## Installation

```bash
pnpm add @polarnl/polarui-react
```

You can also use `npm` or `yarn`.

## Peer Dependencies

Install these in your app if they are not already present:

- `react`
- `react-dom`
- `tailwindcss`
- `framer-motion`
- `clsx`
- `tailwind-merge`

## Tailwind Setup

PolarUI uses Tailwind utility classes at runtime. Your app must compile those classes.

### 1) Include PolarUI in Tailwind `content`

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@polarnl/polarui-react/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
} satisfies Config;
```

### 2) Add safelist patterns for dynamic `tone` and `toneStep`

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@polarnl/polarui-react/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern:
        /^(bg|text|border|border-b|shadow)-[a-z]+-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ['hover', 'peer-checked', 'peer-indeterminate'],
    },
    {
      pattern: /^ring-[a-z]+-(50|100|200|300|400|500|600|700|800|900|950)\/(40|45)$/,
      variants: ['focus-visible', 'focus-within', 'peer-focus-visible'],
    },
    {
      pattern: /^bg-[a-z]+-(50|100|200|300|400|500|600|700|800|900|950)\/15$/,
    },
  ],
} satisfies Config;
```

### 3) Ensure Tailwind is loaded in your global CSS

```css
@import 'tailwindcss';
```

## Quick Start

```tsx
import { Button, Input, Dropdown, Checkbox } from '@polarnl/polarui-react';
import { FiSearch, FiCode, FiMegaphone } from 'react-icons/fi';

export function Example() {
  return (
    <div className="space-y-4">
      <Button tone="blue" toneStep={500} icon={FiSearch}>
        Search
      </Button>

      <Input label="Search" placeholder="Search docs" icon={FiSearch} tone="sky" toneStep={500} />

      <Dropdown
        label="Team"
        placeholder="Select a team"
        tone="blue"
        toneStep={500}
        options={[
          { value: 'design', label: 'Design', icon: FiCode },
          { value: 'marketing', label: 'Marketing', icon: FiMegaphone },
        ]}
      />

      <Checkbox label="Receive product updates" tone="blue" toneStep={500} />
    </div>
  );
}
```

## Component Highlights

### Button

- Motion-based press interaction with `framer-motion`
- Supports `as="button"` and `as="a"`
- Icon support (`ReactNode` or icon component)
- Loading state (`loading`, `loadingLabel`, `spinner`)
- Tone system via `tone` and `toneStep`

### Input

- Label, description, error, invalid state
- `light` and `dark` variants
- Start and end icons (`icon`, `startIcon`, `endIcon`)
- Tone-aware focus and hover styling

### Dropdown

- Fully keyboard-accessible listbox behavior
- Controlled and uncontrolled modes
- Option descriptions and per-option icons
- Custom trigger icon and selected icon
- Adjustable menu width with `listMinWidth`

### Checkbox

- Controlled and uncontrolled modes
- Supports indeterminate state
- Label, description, and error message slots
- Tone-aware checked and focus states

## Color System

All controls support a shared color model:

- `tone`: palette name
- `toneStep`: Tailwind step (`50` to `950`)

Available tones:

- `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `slate`, `gray`, `zinc`, `neutral`, `stone`

Utilities exported by the package:

- `COLOR_STEPS`
- `PALETTE_TONES`
- `shiftColorStep`
- `toneStepClass`
- `toneStepAlphaClass`
- `getDefaultOnToneText`

## Icons

Icon props accept:

- A React node
- A component matching `UiIconComponentProps`

`react-icons` works out of the box.

## Exports

Main exports include:

- Components: `Button`, `Input`, `Dropdown`, `Checkbox`
- Type exports for each component and icon model
- Color tokens and color utility helpers
- Utility: `cn`

## Development

```bash
pnpm install
pnpm storybook
pnpm build
pnpm format
```
