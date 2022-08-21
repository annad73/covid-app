module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      md: { max: "767px" },
    },
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
    },
    colors: {
      background: "white",
      bc: "#1F1F23",
      primary: " #FFFFFF",
      secondary: "#D6E3E4",
      danger: "Black",
      button: "Pink",
      lightGrey: "#3F3E41",
    },
    boxShadow: {
      custom: "0 0 10px #F8EF12",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
