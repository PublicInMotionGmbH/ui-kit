import { buildClassName } from '@talixo/shared'

export const defaultColorMaxIndex = 9
const seriesName = 'chart-series'

/**
 * Returns next color in loop manner
 * @param {number} index
 * @returns {string}
 */
export function getColorIndex (index, maxIndex = defaultColorMaxIndex) {
  return index % (maxIndex + 1)
}

/**
 * Generates class names for chart series with default sass colors
 * @param {number} index
 * @param {string} className
 * @returns {string}
 */
export function generateSeriesClassName (index, className = null) {
  const colorIndex = getColorIndex(index)
  return buildClassName(seriesName, className, [colorIndex])
}

/**
 * Calculates sum of pie chart values which are not disabled
 * @param {array} dataItems
 * @returns {number}
 */
export function getPieValuesSum (dataItems) {
  return dataItems
    .filter(item => !item.disabled)
    .map(item => item.value)
    .reduce((acc, curr) => acc + curr, 0)
}

/**
 * Generates data for arc series
 * @param {array} data
 * @param {number} sum
 * @param {object} config
 * @returns {array}
 */
export function generateArcsData (data, sum, config = {}) {
  const { PI } = Math
  const { startAngle = 0, radius0 = 0, radius = 5 } = config

  let angle0 = startAngle
  const newData = data.map(item => {
    if (item.disabled) return item
    const arcAngle = (item.value / sum) * 2 * PI
    const newItem = {
      ...item,
      angle: arcAngle + angle0,
      angle0,
      radius,
      radius0
    }
    angle0 += arcAngle
    return newItem
  })
  return newData
}
