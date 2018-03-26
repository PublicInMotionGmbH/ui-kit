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
    if (rule.test.toString() === '/\\.jsx?$/') {
      rule.test = /\.js$/
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
    loader: 'url-loader'
  })

  // Add loader for SASS files
  config.module.rules.push({
    test: /\.sass$/,
    loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
  })

  const DISABLED_PLUGINS = [
    'ProgressPlugin',
    'CaseSensitivePathsPlugin'
  ]

  // Remove HotModuleReplacementPlugin, which causes errors in Storybook hot reloading
  config.plugins = config.plugins.filter(plugin => {
    return DISABLED_PLUGINS.indexOf(plugin.constructor.name) === -1
  })

  return config
}

module.exports = buildWebpackConfiguration
