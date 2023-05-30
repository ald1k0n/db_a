/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#103602',
      secondary: '#FFC473',
      black: '#000000',
      white: '#ffffff',
      success: '#32B803',
      info: '#1452F0',
      danger: '#FF2424',
      warning: '#ffc107',
      darkGreen: '#103602',
      green: '#007143',
      lightGreen: '#32B803',
      brown: '#FFC473',
      gray: {
        50: '#f9f9f9',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
  ],
}