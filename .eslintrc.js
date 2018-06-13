module.exports = {
  env: {
    browser : true,
    amd     : true,
    jquery  : true,
    node    : true,
    es6     : true,
    jest    : true
  },
  parser: "babel-eslint",
  extends: [
    'airbnb'
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  overrides: {
    "files": ["src/**/*.jsx", "src/**/*.js"],
    "rules": {
      'jsx-a11y/anchor-is-valid': ['error', {
        components: [],
        specialLink: [],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      }],
      'import/no-unresolved': ['error', { commonjs: true, caseSensitive: false }],
      'no-underscore-dangle': ['error', {
        allow: [],
        allowAfterThis: true,
        allowAfterSuper: false,
        enforceInMethodNames: false,
      }],
    }
  }
};
