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
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: {
          "50": "#effaf4",
          "100": "#d8f3e2",
          "200": "#b3e7c9",
          "300": "#82d3aa",
          "400": "#4eb987",
          "500": "#2b9e6c",
          "600": "var(--main-color)",
          "700": "#176547",
          "800": "#14513a",
          "900": "#124230",
          "950": "#09251b",
        },
        accent: {
          "50": "#fafbeb",
          "100": "#f5f6cb",
          "200": "#eeee9a",
          "300": "#e4de60",
          "400": "#dacc35",
          "500": "var(--accent-color)",
          "600": "#af901f",
          "700": "#8c6b1c",
          "800": "#75561e",
          "900": "#64481f",
          "950": "#3a260e",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
