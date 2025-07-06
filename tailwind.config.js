/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3579FF',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        worksans: ['"Work Sans"', 'sans-serif'], // ✅ added Work Sans
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3579FF',
          secondary: '#F3F4F6',
          accent: '#3A4256',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
    darkTheme: 'mytheme',
  },
};
