const commander = require('commander')
const configDir = commander.configDir || './.storybook'

const buildConfig = require('@storybook/react/dist/server/config').default

const _buildConfig = process.env.NODE_ENV === 'production'
    ? require('@storybook/react/dist/server/config/webpack.config.prod').default
    : require('@storybook/react/dist/server/config/webpack.config').default

const env = process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'

const _config = _buildConfig(configDir)
const config = buildConfig(env, _config, configDir)

config.plugins.splice(6, 1)

config.module.rules[0].include.push(/\/@talixo\//)

config.module.rules.pop()

config.module.rules.push({
  test: /\.md$/,
  use: [{
    loader: 'markdown-loader'
  }]
})

config.module.rules.push({
  test: /\.sass$/,
  loaders: [ "style-loader", "css-loader", "sass-loader" ],
  exclude: /node_modules/
})

module.exports = config
