const { strictEslint } = require('@umijs/fabric');

strictEslint.rules = {
  ...strictEslint.rules,
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  '@typescript-eslint/no-non-null-assertion': 0,
  '@typescript-eslint/no-explicit-any': 0,
  '@typescript-eslint/camelcase': 0,
  '@typescript-eslint/no-empty-interface': 0,
  'arrow-body-style': 0,
  'max-len': ['error', { code: 300 }],
  'no-useless-constructor': 'off',
  '@typescript-eslint/no-useless-constructor': 'error',
  'no-underscore-dangle': ['error', { allow: ['_store'] }],
  'no-restricted-syntax': 0,
};

module.exports = {
  ...strictEslint,
  globals: {
    D_SERVER_URL: false,
    AMap: true,
  },
};
