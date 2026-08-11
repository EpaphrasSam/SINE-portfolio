import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * ESLint 9 flat config. eslint-config-next 16 ships native flat exports,
 * so no FlatCompat shim is needed.
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    ignores: [
      '.next/**',
      'node_modules/**',
      // generated at build time
      'src/data/projectData.ts',
      'src/data/generatedSearchData.ts',
    ],
  },

  {
    // Build-time Node scripts, not app code.
    files: ['scripts/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  {
    files: ['src/**'],
    rules: {
      /**
       * React 19's new rule. Every remaining hit is a mount-only effect
       * reading browser state that cannot exist during SSR — localStorage,
       * matchMedia, location.hash — or resetting UI on a route change.
       * Those are one-shot, not cascading renders. Kept visible as a warning
       * so genuinely new violations still surface.
       */
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
