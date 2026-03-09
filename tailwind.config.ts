import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './stories/**/*.{ts,tsx,js,jsx,mdx}',
    './.storybook/**/*.{ts,tsx,js,jsx}',
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
  theme: {},
  plugins: [],
} satisfies Config;
