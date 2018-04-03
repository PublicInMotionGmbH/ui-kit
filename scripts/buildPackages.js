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

function json () {
  return {
    transform (contents, filePath) {
      if (!/\.json$/.test(filePath)) {
        return null
      }

      return `export default ${contents}`
    }
  }
}

// Set up environment to production (for building)
process.env.NODE_ENV = 'production'

// Configure namespaces
const NAMESPACE = '@talixo'
const PREFIX = `${NAMESPACE}/`

// Configure paths to packages
const PACKAGES_PATH = path.join(__dirname, '..', 'packages')
const PACKAGES_PATTERN = path.join(PACKAGES_PATH, '*/')

function analyzePackage (dirPath) {
  // Get simple package name
  const name = path.basename(dirPath)

  // Load path for package.json for module
  const configPath = path.join(dirPath, 'package.json')

  // Validate if there is package.json in found package
  if (!fs.existsSync(configPath)) {
    console.warn(`Omitting: Package "${name}" doesn't have package.json`)
    return
  }

  // Load package.json contents
  const config = require(configPath)

  // Omit building if it's directly specified that it should be omitted
  if (config.omitBuild) {
    return
  }

  // Throw error if package has incorrect name
  if (!config.name || !config.name.startsWith(PREFIX)) {
    throw new Error(`Package "${name}" doesn't have correct name in package.json`)
  }

  // Omit when there is no ES6 module specified to build
  if (!config.module) {
    console.warn(`Omitting: Package "${name}" doesn't have "module" field in package.json`)
    return
  }

  // Omit when there is no main file which should be available externally
  if (!config.main) {
    console.warn(`Omitting: Package "${name}" doesn't have "main" field in package.json`)
    return
  }

  // Get paths for input & output
  const inputPath = path.join(dirPath, config.module)
  const absolutePath = path.join(dirPath, config.main)

  // Extract information from main path
  const match = absolutePath.match(/^(.+?)(\.(?:dev|development))?\.js$/)

  // Omit package if it's not pointing to JS file
  if (!match) {
    console.warn(`Omitting: Package "${name}" "main" field is pointing to different file than JavaScript.`)
    return
  }

  // Equivalents for production names
  const productionNames = {
    '.dev': '.prod',
    '.development': '.production'
  }

  // Build development/production output paths
  const devPath = match[1] + (match[2] || '') + '.js'
  const prodPath = match[1] + (productionNames[match[2]] || '') + '.min.js'

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

function getAllPackages () {
  // Find all possible packages
  const packages = glob.sync(PACKAGES_PATTERN)

  return packages
    .map(analyzePackage)
    .filter(Boolean)
}

async function buildPackage (pack, environment) {
  const input = pack.input
  const output = pack.output[environment]

  const isProduction = environment === 'production'

  const dependencies = pack.dependencies

  const result = {
    input: input,
    external: dependencies,
    output: {
      file: output,
      exports: 'named',
      format: 'cjs'
    },
    plugins: [
      resolve({ extensions: [ '.js', '.json' ] }),
      json(),
      babel({ babelrc: true, externalHelpers: false, plugins: [ 'external-helpers' ] }),
      commonjs()
    ]
  }

  if (isProduction) {
    result.plugins.push(replace({
      __DEV__: isProduction ? 'false' : 'true',
      'process.env.NODE_ENV': JSON.stringify(environment)
    }))

    result.plugins.push(uglify())
  } else {
    replace({
      __DEV__: 'process.env.NODE_ENV !== "production"'
    })
  }

  const b = await rollup(result)

  await b.write(result.output)

  return fs.statSync(result.output.file)
}

async function main () {
  const { only } = yargs.array('only').argv

  const availablePackages = getAllPackages()

  const packages = only
    ? availablePackages.filter(x => only.indexOf(x.name) !== -1 || only.indexOf(x.id) !== -1)
    : availablePackages

  process.stdout.write(`Found ${packages.length} packages to build.\n`)

  for (const pack of packages) {
    process.stdout.write(`Building ${pack.name}...\n  development: `)

    const dev = await buildPackage(pack, 'development')

    process.stdout.write(`${filesize(dev.size)}\n  production: `)

    const prod = await buildPackage(pack, 'production')

    process.stdout.write(`${filesize(prod.size)}\n`)
  }
}

main().catch(err => setTimeout(() => { throw err }))
