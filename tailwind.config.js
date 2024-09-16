/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      fontFamily: {
        interFont: ["Inter", "sans-serif"],
        robotoFont: ["Roboto", "sans-serif"],
      },
      colors: {
        buttonColor: "#280559"
      },
      width: {
        formWidth: "300px",
        imgWidth: "1058px",
        imgHeight: "733px",
        maxWidthPage: "1000px"
      }
    },
  },
  plugins: [],
};