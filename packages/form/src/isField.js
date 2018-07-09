import Field from './Field'
import isElementOfType from './isElementOfType'

const EXPECTED_TYPES = [ Field ]

/**
 * Checks if node is a Field component
 *
 * @param {*} node
 * @param {function} Type
 * @returns {boolean}
 */
function isField (node) {
  return isElementOfType(node, EXPECTED_TYPES)
}

export default isField
