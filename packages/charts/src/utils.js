import PropTypes from 'prop-types'

import {buildClassName} from '@talixo/shared'

export function generateSeriesClassName (index, className = null) {
  const moduleName = 'chart-series'
  return buildClassName(moduleName, className, [index])
}

export const dataItemPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    className: PropTypes.string,
    color: PropTypes.string,
    dataitems: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    disabled: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string
  })
)

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

// Colors
export const colors = [
  '#330f00',
  '#661d00',
  '#992c00',
  '#cc3a00',
  '#FF4900',
  '#ff6d33',
  '#ff9266',
  '#ffb699',
  '#ffdbcc'
]
export const charcoal = '#252525'
export const talixoRed = '#FF4900'

/**
 * Returns next color in loop manner
 * @param {number} index
 * @returns {string}
 */
export function getColorByIndex (index) {
  const colorsLength = colors.length
  return index < colorsLength
    ? colors[index]
    : colors[colorsLength % index]
}
