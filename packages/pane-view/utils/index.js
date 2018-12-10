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
 * @param {array} paneList
 * @param {number} current
 * @param {number} currentSize
 * @param {number} realPaneView
 * @param {number} combined
 *
 * @returns {array}
 */
export function composeNewPaneList (paneList, current, currentSize, realPaneView, combined) {
  const newPaneList = paneList.map((el, i) => {
    if (i === current) {
      el.size = currentSize > 0 ? currentSize : 0
      el.size = convertToPercent(el.size, realPaneView)
      if (combined < currentSize) {
        el.size = convertToPercent(combined, realPaneView)
      }
    } else if (i === current + 1) {
      el.size = convertToPercent(combined - currentSize, realPaneView)
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
