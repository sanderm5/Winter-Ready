import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nord-Nordic Arctic color palette
        "polar-night": "#2e3440",
        "polar-night-light": "#3b4252",
        "arctic-blue": "#0f172a",
        "fjord-deep": "#1e3a5f",
        "frost": "#eceff4",
        "snow-white": "#f8fafc",
        "ice-blue": "#e0f2fe",
        "glacier": "#88c0d0",
        "aurora-teal": "#8fbcbb",
        "aurora-green": "#a3be8c",
        "northern-lights": "#5e81ac",
        "midnight-blue": "#4c566a",
        // Safety colors
        "warning-orange": "#f97316",
        "danger-red": "#bf616a",
        "safe-green": "#a3be8c",
        // Legacy alias
        "winter-blue": "#2e3440",
      },
    },
  },
  plugins: [],
};
export default config;
