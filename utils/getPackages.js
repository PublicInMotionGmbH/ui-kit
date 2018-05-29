const path = require('path')
const fs = require('fs')
const glob = require('glob')

// Configure namespaces
const NAMESPACE = '@talixo'
const PREFIX = `${NAMESPACE}/`

// Configure paths to packages
const PACKAGES_PATH = path.join(__dirname, '..', 'packages')
const PACKAGES_PATTERN = path.join(PACKAGES_PATH, '*/')

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
 * @returns {object|{id: string, name, input: string, dependencies: string[], omitBuild: boolean, output: {development: string, production: string}}}
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
    readmePath: path.join(dirPath, 'README.md'),
    configPath: path.join(dirPath, 'package.json'),
    config: config,
    input: inputPath,
    dependencies: Object.keys(Object.assign({}, config.dependencies, config.peerDependencies)),
    omitBuild: !!config.omitBuild,
    output: {
      development: devPath,
      production: prodPath
    }
  }
}

/**
 * Get all available packages (or these which match parameter)
 *
 * @param {string[]} [only]  package names or IDs to get
 * @returns {object[]|Array<{id: string, name, input: string, dependencies: string[], omitBuild: boolean, output: {development: string, production: string}}>}
 */
function getAllPackages (only) {
  // Find all possible packages
  const packages = glob.sync(PACKAGES_PATTERN)

  // Analyze packages to see if they are correct
  const availablePackages = packages.map(analyzePackage).filter(Boolean)

  return only && only.length
    ? availablePackages.filter(x => only.indexOf(x.id) !== -1 || only.indexOf(x.name) !== -1)
    : availablePackages
}

module.exports = getAllPackages
