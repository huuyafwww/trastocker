import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
} satisfies Config;

export default config;
