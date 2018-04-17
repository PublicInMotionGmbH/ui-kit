const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const findNodeModules = require('find-node-modules')
const svg = require('gulp-svg-sprite')
const svgo = require('gulp-svgo')

// Load information about prefix
const { prefix } = require('../config')

// Configure directory to load SVG icons from and where to output them
const svgsPackagePath = 'flagkit-web/svgs'
const outputPath = path.join(__dirname, '..', 'sprites', 'sprite.svg')

// Find package in node modules
const sourceDirPath = findNodeModules().map(x => path.join(x, svgsPackagePath)).find(x => fs.existsSync(x))

// Validate if package has been found
if (!sourceDirPath) {
  throw new Error('You need to install package dependencies (`flagkit-web` especially) first.')
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
  const iconName = filePath.match(/(?:^|[\\/])(.+?)\.[^.]+$/)[1].toLowerCase()

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
