/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'gradient-primary': 'linear-gradient(45deg, #6b46c1, #9f7aea)',
          'success': '#10b981',
          'success-foreground': '#047857',
          'accent': '#7c3aed',
          'accent-foreground': '#ede9fe',
          'background': '#f9fafb',
          'secondary': '#e5e7eb',
          'card': '#ffffff',
          'card-foreground': '#111827',
          'muted-foreground': '#6b7280',
          'border': '#e5e7eb',
          'destructive': '#ef4444',
          'destructive-foreground': '#ffffff',
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          'elegant': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          'glow': '0 0 15px rgba(0, 0, 0, 0.1)',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in',
          'slide-up': 'slideUp 0.5s ease-out',
          'scale-in': 'scaleIn 0.3s ease-out',
          'pulse-glow': 'pulseGlow 2s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          pulseGlow: {
            '0%, 100%': { boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' },
            '50%': { boxShadow: '0 0 25px rgba(0, 0, 0, 0.2)' },
          },
        },
      },
    },
    plugins: [],
  };