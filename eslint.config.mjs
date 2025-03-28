import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  { ignores: ['**/*.test.js'] },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      react: pluginReact,
    },
    extends: [
      "js/recommended",
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      "react/prop-types": "off",
    },
  },
]);
