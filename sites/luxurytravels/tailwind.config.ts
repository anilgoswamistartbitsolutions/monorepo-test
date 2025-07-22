import path from 'path';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',                         // main project
    path.resolve(__dirname, '../../packages/ui-components/**/*.{js,ts,jsx,tsx,mdx}'), // ui components package
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
