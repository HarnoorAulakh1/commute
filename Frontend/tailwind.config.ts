import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background": "linear-gradient(to right, #f9f9f9, #f0f0f0)",
      },
      colors: {
        white:"#e5e5e5",
        innerBg:"#3a3a3a",
        darkBg:"#1e1e1e",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

