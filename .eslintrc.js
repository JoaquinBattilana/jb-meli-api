module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'comma-dangle': "off",
    "arrow-parens": ["error", "as-needed"],
    "implicit-arrow-linebreak": "off",
    "no-trailing-spaces": "off"
  },
};
