/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#01579B",
        primaryBG: "rgba(225,245,254,0.30)",
        bgGray: "#fafafa",
        textColor: "#003560",
        myRed: "#ED1D24",
      },
      boxShadow: {
        'shadow-timeword': '0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(0, 0, 0, 0.20);',
      },
    },
  },
};
