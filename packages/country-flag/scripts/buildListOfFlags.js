const fs = require('fs')
const glob = require('glob')
const resolvePath = require('./resolvePath')

const { paths } = require('../config')

const sourcePath = resolvePath(paths.source)
const outputPath = resolvePath(paths.meta)

const regex = /(?:^|[\\/])([a-zA-Z-]+)\.[^.\\/]+$/

const flags = glob.sync(`${sourcePath}/*.svg`)
  // Match regular expression to find names
  .map(x => x.match(regex))

  // Filter out these which don't match regexp
  .filter(Boolean)

  // Get name
  .map(x => x[1])

  // Lower case to have target format
  .map(x => x.toLowerCase())

const code = 'module.exports = [\n' + flags.map(code => `  '${code}'`).join(',\n') + '\n]\n'

fs.writeFileSync(outputPath, code)
