import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-bg': '#f7f4f0',
      },
    },
  },
  plugins: [
    containerQueries,
  ],
}
