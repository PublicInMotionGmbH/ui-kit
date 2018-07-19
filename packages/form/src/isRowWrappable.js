import Legend from './Legend'
import isElementOfType from './isElementOfType'

const WRAPPABLE = [ Legend ]

/**
 * Checks if node is a component which can be wrapped by FormRow
 *
 * @param {*} node
 * @returns {boolean}
 */
function isRowWrappable (node) {
  return isElementOfType(node, WRAPPABLE)
}

export default isRowWrappable
