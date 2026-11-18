import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
        rules: {
            "@typescript-eslint/no-floating-promises": "error",      // an un-awaited promise is a bug
            "@typescript-eslint/no-misused-promises": "error",       // `if (promise)` is always true
            "@typescript-eslint/consistent-type-imports": "warn"     // import type { Game } in client components
        }
    },
    globalIgnores([".next/**", "next-env.d.ts"])
]);