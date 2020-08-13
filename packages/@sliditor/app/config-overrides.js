/* eslint-disable @typescript-eslint/no-var-requires */
const { addBabelPlugins, override } = require('customize-cra')

module.exports = override(...addBabelPlugins('emotion'))
