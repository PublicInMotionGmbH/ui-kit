// const commonjs = require('rollup-plugin-commonjs')
// const replace = require('rollup-plugin-replace')
// const babel = require('rollup-plugin-babel')
// const resolve = require('rollup-plugin-node-resolve')
// const uglify = require('rollup-plugin-uglify')
//
// const pkg = require('./package.json')
// const dependencies = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies))
//
// module.exports = {
//   input: 'index.js',
//   output: {
//     file: 'dist/index.js',
//     exports: 'named',
//     format: 'cjs'
//   },
//   plugins: [
//     resolve(),
//     babel({ babelrc: true }),
//     commonjs(),
//     replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
//     uglify()
//   ],
//   external: dependencies
// }

// EXPECTED CONFIGURATION:

const build = require('../../utils/buildRollupConfiguration')

module.exports = build({
  rootDir: __dirname,
  pkg: require('./package.json'),
  environment: 'production',
  minify: true,
  input: 'index.js',
  output: 'dist/index.js'
})
