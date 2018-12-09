/**
 * Check if object is instance of (Synthetic)Event
 *
 * @param {*} event
 * @returns {boolean}
 */
function isEvent (event) {
  return event && event.preventDefault && event.stopPropagation && 'target' in event
}

export default isEvent
