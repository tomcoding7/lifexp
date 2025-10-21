import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  safelist: [
    // Connection colors
    'border-connection',
    'text-connection',
    'from-connection-light',
    'to-connection',
    // Creative colors
    'border-creative',
    'text-creative',
    'from-creative-light',
    'to-creative',
    // Clarity colors
    'border-clarity',
    'text-clarity',
    'from-clarity-light',
    'to-clarity',
    // Financial colors
    'border-financial',
    'text-financial',
    'from-financial-light',
    'to-financial',
    // Discipline colors
    'border-discipline',
    'text-discipline',
    'from-discipline-light',
    'to-discipline',
    // Social colors
    'border-social',
    'text-social',
    'from-social-light',
    'to-social',
  ],
  theme: {
    extend: {
      colors: {
        connection: {
          light: '#ff6b9d',
          DEFAULT: '#ff1744',
          dark: '#c4124d',
        },
        creative: {
          light: '#9c88ff',
          DEFAULT: '#651fff',
          dark: '#4615b2',
        },
        clarity: {
          light: '#64b5f6',
          DEFAULT: '#2979ff',
          dark: '#1c54b2',
        },
        financial: {
          light: '#4db6ac',
          DEFAULT: '#00897b',
          dark: '#00695c',
        },
        discipline: {
          light: '#ffb74d',
          DEFAULT: '#ff6f00',
          dark: '#c43e00',
        },
        social: {
          light: '#ba68c8',
          DEFAULT: '#8e24aa',
          dark: '#5c007a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

