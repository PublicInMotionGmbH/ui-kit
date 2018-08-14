/**
 * Convert Rgb to Hex.
 *
 * @param {string} rgb
 * @returns {string}
 */
function convertRgbToHex (rgb) {
  if (rgb.startsWith('rgb')) {
    const colorRgb = rgb.match(/\d+/g)
    const r = parseInt(colorRgb[0])
    const g = parseInt(colorRgb[1])
    const b = parseInt(colorRgb[2])

    const hex = '#' + [r, g, b].map(x => {
      const part = x.toString(16)
      return part.length === 1 ? '0' + part : part
    }).join('')

    return hex
  }
  return rgb
}

export default convertRgbToHex
