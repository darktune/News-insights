import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",
          light: "#F8FAFC",
          accent: "#0ea5e9", // Brand blue/green accent
          subtle: "#94a3b8"
        },
      },
      fontFamily: {
        sans: ['var(--font-grotesk)', 'sans-serif'],
        serif: ['var(--font-editorial)', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
