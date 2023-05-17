/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shadow: '#1A1B1F',
      },
    },
    container: {
      center: true,
      padding: '15px',
      screens: {
        sm: '570px',
        md: '750px',
        lg: '990px',
        xl: '1170px'
      },
    }
  },
  plugins: [],
}
