import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
          primary: {
            100: "#F50B2E",
            200: "#E91938",
            300: "#E2223F",
            400: "#D92A44",
            500: "#c83c51",
            600: "#A53042",
            700: "#942938",
            800: "#862231",
            900: "#721D2A",
            950: "#601621",
          },
      },
    },
  },
  plugins: [],
} satisfies Config;
