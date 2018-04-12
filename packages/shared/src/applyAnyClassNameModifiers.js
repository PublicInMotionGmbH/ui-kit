import applyClassNameModifiers from './applyClassNameModifiers'

/**
 * Apply modifiers which can be
 * - a string - then it's single modifier
 * - an array - array of modifiers
 * - null/undefined - none
 * - object - map of entries (modifier => boolean)
 *
 * @param {string|string[]} moduleName
 * @param {string|string[]|object|null} modifiers
 * @returns {string}
 */
function applyAnyClassNameModifiers (moduleName, modifiers) {
  // For map of class names, find these which value is truthy
  if (modifiers && typeof modifiers === 'object' && !Array.isArray(modifiers)) {
    modifiers = Object.keys(modifiers).filter(key => modifiers[key])
  }

  // Use only truthy modifiers
  modifiers = [].concat(modifiers).filter(x => x != null && x !== '')

  // Apply list of modifiers into class name
  return applyClassNameModifiers(moduleName, modifiers)
}

export default applyAnyClassNameModifiers
