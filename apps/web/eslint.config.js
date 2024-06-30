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
];
