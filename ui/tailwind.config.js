/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "#7DA85D",
        lightGreen: "#DAFFD4",
        lightGray: "#D9D9D9",
        darkGray: "#545454",
      },
    },
  },
  plugins: [],
};
