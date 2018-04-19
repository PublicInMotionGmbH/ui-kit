import {buildClassName} from '@talixo/shared'

export function generateSeriesClassName (index, className = null) {
  const moduleName = 'chart-series'
  return buildClassName(moduleName, className, [index])
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
