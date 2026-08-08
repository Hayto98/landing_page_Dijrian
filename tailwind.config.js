/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        p: {
          50: "hsl(42, 60%, 96%)",    // warm cream
          100: "hsl(40, 55%, 90%)",   // light gold
          200: "hsl(38, 50%, 78%)",   // soft gold
          300: "hsl(36, 55%, 65%)",   // warm gold
          400: "hsl(34, 60%, 52%)",   // durian gold
          500: "hsl(32, 70%, 42%)",   // deep gold
          600: "hsl(30, 65%, 30%)",   // brown gold
          700: "hsl(28, 60%, 22%)",   // dark brown
          900: "hsl(25, 55%, 15%)",   // very dark brown
          950: "hsl(22, 50%, 8%)",    // near black brown
        },
        n: {
          50: "hsl(40, 14%, 98%)",
          100: "hsl(38, 20%, 93%)",
          200: "hsl(36, 22%, 85%)",
          500: "hsl(30, 20%, 58%)",
          600: "hsl(28, 18%, 54%)",
          700: "hsl(25, 17%, 40%)",
          800: "hsl(22, 14%, 12%)",
        },
      },
    },
  },
  plugins: [],
};
