/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F07900",
        secondary: "#2A2A2A",
        accent: "#FF9933",
        background: "#151515",
        textPrimary: "#FFFFFF",
        textSecondary: "#B0B0B0",
        progressActive: "#F07900",
        progressInactive: "#444444",
        fab: "#F07900"
      }
    }
,
  },
  plugins: [],
}