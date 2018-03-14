const config = require('./config')

/**
 * Prefix module with global name
 *
 * @param {string} module
 * @returns {string}
 */
exports.prefix = function prefix (module) {
  return config.prefix + '-' + module
}
