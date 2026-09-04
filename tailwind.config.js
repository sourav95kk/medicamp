/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          bg: '#F2F2F7',
          card: '#FFFFFF',
          secondaryBg: '#E5E5EA',
          border: '#D1D1D6',
          blue: '#007AFF',
          teal: '#30B0C7',
          green: '#34C759',
          indigo: '#5856D6',
          orange: '#FF9500',
          pink: '#FF2D55',
          purple: '#AF52DE',
          red: '#FF3B30',
          yellow: '#FFCC00',
          gray: '#8E8E93',
          darkGray: '#1C1C1E',
          subtext: '#6C6C70'
        },
        health: {
          primary: '#0284C7', // Medical Sky/Ocean
          accent: '#10B981',  // Emerald Health
          danger: '#EF4444',
          warning: '#F59E0B',
          navy: '#0F172A',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ]
      },
      boxShadow: {
        'ios': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'ios-lg': '0 10px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'ios-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      borderRadius: {
        'ios-card': '20px',
        'ios-btn': '14px',
        'ios-sm': '10px'
      }
    },
  },
  plugins: [],
}
