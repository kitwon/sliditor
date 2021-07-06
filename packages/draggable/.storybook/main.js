module.exports = {
  stories: ['../stories/**/*.stories.@(js|mdx|tsx)'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'babel-loader'
    })

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass')
          }
        }
      ]
    })

    config.resolve.extensions.push('.ts')
    config.resolve.extensions.push('.tsx')
    
    return config
  }
};
