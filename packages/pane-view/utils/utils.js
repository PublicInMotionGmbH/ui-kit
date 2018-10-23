/**
   * Round number
   *
   * @param {number} num
   * @returns {number}
   */
export function roundDecimals (num) {
  return Math.round(num * 10000) / 10000
}

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
  return roundDecimals(result)
}

export function buildStyle (size, split) {
  if (size === undefined) return {}

  const height = split === 'vertical' && size
  const width = split === 'horizontal' && size

  return { height: `${height}%`, width: `${width}%` }
}
