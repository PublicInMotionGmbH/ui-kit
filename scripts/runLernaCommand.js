const path = require('path')
const runCommand = require('./runCommand')

const nodePath = process.argv[0]
const lernaCliPath = path.join(__dirname, '..', 'node_modules', '.bin', 'lerna')

/**
 * Run any command in Lerna
 *
 * @returns {Promise<int, int>}
 */
function runLernaCommand (...args) {
  return runCommand(nodePath, lernaCliPath, ...args)
}

module.exports = runLernaCommand
