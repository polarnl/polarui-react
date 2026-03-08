import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './stories/**/*.{ts,tsx,js,jsx,mdx}',
    './.storybook/**/*.{ts,tsx,js,jsx}',
  ],
  plugins: [],
} satisfies Config;
