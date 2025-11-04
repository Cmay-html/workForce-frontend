/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          900: '#1e293b',
          800: '#2b3553',
          700: '#3f4d67',
        },
        orange: {
          400: '#f97316',
          500: '#f97316',
        },
      },
    },
  },
  plugins: [],
}
