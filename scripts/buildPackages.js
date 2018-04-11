const fs = require('fs')
const filesize = require('filesize')
const yargs = require('yargs')

const rollup = require('rollup').rollup
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

const getPackages = require('../utils/getPackages')

// Set up environment to production (for building)
process.env.NODE_ENV = 'production'

/**
 * Build Rollup.js plugin for loading JSON files
 *
 * @returns {{transform: function(string, string): string|null}}
 */
const json = () => ({
  transform: (contents, filePath) => /\.json$/.test(filePath) ? `export default ${contents}` : null
})

/**
 * Build package and save output to specified file
 *
 * @param {object|{id: string, name, input: string, dependencies: string[], output: {development: string, production: string}}} pack
 * @param {string} environment
 * @returns {Promise<object|{ size: int }>}
 */
async function buildPackage (pack, environment) {
  // Create helper variable to check if it's production build
  const isProduction = environment === 'production'

  // Build basic Rollup.js configuration
  const config = {
    input: pack.input,
    external: pack.dependencies,
    output: {
      file: pack.output[environment],
      exports: 'named',
      format: 'cjs'
    },
    plugins: [
      resolve({ extensions: [ '.js', '.json' ] }),
      json(),
      babel({ babelrc: true, externalHelpers: false, plugins: [ 'external-helpers' ] }),
      commonjs(),
      replace({ __DEV__: 'process.env.NODE_ENV !== "production"' })
    ]
  }

  // Minify output for specified environment
  if (isProduction) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(environment)
    }))

    config.plugins.push(uglify())
  }

  // Build the package
  const b = await rollup(config)

  // Save it to output destination
  await b.write(config.output)

  // Return information about output file
  return fs.statSync(config.output.file)
}

/**
 * Run building procedure for expected packages
 *
 * @returns {Promise}
 */
async function main () {
  // Get array of packages to build (if passed through CLI)
  const { only } = yargs.array('only').argv

  // Get all available packages which should be built
  const packages = getPackages(only).filter(x => !x.omitBuild)

  process.stdout.write(`Found ${packages.length} packages to build.\n`)

  // Iterate over all packages
  for (const pack of packages) {
    process.stdout.write(`Building ${pack.name}...\n  development: `)

    // Build development package
    const dev = await buildPackage(pack, 'development')

    process.stdout.write(`${filesize(dev.size)}\n  production: `)

    // Build production-ready package
    const prod = await buildPackage(pack, 'production')

    process.stdout.write(`${filesize(prod.size)}\n`)
  }
}

// Run procedure
main().catch(err => setTimeout(() => { throw err }))
