const path = require('path')
const spawn = require('child_process').spawn
const getPackages = require('../utils/getPackages')

// Find 'jest' & 'node' paths
const nodePath = process.argv[0]
const jestPath = path.join(__dirname, '..', 'node_modules', 'jest', 'bin', 'jest')

const args = process.argv.slice(2)

// Find --only flag
const onlyIndex = args.indexOf('--only')

// Find package names which should be ran
const only = []

if (onlyIndex !== -1) {
  args.splice(onlyIndex, 1)

  while (onlyIndex !== args.length) {
    if (args[onlyIndex].startsWith('-')) {
      break
    }

    only.push(args.splice(onlyIndex, 1)[0])
  }
}

// Get all packages which should be running
const packages = getPackages(only)

// Close if no tests have been selected
if (packages.length === 0) {
  console.log('You have selected 0 packages to run tests.')
  process.exit(0)
}

// Build patterns to find tests
const packagesPattern = packages.length === 1 ? packages[0].id : '{' + packages.map(x => x.id).join(',') + '}'
const testsPattern = `<rootDir>/packages/${packagesPattern}/tests/**/*.test.js`

// Build arguments for Jest runner
const runnerArgs = [
  jestPath,
  '--config', path.resolve(path.join(__dirname, '..', 'tests', 'config.js')),
  '--rootDir', path.resolve(path.join(__dirname, '..')),
  ...args
]

// Build options for runner
const runnerOptions = {
  env: Object.assign({
    TESTS_PATTERN: testsPattern
  }, process.env),
  stdio: 'inherit'
}

// Show color output when it's not on CI
if (!process.env.CI) {
  runnerArgs.splice(1, 0, '--colors')
}

// Run tests
const runner = spawn(nodePath, runnerArgs, runnerOptions)

runner.on('close', code => process.exit(code))
