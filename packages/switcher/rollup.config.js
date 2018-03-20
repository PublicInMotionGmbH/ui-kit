const build = require('../../utils/buildRollupConfiguration')

module.exports = build({
  rootDir: __dirname,
  pkg: require('./package.json'),
  environment: 'production',
  minify: true,
  input: 'index.js',
  output: 'dist/index.js'
})
