import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginTS from '@typescript-eslint/eslint-plugin';
import parserTS from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // TypeScript Files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTS,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': pluginTS,
    },
    rules: {
      ...pluginTS.configs.recommended.rules,
      ...pluginTS.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/strict-boolean-expressions': 'warn',
    },
  },

  // JavaScript Files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Common rules for both TS/JS
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        __DEV__: true,
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      react: pluginReact,
      'react-native': pluginReactNative,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactNative.configs.all.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-native/no-color-literals': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/self-closing-comp': 'error',
      'react-native/no-raw-text': ['warn', { skip: ['CustomText'] }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Prettier integration
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
];
