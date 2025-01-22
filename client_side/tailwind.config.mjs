/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        bounceOnce: 'bounceOnce 1s ease-in-out infinite', // Add the custom animation here
      },
      keyframes: {
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }, // Adjust the bounce height as needed
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['autofill'], // Add support for autofill background color
    },
  },
  plugins: [],
};
