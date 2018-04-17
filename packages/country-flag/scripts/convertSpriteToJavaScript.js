const fs = require('fs')
const path = require('path')

// Load SVG sprite
const sprite = fs.readFileSync(path.join(__dirname, '../sprites/sprite.svg'), 'utf8')

// Build output path
const outputPath = path.join(__dirname, '../sprites/sprite.js')

// Build JavaScript code
const code = 'module.exports = `' + sprite.replace(/'/g, '\\\'').replace(/\n/g, '\\n') + '`\n'

// Save JavaScript code
fs.writeFileSync(outputPath, code)
