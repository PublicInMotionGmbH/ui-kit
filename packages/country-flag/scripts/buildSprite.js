const path = require('path')
const gulp = require('gulp')
const svg = require('gulp-svg-sprite')
const svgo = require('gulp-svgo')

const resolvePath = require('./resolvePath')

// Load information about prefix
const { prefix, paths } = require('../config')

// Resolve required paths
const outputPath = resolvePath(paths.svg)

// Find package in node modules
const sourceDirPath = resolvePath(paths.source)

// Validate if package has been found
if (sourceDirPath === null) {
  throw new Error(`You need to install package dependencies ('${paths.source}' especially) first.`)
}

// Load transformations for SVG-Sprite
const transform = require('./extractGradients')

/**
 * Generate prefixed ID for <symbol>
 * @param {string} filePath
 * @returns {string}
 */
function generateSymbolId (filePath) {
  // Get name without extension and directories
  const iconName = filePath.match(/(?:^|[\\/])([^\\/]+?)\.[^.\\/]+$/)[1].toLowerCase()

  return `${prefix}-${iconName}`
}

// Build configuration for SVG-sprite
const config = {
  shape: {
    transform: [ transform.shape ],
    dimension: {
      precision: 2,
      attributes: false
    },
    id: {
      generator: generateSymbolId
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false,
    transform: [ transform.svg ]
  },
  mode: {
    symbol: {
      dest: '',
      prefix: '',
      sprite: path.basename(outputPath)
    }
  }
}

// Build configuration for SVGO
const optimizeConfig = {
  plugins: [
    { removeUselessDefs: false },
    { cleanupIDs: false }
  ]
}

// Build paths
const sourceDir = path.resolve(path.join(sourceDirPath, '*.svg'))
const outputDir = path.resolve(path.dirname(outputPath))

// Build sprite
gulp.src(sourceDir)
  .pipe(svg(config))
  .pipe(svgo(optimizeConfig))
  .pipe(gulp.dest(outputDir))
