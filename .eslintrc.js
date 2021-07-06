module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect'
    }
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-conosle': 'off',
    'react/prop-types': 'off',

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',

    '@typescript-eslint/no-var-required': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off'
  }
}
