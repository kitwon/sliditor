/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const { addBabelPlugins, override, addPostcssPlugins } = require('customize-cra')

module.exports = override(
  ...addBabelPlugins('emotion'),
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')])
)
