/**
     * Convert to percent
     *
     * @param {number} size
     * @param {number} paneViewDimension
     *
     * @returns {number}
     */
export function convertToPercent (size, paneViewDimension) {
  let result = size * 100 / paneViewDimension
  if (result < 0) {
    result = 0
  } else if (result > 100) {
    result = 100
  }
  return result
}

/**
 * Build styles
 *
 * @param {*} size
 * @param {*} split
 *
 * @returns {object}
 */
export function buildStyle (size, split) {
  if (size === undefined) return {}

  const height = split === 'vertical' && size
  const width = split === 'horizontal' && size

  return { height: `${height}%`, width: `${width}%` }
}

/**
 * Compose new list of panes
 *
 * @param {array} panesList
 * @param {number} currentIndex
 * @param {number} currentSize
 * @param {number} allPanesSummed
 * @param {number} combined
 *
 * @returns {array}
 */
export function composeNewPaneList (panesList, currentIndex, currentSize, allPanesSummed, combined) {
  const newPaneList = panesList.map((el, i) => {
    if (i === currentIndex) {
      el.size = currentSize > 0 ? currentSize : 0
      el.size = convertToPercent(el.size, allPanesSummed)
      if (combined < currentSize) {
        el.size = convertToPercent(combined, allPanesSummed)
      }
    } else if (i === currentIndex + 1) {
      el.size = convertToPercent(combined - currentSize, allPanesSummed)
    }
    return el
  })

  return newPaneList
}

/**
 * Detect if the device is tactile
 *
 * @returns {boolean}
 */
export function isTouchDevice () {
  if ((typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch &&
        typeof document !== 'undefined' &&
        document instanceof window.DocumentTouch))) ||
    !!(typeof navigator !== 'undefined' &&
    (navigator.maxTouchPoints || navigator.msMaxTouchPoints))) {
    return true
  }
  return false
}
