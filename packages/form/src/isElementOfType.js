/**
 * Checks if node is one of expected types.
 *
 * @param {*} node
 * @param {Array<function|string>} types
 * @returns {boolean}
 */
function isElementOfType (node, types) {
  if (!node || typeof node !== 'object' || typeof node.type !== 'function') {
    return false
  }

  if (types.indexOf(node.type) !== -1) {
    return true
  }

  const Component = node.type

  // This is required to work properly ith react-hot-loader
  const CallComponent = Component.__reactstandin__getCurrent
    ? Component.__reactstandin__getCurrent()
    : Component

  return types.indexOf(CallComponent) !== -1
}

export default isElementOfType
