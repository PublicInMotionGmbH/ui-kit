const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const commander = require('commander')
const configDir = commander.configDir || './.storybook'

const buildConfig = require('@storybook/react/dist/server/config').default

const _buildConfig = process.env.NODE_ENV === 'production'
    ? require('@storybook/react/dist/server/config/webpack.config.prod').default
    : require('@storybook/react/dist/server/config/webpack.config').default

const env = process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'

// Build default Webpack configuration for Storybook
const _config = _buildConfig(configDir)
const config = buildConfig(env, _config, configDir)

// Parse JavaScript files from @talixo/ packages
config.module.rules = config.module.rules.map(rule => {
  if (rule.test.toString() !== '/\\.jsx?$/') {
    rule.include = [ /\/@talixo\// ]
  }

  return rule
})

// Fix loader of Markdown files
config.module.rules = config.module.rules .filter(rule => rule.test.toString() !== '/\\.md$/')
config.module.rules.push({
  test: /\.md$/,
  use: [ { loader: 'markdown-loader' } ]
})


// Add loader for fonts
config.module.rules.push({
  test: /\.(eot|ttf|svg|woff|woff2)$/,
  loader: 'url-loader?limit=10000'
})

// Add loader for SASS files
config.module.rules.push({
  test: /\.sass$/,
  loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
})

// Remove HotModuleReplacementPlugin, which causes errors in Storybook hot reloading
config.plugins = config.plugins.filter(plugin => {
  return plugin.constructor.name !== 'HotModuleReplacementPlugin'
})

// Add HardSourceWebpackPlugin for caching
config.plugins.push(new HardSourceWebpackPlugin())

module.exports = config
