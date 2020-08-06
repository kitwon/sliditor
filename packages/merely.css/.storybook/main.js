const { resolve } = require('path')
const pagePath = resolve(__dirname, '../docs/')

module.exports = {
  addons: ['@storybook/addon-viewport'],
  webpackFinal: (config) => {
    const babel = config.module.rules[0].use[0]

    config.module.rules = config.module.rules.filter(rule => {
      return !rule.test.test('test.md')
    })

    config.module.rules.push({
      test: /\.mdx?$/i,
      include: pagePath,
      loaders: [
        babel,
        {
          loader: require.resolve('./story-loader.js'),
          options: {
            sourcePath: pagePath
          }
        }
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass')
          }
        }
      ]
    })

    return config
  }
};
