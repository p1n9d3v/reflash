// .prettierrc.js
module.exports = {
  tabWidth: 4,
  plugins: ["prettier-plugin-tailwindcss"],

  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx", "cn", "cva"],

  // 파일별 설정
  overrides: [
    {
      files: "*.{js,jsx,ts,tsx}",
      options: {
        parser: "babel-ts",
      },
    },
  ],
};
