/**
 * Update value when is not in range or non-digital character.
 *
 * @param {number} value
 */
// Value of strokeDasharray
const strokeDasharray = 164

function drawStroke (value) {
  if (value < 0) {
    value = 0
  } else if (value > 1) {
    value = 1
  } else if (isNaN(value)) {
    value = 0.25
  }

  return strokeDasharray - (strokeDasharray * (value / 100) * 100)
}

export default drawStroke
