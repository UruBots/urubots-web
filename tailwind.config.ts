import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  colors: {
    blue: {
      50: '#F5FAFF',
      100: '#E7F2FE',
      200: '#C9E3FD',
      300: '#ACD4FB',
      400: '#85BFF9',
      500: '#54A6F7',
      600: '#3796F6',
      700: '#0B80F4',
      800: '#0969C8',
      900: '#074A8D',
      950: '#05386B',
    },
    white: {
      50: '#FCFCFD',
      100: '#FCFCFD',
      200: '#FAFAFA',
      300: '#F7F7F8',
      400: '#F4F4F5',
      500: '#F2F2F3',
      600: '#DADADD',
      700: '#BFBFC4',
      800: '#A2A2A9',
      900: '#76767F',
      950: '#53535A',
    },
  },
  plugins: [],
};
export default config;
