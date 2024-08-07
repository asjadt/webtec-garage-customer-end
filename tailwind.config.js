/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
    },

    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      screen724: "724px",
      // => @media (min-width: 720px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      screen864: "864px",
      // => @media (min-width: 864px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      screen1100: "1100px",
      // => @media (min-width: 1100px) { ... }

      screen1200: "1200px",
      // => @media (min-width: 1200px) { ... }

      screen1250: "1250px",
      // => @media (min-width: 1200px) { ... }

      screen1500: "1500px",
      // => @media (min-width: 1500px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        default: {
          primary: "#DC2D2A", // Active Icon Color
          secondary: "#61C2E2", // Label Text Color

          accent: "#6E6E6E", // De-active icon color
          neutral: "#000000", // Text Color

          "base-100": "#F2F2F2", // Section Background Color
          "base-200": "#FAFAFB", // Background Color
          "base-300": "#FFFFFF", // Sidebar Background Color

          info: "#5881ff",
          success: "#36d399",
          warning: "#FFDB67",
          error: "#ff8369",
        },
      },
      {
        defaultDark: {
          primary: "#FF7346", // Active Icon Color
          secondary: "#3CC6E5", // Label Text Color

          accent: "#6E6E6E", // De-active icon color
          neutral: "#ffffff", // Text Color

          "base-100": "#1A1A1A", // Section Background Color
          "base-200": "#111111", // Background Color
          "base-300": "#0D0D0D", // Sidebar Background Color

          info: "#5881ff",
          success: "#36d399",
          warning: "#FFDB67",
          error: "#ff8369",
        },
      },
      {
        perfectBlue: {
          primary: "#605bff", // Active Icon Color
          secondary: "#61C2E2", // Label Text Color

          accent: "#6E6E6E", // De-active icon color
          neutral: "#000000", // Text Color

          "base-100": "#F2F2F2", // Section Background Color
          "base-200": "#FAFAFB", // Background Color
          "base-300": "#FFFFFF", // Sidebar Background Color

          info: "#5881ff",
          success: "#36d399",
          warning: "#FFDB67",
          error: "#ff8369",
        },
      },
      {
        perfectBlueDark: {
          primary: "#605bff", // Active Icon Color
          secondary: "#3CC6E5", // Label Text Color

          accent: "#6E6E6E", // De-active icon color
          neutral: "#ffffff", // Text Color

          "base-100": "#1A1A1A", // Section Background Color
          "base-200": "#111111", // Background Color
          "base-300": "#0D0D0D", // Sidebar Background Color

          info: "#5881ff",
          success: "#36d399",
          warning: "#FFDB67",
          error: "#ff8369",
        },
      },
    ],
  },
  plugins: [
    daisyui,
    require("tailwind-scrollbar"),
    function ({ addUtilities }) {
      addUtilities({
        ".overflow-wrap-anywhere": {
          "overflow-wrap": "anywhere",
        },
      });
    },
  ],
};
