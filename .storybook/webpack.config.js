const webpack = require('webpack')

/**
 * Build Webpack configuration for Storybook
 *
 * @param {object} config
 * @returns {object}
 */
function buildWebpackConfiguration (config) {
  // Set 'cache' property
  config.cache = true

  // Resolve only .js(on)? files
  config.resolve.extensions = [ '.js', '.json' ]

  // Parse JavaScript files from @talixo/ packages
  config.module.rules = config.module.rules.map(rule => {
    if (rule.test.toString() === '/\\.js$/') {
      rule.use[0].options.babelrc = true
      delete rule.use[0].options.presets
      delete rule.use[0].options.plugins
    }

    return rule
  })

  // Fix loader of Markdown files
  config.module.rules = config.module.rules.filter(rule => rule.test.toString() !== '/\\.md$/')
  config.module.rules.push({
    test: /\.md$/,
    use: [ 'html-loader', 'markdown-loader' ]
  })

  // Add loader for fonts
  config.module.rules.push({
    test: /\.(eot|ttf|svg|woff|woff2)$/,
    loader: 'url-loader',
    options: {
      limit: 8192
    }
  })

  // Add loader for SASS files
  config.module.rules.push({
    test: /\.sass$/,
    loaders: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
  })

  const DISABLED_PLUGINS = [
    'ProgressPlugin',
    'CaseSensitivePathsPlugin'
  ]

  // Remove default plugins, which makes building much slower
  config.plugins = config.plugins.filter(plugin => {
    return DISABLED_PLUGINS.indexOf(plugin.constructor.name) === -1
  })

  // Add chunk with vendor libraries
  // config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: module => module.resource && /node_modules/.test(module.resource)
  // }))

  // Fix manager to get vendor chunk as well
  for (const plugin of config.plugins) {
    if (plugin.constructor.name !== 'HtmlWebpackPlugin') {
      continue
    }

    if (plugin.options.filename !== 'index.html') {
      continue
    }

    plugin.options.chunks = [ 'manager', 'vendor' ]
  }

  return config
}

module.exports = buildWebpackConfiguration
