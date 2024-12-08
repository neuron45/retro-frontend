/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'restro-green-light': "#fff0f0",
        'restro-green': "#FF4D4D",
        'restro-green-dark': "#d14026",
        'restro-border-green-light': "#ffe3e3",
        'restro-superadmin-widget-bg': "#BEDC74",
        'restro-superadmin-text-green': "#387F39",
        'restro-superadmin-text-black': "#444444"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: "light",
  }
}

