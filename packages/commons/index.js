const config = require('./config')

/**
 * Prefix module with global name
 *
 * @param {string} module
 * @returns {string}
 */
export function prefix (module) {
  return config.prefix + '-' + module
}
