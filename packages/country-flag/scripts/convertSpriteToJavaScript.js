const fs = require('fs')

const resolvePath = require('./resolvePath')

const { paths } = require('../config')

// Build paths
const svgPath = resolvePath(paths.svg)
const outputPath = resolvePath(paths.js)

// Load SVG sprite
const sprite = fs.readFileSync(svgPath, 'utf8')

// Build JavaScript code
const code = 'module.exports = `' + sprite.replace(/'/g, '\\\'').replace(/\n/g, '\\n') + '`\n'

// Save JavaScript code
fs.writeFileSync(outputPath, code)
