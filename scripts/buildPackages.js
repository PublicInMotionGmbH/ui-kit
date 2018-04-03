const fs = require('fs')
const path = require('path')
const glob = require('glob')
const filesize = require('filesize')
const yargs = require('yargs')

const rollup = require('rollup').rollup
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

// Set up environment to production (for building)
process.env.NODE_ENV = 'production'

// Configure namespaces
const NAMESPACE = '@talixo'
const PREFIX = `${NAMESPACE}/`

// Configure paths to packages
const PACKAGES_PATH = path.join(__dirname, '..', 'packages')
const PACKAGES_PATTERN = path.join(PACKAGES_PATH, '*/')

/**
 * Build Rollup.js plugin for loading JSON files
 *
 * @returns {{transform: function(string, string): string|null}}
 */
const json = () => ({
  transform: (contents, filePath) => /\.json$/.test(filePath) ? `export default ${contents}` : null
})

/**
 * Get package configuration if it's available for build
 *
 * @param {string} dirPath
 * @returns {object|null}
 */
function getPackageConfiguration (dirPath) {
  // Get simple package name
  const name = path.basename(dirPath)

  // Load path for package.json for module
  const configPath = path.join(dirPath, 'package.json')

  // Validate if there is package.json in found package
  if (!fs.existsSync(configPath)) {
    console.warn(`Omitting: Package "${name}" doesn't have package.json`)
    return null
  }

  // Load package.json contents
  const config = require(configPath)

  // Omit building if it's directly specified that it should be omitted
  if (config.omitBuild) {
    return null
  }

  // Throw error if package has incorrect name
  if (!config.name || !config.name.startsWith(PREFIX)) {
    throw new Error(`Package "${name}" doesn't have correct name in package.json`)
  }

  // Omit when there is no ES6 module specified to build
  if (!config.module) {
    console.warn(`Omitting: Package "${name}" doesn't have "module" field in package.json`)
    return null
  }

  // Omit when there is no main file which should be available externally
  if (!config.main) {
    console.warn(`Omitting: Package "${name}" doesn't have "main" field in package.json`)
    return null
  }

  if (!config.main.endsWith('.js')) {
    console.warn(`Omitting: Package "${name}" "main" field is pointing to different file than JavaScript.`)
    return null
  }

  return config
}

/**
 * Analyze package in specified directory
 *
 * @param {string} dirPath
 * @returns {object|{id: string, name, input: string, dependencies: string[], output: {development: string, production: string}}}
 */
function analyzePackage (dirPath) {
  // Get simple package name
  const name = path.basename(dirPath)

  // Get package.json for specified package
  const config = getPackageConfiguration(dirPath)

  // Stop if it should be omitted
  if (!config) {
    return
  }

  // Get paths for input & output
  const inputPath = path.join(dirPath, config.module)
  const absolutePath = path.join(dirPath, config.main)

  // Extract information from main path
  const [ , fileName, dev ] = absolutePath.match(/^(.+?)(\.(?:dev|development))?\.js$/)

  // Equivalents for production names
  const productionNames = {
    '.dev': '.prod',
    '.development': '.production'
  }

  // Build development/production output paths
  const devPath = fileName + (dev || '') + '.js'
  const prodPath = fileName + (productionNames[dev] || '') + '.min.js'

  // Add package to list
  return {
    id: name,
    name: config.name,
    input: inputPath,
    dependencies: Object.keys(Object.assign({}, config.dependencies, config.peerDependencies)),
    output: {
      development: devPath,
      production: prodPath
    }
  }
}

/**
 * Get all available packages
 *
 * @returns {object[]|Array<{id: string, name, input: string, dependencies: string[], output: {development: string, production: string}}>}
 */
function getAllPackages () {
  // Find all possible packages
  const packages = glob.sync(PACKAGES_PATTERN)

  return packages
    .map(analyzePackage)
    .filter(Boolean)
}

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

  // Get all available packages
  const availablePackages = getAllPackages()

  // Get expected packages (either selected by CLI or all)
  const packages = only
    ? availablePackages.filter(x => only.indexOf(x.name) !== -1 || only.indexOf(x.id) !== -1)
    : availablePackages

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
