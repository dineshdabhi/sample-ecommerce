module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'airbnb-typescript'
  ],
  parserOptions: {
    project: './stocks-ecom/tsconfig.json',
  },
  rules: {
    'no-underscore-dangle': 'off',
  }
};
