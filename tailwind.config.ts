import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        "work-sans": ["var(--font-work-sans)", "sans-serif"],
        "geist-sans": ["var(--font-geist-sans)", "sans-serif"],
        "geist-mono": ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
        dm: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
        work: ["var(--font-work-sans)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "color-primary": "#08595a",
        "color-secondary": "#15b697",
        "color-third": "#E0F5FF",
        "color-deepblue": "#4589F4",
        "para-color": "#5C728E",
        "color-black": "#031D36",
        "color-white": "#ffffff",
        "color-check-up": "#F7588D",
        "color-report": "#FFC422",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "service-3": "url('./images/breadcrumb_bg.jpg')", // Update path if needed
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
};
export default config;
