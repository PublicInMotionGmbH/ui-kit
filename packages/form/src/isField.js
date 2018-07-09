import Field from './Field'

/**
 * Checks if node is a Field component
 *
 * @param node
 * @returns {boolean}
 */
function isField (node) {
  if (!node || typeof node !== 'object' || typeof node.type !== 'function') {
    return false
  }

  if (node.type === Field) {
    return true
  }

  const Component = node.type
  // This is required to work properly ith react-hot-loader
  const CallComponent = Component.__reactstandin__getCurrent
    ? Component.__reactstandin__getCurrent()
    : Component

  return CallComponent === Field
}

export default isField
