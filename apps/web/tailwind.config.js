/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        "dm-display": ["var(--font-dm-display)"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        twelvedays: {
          primary: "purple",
          secondary: "#ffffff",
          accent: "#ffffff",
          neutral: "#D9D9D9",
          "base-100": "#0b211c",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
