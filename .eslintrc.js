module.exports = {
  root: true,
  env: {
    node: true,
    // https://eslint.org/docs/user-guide/configuring
    // For ES6 syntax, use `{ "parserOptions": { "ecmaVersion": 6 } }`
    // For new ES6 global variables, use `{ "env": { "es6": true } }` (this setting enables ES6 syntax automatically)
    es6: true
  },
  parserOptions: {
    // https://github.com/eslint/eslint/issues/10137#issuecomment-438131515
    ecmaVersion: 2018
  },
  extends: [
    // https://eslint.org/docs/rules
    'eslint:recommended',
    // https://github.com/prettier/eslint-config-prettier
    'plugin:prettier/recommended'
  ],
  // https://github.com/prettier/eslint-plugin-prettier
  plugins: ['prettier'],
  rules: {
    // Only allow `console.log` in development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Only allow debugger in development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
