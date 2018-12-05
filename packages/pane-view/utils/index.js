/**
     * Convert to percent
     *
     * @param {number} size
     * @param {number} paneViewDimension
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
 */
export function buildStyle (size, split) {
  if (size === undefined) return {}

  const height = split === 'vertical' && size
  const width = split === 'horizontal' && size

  return { height: `${height}%`, width: `${width}%` }
}

/**
 * Compose new list of panes
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
