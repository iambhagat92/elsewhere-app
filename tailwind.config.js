/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        panel: '#1E293B',
        primary: '#3B82F6',
        secondary: '#F59E0B',
        textPrimary: '#F1F5F9',
        textSecondary: '#94A3B8',
        success: '#10B981',
        error: '#EF4444',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        'screen-90': '90vh',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}