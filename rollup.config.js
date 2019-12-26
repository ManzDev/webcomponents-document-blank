import multi from "rollup-plugin-multi-input";
import copy from "rollup-plugin-copy-glob";
import alias from "@rollup/plugin-alias";
import image from "@rollup/plugin-image";
import babel from "rollup-plugin-babel";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";

import babelOptions from "./babel.config.esm.js";
import aliasesConfig from "./aliases.json";
import postcssOptions from "./postcss.config.esm.js";

export default [
  {
    input: ["src/components/**/*.js"],
    output: {
      dir: "dist/",
      format: "esm"
    },
    plugins: [
      alias({ entries: aliasesConfig }),
      multi(),
      babel(babelOptions),
      json(),
      postcss(postcssOptions),
      copy(
        [
          { files: "src/{index.html,index.css,wcloader.js}", dest: "dist/" },
          { files: "src/public/**/*", dest: "dist/" },
          { files: "src/assets/**/*", dest: "dist/assets/" }
        ],
        {
          verbose: true,
          watch: process.env.NODE_ENV === "dev"
        }
      )
    ]
  }
];
