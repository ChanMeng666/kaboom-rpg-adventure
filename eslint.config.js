import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        HTMLCanvasElement: "readonly",
        CanvasRenderingContext2D: "readonly",
        Image: "readonly",
        Set: "readonly",
        Map: "readonly",
        localStorage: "readonly",
        alert: "readonly",
        confirm: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
    },
  },
  {
    ignores: ["dist/", "node_modules/", "public/"],
  },
];
