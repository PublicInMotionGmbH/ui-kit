import cls from 'classnames'

import config from './config'

/**
 * Prefix module with global name
 *
 * @param {string} modules
 * @returns {string}
 */
export function prefix (...modules) {
  return `${config.prefix}-${modules.join('__')}`
}

/**
 * Build class name for component with specified modifiers
 *
 * @param {string} moduleName
 * @param {string|string[]|null} modifiers
 * @returns {string}
 */
export function applyClassNameModifiers (moduleName, modifiers) {
  // When there are no modifiers return empty string
  if (!modifiers) {
    return ''
  }

  // Build list of modifiers
  const modifiersList = [].concat(modifiers)
    .filter(Boolean)
    .join(' ').split(' ')
    .filter(Boolean)

  // Build prefixed module name
  const prefixed = prefix(moduleName)

  // Build class name
  return modifiersList.map(modifier => `${prefixed}--${modifier}`).join(' ')
}

/**
 * Apply modifiers which can be
 * - a string - then it's single modifier
 * - an array - array of modifiers
 * - null/undefined - none
 * - object - map of entries (modifier => boolean)
 *
 * @param {string} moduleName
 * @param {string|string[]|object|null} modifiers
 * @returns {string}
 */
export function applyAnyClassNameModifiers (moduleName, modifiers) {
  // For map of class names, find these which value is truthy
  if (modifiers && typeof modifiers === 'object' && !Array.isArray(modifiers)) {
    modifiers = Object.keys(modifiers).filter(key => modifiers[key])
  }

  // Use only truthy modifiers
  modifiers = modifiers.filter(Boolean)

  // Apply list of modifiers into class name
  return applyClassNameModifiers(moduleName, modifiers)
}

/**
 * Build class name for component
 *
 * @param {string} moduleName
 * @param {string|string[]|null} additionalClassName
 * @param {string|string[]|object|null} [modifiers]
 * @returns {string}
 */
export function buildClassName (moduleName, additionalClassName, ...modifiers) {
  // Prefix main module
  const prefixedModule = prefix(moduleName)

  // Build class names
  const classNames = [ prefixedModule, additionalClassName ]
    .concat(modifiers.map(x => applyAnyClassNameModifiers(moduleName, x)))
    .filter(Boolean)

  // Build class name based on rules behind
  return cls(classNames)
}
