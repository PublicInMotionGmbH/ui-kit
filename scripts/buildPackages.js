const path = require('path')
const fs = require('fs')
const filesize = require('filesize')
const yargs = require('yargs')
const rimraf = require('rimraf').sync

const rollup = require('rollup').rollup
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

const getPackages = require('../utils/getPackages')
const runCommand = require('./runCommand')

// Set up environment to production (for building)
process.env.NODE_ENV = 'production'

const nodePath = process.argv[0]
const babelCliPath = path.join(__dirname, '..', 'node_modules', '.bin', 'babel')

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
    external: id => !!pack.dependencies.find(dependency => dependency === id || id.startsWith(dependency + '/')),
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
    process.stdout.write(`Building ${pack.name}...\n`)

    // Build development package
    process.stdout.write('  development: ')
    const dev = await buildPackage(pack, 'development')

    process.stdout.write(`${filesize(dev.size)}\n`)

    // Build production-ready package
    process.stdout.write('  production: ')
    const prod = await buildPackage(pack, 'production')

    process.stdout.write(`${filesize(prod.size)}\n`)

    // Building 'src' into 'lib' directory
    process.stdout.write('  libs:')

    if (pack.srcPath) {
      await rimraf(pack.libPath)

      const result = await runCommand.silent(
        nodePath, babelCliPath, pack.srcPath,
        '--out-dir', pack.libPath,
        '--plugins', 'transform-es2015-modules-commonjs'
      )

      process.stdout.write('\n')
      process.stdout.write('    ' + result.split('\n').join('\n    ').split(pack.dirPath).join('') + '\n')
    } else {
      process.stdout.write(' missing SRC directory\n')
    }
  }
}

// Run procedure
main().catch(err => setTimeout(() => { throw err }))
