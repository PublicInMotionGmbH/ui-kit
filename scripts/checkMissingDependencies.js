const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const chalk = require('chalk')
const glob = require('glob')

const getPackages = require('../utils/getPackages')

const jsImportRegexGlobal = /import\s+.*?from\s+(?:(?:'([^']+)')|(?:"([^"]+)"))/gm
const jsImportRegex = /import\s+.*?from\s+(?:(?:'([^']+)')|(?:"([^"]+)"))/m
const jsRequireRegexGlobal = /require\s*\(\s*(?:(?:"([^"]+)")|(?:'([^']+)'))\s*\)/gm
const jsRequireRegex = /require\s*\(\s*(?:(?:"([^"]+)")|(?:'([^']+)'))\s*\)/m

const sassImportRegexGlobal = /@import\s+(?:(?:'~([^']+)')|(?:"~([^"]+)"))/gm
const sassImportRegex = /@import\s+(?:(?:'~([^']+)')|(?:"~([^"]+)"))/m

const dependencyNameRegex = /^((?:@[^/]+\/[^/]+)|(?:[^.][^/]*))/

// Config

const nodejsNativeModules = [ 'fs', 'path', 'stream', 'util' ]
const mutedDependencies = [
  '@storybook/addon-actions', // Storybook only
  'enzyme' // Tests only
]
const mutedLocallyDependencies = {
  '@talixo/country-flag': [
    'flagkit-web' // Used to build sprites
  ]
}

// Action

function isInternalFile (filePath) {
  return filePath === 'stories.js' || /^(scripts|tests)[/\\]/.test(filePath)
}

function isNotInternalFile (filePath) {
  return !isInternalFile(filePath)
}

function toLibraryName (dependencyPath) {
  const match = dependencyPath.match(dependencyNameRegex)

  return match && match[1] ? match[1] : null
}

function findJsDependencies (filePath) {
  const contents = fs.readFileSync(filePath, 'utf8')

  const requires = (contents.match(jsRequireRegexGlobal) || []).map(x => x.match(jsRequireRegex))
  const imports = (contents.match(jsImportRegexGlobal) || []).map(x => x.match(jsImportRegex))

  return requires.concat(imports)
    .map(x => x[1] || x[2]) // Get dependency path
    .map(toLibraryName) // Map to library name
    .filter(Boolean) // Get only absolute paths
    .filter((x, i, arr) => arr.indexOf(x) === i) // Get only unique values
}

function findStyleDependencies (filePath) {
  const contents = fs.readFileSync(filePath, 'utf8')

  const imports = (contents.match(sassImportRegexGlobal) || []).map(x => x.match(sassImportRegex))

  return imports
    .map(x => x[1] || x[2]) // Get dependency path
    .map(toLibraryName) // Map to library name
    .filter(Boolean) // Get only absolute paths
    .filter((x, i, arr) => arr.indexOf(x) === i) // Get only unique values
}

async function main () {
  // Get array of packages to build (if passed through CLI)
  const { only, all } = yargs.array('only').boolean('all').argv

  let hasProblems = false

  // Get packages which should be updated
  const packages = getPackages(only)

  for (const pkg of packages) {
    const dirPath = pkg.dirPath
    const srcPath = pkg.srcPath
    const stylesPath = pkg.dirPath ? path.join(pkg.dirPath, 'styles') : null

    const storiesFilePath = path.join(dirPath, 'stories.js')
    const hasStoriesFile = fs.existsSync(storiesFilePath)

    const jsFilePaths = srcPath ? glob.sync(path.join(srcPath, '**/*.js')) : []
    const jsUtilsFilePaths = dirPath ? glob.sync(path.join(dirPath, 'utils/**/*.js')) : []
    const jsScriptsFilePaths = dirPath ? glob.sync(path.join(dirPath, 'scripts/**/*.js')) : []
    const jsTestFilePaths = dirPath ? glob.sync(path.join(dirPath, 'tests/**/*.js')) : []
    const jsFiles = jsFilePaths
      .concat(jsUtilsFilePaths).concat(jsScriptsFilePaths).concat(jsTestFilePaths)
      .concat(hasStoriesFile ? [ storiesFilePath ] : [])

    const sassFilePaths = stylesPath ? glob.sync(path.join(stylesPath, '**/*.sass')) : []
    const scssFilePaths = stylesPath ? glob.sync(path.join(stylesPath, '**/*.scss')) : []
    const stylesFilePaths = sassFilePaths.concat(scssFilePaths)

    const dependencies = {}

    for (const filePath of jsFiles) {
      const relativeFilePath = path.relative(dirPath, filePath)
      const fileDependencies = findJsDependencies(filePath)

      for (const dependency of fileDependencies) {
        if (!dependencies[dependency]) {
          dependencies[dependency] = []
        }

        dependencies[dependency].push(relativeFilePath)
      }
    }

    for (const filePath of stylesFilePaths) {
      const relativeFilePath = path.relative(dirPath, filePath)
      const fileDependencies = findStyleDependencies(filePath)

      for (const dependency of fileDependencies) {
        if (!dependencies[dependency]) {
          dependencies[dependency] = []
        }

        dependencies[dependency].push(relativeFilePath)
      }
    }

    const pkgDependencies = pkg.config.dependencies || {}
    const pkgPeerDependencies = pkg.config.peerDependencies || {}
    const pkgDevDependencies = pkg.config.devDependencies || {}
    const pkgOptionalDependencies = pkg.config.optionalDependencies || {}

    const result = []
    const dependenciesNamesList = []
      .concat(Object.keys(pkgDependencies))
      .concat(Object.keys(pkgPeerDependencies))
      .concat(Object.keys(pkgDevDependencies))
      .concat(Object.keys(pkgOptionalDependencies))
      .concat(Object.keys(dependencies))
      .filter((x, i, arr) => arr.indexOf(x) === i)

    for (const name of dependenciesNamesList) {
      const requiredBy = dependencies[name] || []
      const isPeer = !!pkgPeerDependencies[name]
      const isOptional = !!pkgOptionalDependencies[name]
      const isDev = !!pkgDevDependencies[name]
      const isRequired = !!pkgDependencies[name]

      const isInternal = requiredBy.length > 0 && requiredBy.filter(isInternalFile).length === requiredBy.length
      const isRegular = requiredBy.filter(isNotInternalFile).length > 0

      // Ignore native node modules used in internal tools
      if (isInternal && nodejsNativeModules.indexOf(name) !== -1) {
        continue
      }

      const isMuted = (
        mutedDependencies.indexOf(name) !== -1 ||
        (mutedLocallyDependencies[pkg.name] && mutedLocallyDependencies[pkg.name].indexOf(name) !== -1)
      )

      const shouldBePeer = !isRequired && !isOptional && isRegular
      const shouldBeDev = shouldBePeer || requiredBy.length > 0

      const requiredByText = requiredBy.length === 0
        ? undefined
        : requiredBy.length > 2
          ? requiredBy.slice(0, 2).join(' & ') + ` + ${requiredBy.length - 2} more`
          : requiredBy.join(', ')

      const warnings = []

      if (!requiredBy.length) {
        warnings.push('It is not used')
      } else {
        if (shouldBePeer && !isPeer) {
          warnings.push('Should be peerDependency')
        } else if (!shouldBePeer && isPeer) {
          warnings.push('Shouldnt be peerDependency')
        }

        if (shouldBeDev && !isDev) {
          warnings.push('Should be devDependency')
        } else if (!shouldBeDev && isDev) {
          warnings.push('Shouldnt be devDependency')
        }

        if (isRequired && (isPeer || isDev || isOptional)) {
          warnings.push('Shouldnt be only required?')
        } else if (isPeer && isOptional) {
          warnings.push('Shouldnt be only peer?')
        }

        if (isRequired) {
          warnings.push('Shouldnt be peer & dev dependency?')
        }
      }

      const hasBeenMuted = isMuted && warnings.length > 0

      result.push({
        'Dependency name': name,
        'Required by': requiredByText,
        'Peer dependency': pkgPeerDependencies[name],
        'Optional dependency': pkgOptionalDependencies[name],
        'Dev dependency': pkgDevDependencies[name],
        'Dependency': pkgDependencies[name],
        'Warnings': hasBeenMuted ? null : warnings.length ? warnings.join(', ') : undefined
      })
    }

    if (all) {
      hasProblems = true
      console.log(chalk.underline(chalk.bold(pkg.name)))
      console.table(result)
      console.log('')
    } else if (result.filter(x => x.Warnings).length > 0) {
      hasProblems = true
      console.log(chalk.underline(chalk.bold(pkg.name)))
      console.table(result.filter(x => x.Warnings))
      console.log('')
    }
  }

  if (hasProblems) {
    process.exit(1)
  }
}

// Run procedure
main().catch(err => setTimeout(() => { throw err }))
