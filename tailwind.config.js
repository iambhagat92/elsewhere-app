/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors (default)
        background: {
          DEFAULT: '#F8FAFC', // Light background
          dark: '#0F172A',    // Dark background
        },
        panel: {
          DEFAULT: '#FFFFFF', // Light panel
          dark: '#1E293B',    // Dark panel
        },
        primary: '#3B82F6',
        secondary: '#F59E0B',
        textPrimary: {
          DEFAULT: '#1E293B', // Dark text for light mode
          dark: '#F1F5F9',    // Light text for dark mode
        },
        textSecondary: {
          DEFAULT: '#64748B', // Medium text for light mode
          dark: '#94A3B8',    // Medium text for dark mode
        },
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