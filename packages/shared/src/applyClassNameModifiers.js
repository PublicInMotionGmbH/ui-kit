import prefix from './prefix'

/**
 * Build class name for component with specified modifiers
 *
 * @param {string|string[]} moduleName
 * @param {string|string[]|null} modifiers
 * @returns {string}
 */
function applyClassNameModifiers (moduleName, modifiers) {
  // When there are no modifiers return empty string
  if (modifiers == null) {
    return ''
  }

  // Build list of modifiers
  const modifiersList = [].concat(modifiers)
    .filter(x => x != null && x !== '')
    .join(' ').split(' ')
    .filter(x => x != null && x !== '')

  // Build prefixed module name
  const prefixed = prefix(...[].concat(moduleName))

  // Build class name
  return modifiersList.map(modifier => `${prefixed}--${modifier}`).join(' ')
}

export default applyClassNameModifiers
