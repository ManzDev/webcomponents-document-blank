import autoprefixer from "autoprefixer";
import presetEnv from "postcss-preset-env";

const ppeOptions = {
  stage: 3,
  features: {
    "nesting-rules": true,
    "case-insensitive-attributes": true,
    "hexadecimal-alpha-notation": true,
    "place-properties": true,
    "custom-selectors": true,
    "double-position-gradients": true,
    "color-hex-alpha": true,
    "logical-properties": true
  }
};

export default {
  inject: false,
  plugins: [presetEnv(ppeOptions), autoprefixer()]
};
