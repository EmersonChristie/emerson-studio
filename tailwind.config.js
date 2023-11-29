/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        wide: "0.1em",
        wider: "0.2em",
        widest: "0.8em",
      },
      scale: {
        10: "1.1",
        20: "1.2",
        30: "1.3",
        40: "1.4",
        50: "1.5",
        60: "1.6",
        70: "1.7",
        80: "1.8",
        90: "1.9",
      },

      maxHeight: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "3/4": "75%",
        "4/5": "80%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "9/10": "90%",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "3/4": "75%",
        "4/5": "80%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "9/10": "90%",
        1920: "1920px",
      },
      fontFamily: {
        // display: ["var(--font-sf)", "system-ui", "sans-serif"],
        display: ["UnicaOne", "system-ui", "sans-serif"], // Adding Unica One
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
  ],
};
