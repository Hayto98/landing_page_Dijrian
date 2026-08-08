/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        p: {
          50: "hsl(84, 60%, 96%)",    // soft fresh mint light
          100: "hsl(84, 55%, 90%)",   // soft lime light
          200: "hsl(86, 50%, 78%)",   // organic leaf light
          300: "hsl(88, 55%, 60%)",   // vibrant leaf green
          400: "hsl(90, 60%, 45%)",   // fresh orchard green
          500: "hsl(95, 65%, 34%)",   // rich brand forest green
          600: "hsl(100, 60%, 26%)",  // deep forest green
          700: "hsl(105, 55%, 20%)",  // dark organic green
          800: "hsl(110, 50%, 15%)",  // dark pine green
          900: "hsl(115, 45%, 11%)",  // ultra deep green
          950: "hsl(120, 50%, 7%)",   // near black forest green
        },
        amber: {
          50: "hsl(70, 70%, 97%)",
          100: "hsl(72, 75%, 90%)",
          200: "hsl(74, 80%, 80%)",
          300: "hsl(76, 85%, 68%)",
          400: "hsl(78, 90%, 52%)",
          500: "hsl(80, 95%, 42%)",
          600: "hsl(85, 90%, 32%)",
          700: "hsl(90, 85%, 24%)",
          800: "hsl(95, 80%, 18%)",
          900: "hsl(100, 75%, 12%)",
        },
        n: {
          50: "hsl(80, 15%, 98%)",
          100: "hsl(80, 18%, 94%)",
          200: "hsl(85, 20%, 86%)",
          500: "hsl(90, 18%, 55%)",
          600: "hsl(95, 16%, 45%)",
          700: "hsl(100, 15%, 35%)",
          800: "hsl(110, 14%, 12%)",
        },
      },
    },
  },
  plugins: [],
};
