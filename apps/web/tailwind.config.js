/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          'bg-secondary': '#F7F7FA',
          text: '#202124',
          'text-secondary': '#71717A',
          purple: '#7C3AED',
          'purple-hover': '#6D28D9',
          'purple-light': '#F3E8FF',
          border: '#E5E7EB',
          success: '#15803D',
          error: '#B91C1C',
          // Dark mode counterparts
          'dark-bg': '#0B0F17',
          'dark-bg-secondary': '#111827',
          'dark-card': '#161F30',
          'dark-text': '#F3F4F6',
          'dark-text-secondary': '#94A3B8',
          'dark-purple': '#8B5CF6',
          'dark-purple-hover': '#7C3AED',
          'dark-border': '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(124, 58, 237, 0.12)',
        'purple-glow': '0 0 25px rgba(124, 58, 237, 0.25)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
