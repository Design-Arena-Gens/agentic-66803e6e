import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        mcdonalds: {
          yellow: '#FFC72C',
          red: '#DA291C',
          dark: '#27251F'
        }
      }
    }
  },
  plugins: []
};

export default config;
