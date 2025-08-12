import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginTS from '@typescript-eslint/eslint-plugin';
import parserTS from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
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
    },
  },
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
      ...pluginReactNative.configs.all.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 0,
      'react-native/no-color-literals': 0
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
];
