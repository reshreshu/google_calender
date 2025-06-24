
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: 'class', // ✅ Required for manual dark/light mode toggle
  plugins: [],
};
