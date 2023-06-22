module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue', 'tailwindcss'],
  rules: {},
  /* tailwindcss */
  'tailwindcss/no-custom-classname': [
    'warn',
    {
      config: 'tailwind.config.cjs'
    }
  ],
  'tailwindcss/classnames-order': 'off'
}
