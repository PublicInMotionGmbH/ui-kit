import cls from 'classnames'

import applyAnyClassNameModifiers from './applyAnyClassNameModifiers'
import prefix from './prefix'

/**
 * Build class name for component
 *
 * @param {string|string[]} moduleName
 * @param {string|string[]|null} additionalClassName
 * @param {string|string[]|object|null} [modifiers]
 * @returns {string}
 */
function buildClassName (moduleName, additionalClassName, ...modifiers) {
  // Prefix main module
  const prefixedModule = prefix(...[].concat(moduleName))

  // Build class names
  const classNames = [ prefixedModule, additionalClassName ]
    .concat(modifiers.map(x => applyAnyClassNameModifiers(moduleName, x)))
    .filter(x => x != null)

  // Build class name based on rules behind
  return cls(classNames)
}

export default buildClassName
