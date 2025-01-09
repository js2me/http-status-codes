module.exports = {
  extends: [require.resolve('js2me-eslint-config/react')],
  rules: {
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/consistent-function-scoping': 'off'
  },
  overrides: [
    {
      files: [
        "data/*.ts",
        "vite.config.ts"
      ],
      parserOptions: {
        project: 'tsconfig.node.json',
      },
    }
  ]
};
