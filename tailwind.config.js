/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tp-red':    '#D91B4E',
        'tp-red-50': '#FCE8EE',
        'tp-red-100':'#F8C2D0',
        'tp-red-700':'#A8143B',
        'tp-red-900':'#5C0B20',
        'tp-teal':   '#17B8CE',
        'tp-teal-50':'#E4F8FB',
        'tp-teal-100':'#BEEDF3',
        'tp-teal-700':'#0E8C9D',
        'tp-teal-900':'#074651',
        'tp-dark':   '#1C2B3A',
        'tp-darker': '#0F1A24',
        'tp-ink':    '#0B1620',
        'tp-mist':   '#F5F7FA',
        'tp-fog':    '#E8ECF1',
      },
      fontFamily: {
        display: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'display-tight': '-0.03em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
      boxShadow: {
        'tp-soft':     '0 8px 24px -8px rgba(28,43,58,0.12), 0 2px 6px rgba(28,43,58,0.06)',
        'tp-elevated': '0 16px 48px -12px rgba(28,43,58,0.18), 0 4px 12px rgba(28,43,58,0.08)',
        'tp-glow-red':  '0 0 24px rgba(217,27,78,0.20), 0 0 48px rgba(217,27,78,0.10)',
        'tp-glow-teal': '0 0 24px rgba(23,184,206,0.20), 0 0 48px rgba(23,184,206,0.10)',
      },
      backgroundImage: {
        'tp-gradient': 'linear-gradient(135deg, #D91B4E 0%, #17B8CE 100%)',
        'tp-dark-gradient': 'linear-gradient(140deg, #0F1A24 0%, #1C2B3A 55%, #243447 100%)',
      },
      animation: {
        'fade-up':  'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':  'fadeIn 0.5s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
