/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-200': 'rgb(var(--color-primary-200) / <alpha-value>)',
        'primary-300': 'rgb(var(--color-primary-300) / <alpha-value>)',
        'primary-400': 'rgb(var(--color-primary-400) / <alpha-value>)',
      },
      data: {
        scrolled: 'scrolled=true',
        top: 'scrolled=false',
      },
      fontFamily: {
        heading: ['Candara'],
        sans: ['Raleway'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
