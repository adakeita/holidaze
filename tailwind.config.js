const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        md: "2px 5px 10px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "logo-green": "#4fb88c",
        "logo-green-hover": "#3c906d",
        "page-bg": "#e9edea;",
        "form-grey": "#b9dabd;",
      },
      maxWidth: {
        logomax: "200px",
        "search-cart-max": "525px",
        "lg-search-cart-max": "645px",
        "home-hero-max": "600px",
      },
      headerFontFamily: ["Inter", "sans-serif"],
      boxShadow: {
        header: "4px 7px 12px 0px rgb(158 162 159 / 85%);",
        form: "3px 7px 12px 0px #959393c7;",
        formBtn: "3px 6px 10px 0px #424c43b8;",
        card: "4px 6px 12px 1px #c1ae82bf;",
        badge: "2px 3px 6px 1px #312e2ebd;",
        search: "inset 1px 3px 6px 0px #1d1b1b80;",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
  daisyui: {
    themes: ["light"], // or specify themes you want to include
    base: false, // applies background color and foreground color
    styled: true, // include daisyUI colors and design decisions (default)
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // no prefix for daisyUI classnames
    logs: true, // shows daisyUI logs in the terminal when building your CSS
    themeRoot: ":root", // the element that receives theme color CSS variables
  },
};
