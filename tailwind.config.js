/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8",
        secondary: "#E8F0FE",
        accent: "#FFE8DC",
        background: "#FFFFFF",
        textPrimary: "#1F2937",
        textSecondary: "#6B7280",
        progressActive: "#1A73E8",
        progressInactive: "#D1D5DB",
        fab: "#1A73E8"
      }
    }
,
  },
  plugins: [],
}