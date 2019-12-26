import { basicLoader } from "./loader.config.js";

export default {
  exclude: "node_modules/**",
  presets: ["@babel/preset-modules"],
  plugins: [
    [
      "babel-plugin-replace-imports",
      {
        test: /^[^.].+$/i,
        replacer: basicLoader
      },
      "unpkg esm"
    ]
  ]
};
