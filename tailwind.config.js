const defaultTheme = require('tailwindcss/defaultTheme');

const rem = (px) => `${px / 16}rem`;
const px = (px) => `${px}px`;

const range = (from, to, step) => {
  const arr = [from];
  let last_el = arr[arr.length - 1];
  while (last_el < to) {
    arr.push(last_el + step);
    last_el = arr[arr.length - 1];
  }
  return arr;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,css,scss,svg}',
  ],
  prefix: '',
  plugins: [
    require('tailwindcss-animate'),
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
};
