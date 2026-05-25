/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070707',
          900: '#0e0e0e',
          800: '#161616',
          700: '#1e1e1e',
          600: '#262626',
        },
        crimson: {
          DEFAULT: '#c0392b',
          bright: '#e84040',
          dark: '#922b21',
          50: 'rgba(192,57,43,0.05)',
          100: 'rgba(192,57,43,0.10)',
          200: 'rgba(192,57,43,0.20)',
          400: '#e53935',
          glow: '0 0 20px rgba(192,57,43,0.5)',
        },
        slate: {
          text: '#e8e8e8',
          muted: '#7a7a7a',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        display: ['"Exo 2"', 'sans-serif'],
        body: ['"Barlow"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'ecg-draw': 'ecgDraw 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        ecgDraw: {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(192,57,43,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(192,57,43,0.04) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        'crimson': '0 0 0 1px rgba(192,57,43,0.3), 0 0 20px rgba(192,57,43,0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(192,57,43,0.2)',
      },
    },
  },
  plugins: [],
}
