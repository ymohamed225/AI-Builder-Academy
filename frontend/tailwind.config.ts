import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e6f0ff',
          100: '#cce1ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          cyan: '#00F0FF',
          dark: '#0F172A',
          darker: '#0B1120',
          card: 'rgba(30, 41, 59, 0.7)',
          border: 'rgba(255, 255, 255, 0.12)',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 0%, rgba(0, 102, 255, 0.25) 0%, rgba(27, 36, 54, 1) 75%)',
        'cyan-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.18) 0%, transparent 70%)',
        'blue-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.25) 0%, transparent 70%)',
        'purple-glow': 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
