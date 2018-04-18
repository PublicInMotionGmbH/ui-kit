const fs = require('fs')
const path = require('path')
const findNodeModules = require('find-node-modules')

/**
 * Resolve path from configuration
 *
 * @param {string} providedPath
 * @returns {string|null}
 */
function resolvePath (providedPath) {
  // Try to find in node modules when path starts with '~'
  if (providedPath.startsWith('~')) {
    providedPath = providedPath.substr(1)

    return findNodeModules()
      .map(nodeModules => path.join(nodeModules, providedPath))
      .find(expectedPath => fs.existsSync(expectedPath))
  }

  return path.resolve(path.join(__dirname, '..', providedPath))
}

module.exports = resolvePath
