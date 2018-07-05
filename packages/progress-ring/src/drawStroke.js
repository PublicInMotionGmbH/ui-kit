import { strokeDasharray } from './constants'

/**
 * Update value when is not in range or non-digital character.
 *
 * @param {number} value
 */

function drawStroke (value) {
  if (isNaN(value)) {
    return null
  }

  value = Math.max(0, Math.min(+value, 1))

  return strokeDasharray - (strokeDasharray * (value / 100) * 100)
}

export default drawStroke
