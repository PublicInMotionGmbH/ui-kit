import config from '../config'

/**
 * Prefix module with global name
 *
 * @param {string} modules
 * @returns {string}
 */
function prefix (...modules) {
  return `${config.prefix}-${modules.join('__')}`
}

export default prefix
