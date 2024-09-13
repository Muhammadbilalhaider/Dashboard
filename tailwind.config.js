/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      interFont: ["Inter", "sans-serif"],
      robotoFont: ["Roboto", "sans-serif"],
    },
    colors: {
      buttonColor: "#280559",  
    },
  },
  plugins: [],
}

