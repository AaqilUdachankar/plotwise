/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        canvas: "#FAFAF8",
        surface: "#FFFFFF",
        border: "#E7E5E1",
        grow: {
          50: "#F0FBF4",
          100: "#DCF6E4",
          400: "#3FB673",
          500: "#1E9E5A",
          600: "#167A46",
          700: "#0F5E35",
        },
        amber: {
          500: "#D9A441",
        },
        clay: {
          500: "#C2542E",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
