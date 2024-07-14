import baseConfig, { restrictEnvAccess } from "@knowingly/eslint-config/base";
import nextjsConfig from "@knowingly/eslint-config/nextjs";
import reactConfig from "@knowingly/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
  {
    rules: {
      // Disable the prefer-nullish-coalescing rule
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "turbo/no-undeclared-env-vars": "off",
    },
  },
];
