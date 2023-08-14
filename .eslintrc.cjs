/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['prettier', 'vue'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': 'warn',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'no-useless-return': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    '@typescript-eslint/no-unused-vars': 'off', // disable for setup script
    // '@typescript-eslint/no-non-null-assertion': 'off', // disable for const { ... } = getCurrentInstance()!.appContext.config.globalProperties
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
