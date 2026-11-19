const js = require('@eslint/js');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');
const tseslint = require('typescript-eslint');

/** Mesmas regras de código limpo do painel web (documento 04 M0). */
module.exports = tseslint.config(
  {
    ignores: ['node_modules', '.expo', 'dist', 'android', 'ios', 'src/api/schema.d.ts', 'expo-env.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { ecmaVersion: 2023 },
    linterOptions: { noInlineConfig: true, reportUnusedDisableDirectives: 'error' },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "TSAsExpression:not([typeAnnotation.typeName.name='const'])",
          message: 'Sem `as` para forçar tipo: use type guard ou os tipos do contrato.',
        },
      ],
      'max-depth': ['error', 3],
      'max-params': ['error', 4],
      eqeqeq: 'error',
      'no-console': 'error',
    },
  },
  {
    files: ['*.js', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  { files: ['scripts/**/*.mjs'], languageOptions: { sourceType: 'module' } },
);
