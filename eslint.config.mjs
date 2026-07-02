import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Duplicate working copy — never lint it.
    ".claude/**",
  ]),
  {
    // Next 16 ships the React Compiler hook rules as errors. These two fire on
    // patterns that are intentional here (localStorage hydration inside an
    // effect, and `window.location.href = url` navigation) and are performance
    // advisories rather than correctness bugs. Kept visible as warnings so CI
    // can enforce real errors without rewriting working UI. See handoff notes.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
]);

export default eslintConfig;
