import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    extend: {
      colors: {
        borderColor: "#D9D9D9",
        sunColor: "#FFDC00",
        moonColor: "#304097",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
