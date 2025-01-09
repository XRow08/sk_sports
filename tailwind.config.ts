import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral_12: "#1C2024",
        neutral_11: "#60646C",
        neutral_10: "#80838D",
        neutral_9: "#8B8D98",
        neutral_8: "#B9BBC6",
        neutral_7: "#CDCED6",
        neutral_6: "#D9D9E0",
        neutral_5: "#E0E1E6",
        neutral_4: "#E8E8EC",
        neutral_3: "#F0F0F3",
        neutral_2: "#F9F9FB",
        neutral_1: "#FCFCFC",
        dark_neutral_12: "#EDEEF0",
        dark_neutral_11: "#B0B4BA",
        dark_neutral_10: "#777B84",
        dark_neutral_9: "#696E77",
        dark_neutral_8: "#5A6169",
        dark_neutral_7: "#43484E",
        dark_neutral_6: "#363A3F",
        dark_neutral_5: "#323035",
        dark_neutral_4: "#272A2D",
        dark_neutral_3: "#212225",
        dark_neutral_2: "#18191B",
        dark_neutral_1: "#111113",
        green_9: "#29A335",
      },
    },
  },
  plugins: [],
} satisfies Config;
