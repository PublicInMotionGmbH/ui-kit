/**
 * Convert Hex to Rgb.
 *
 * @param {string} hex
 * @returns {string}
 */
function convertHexToRgb (hex) {
  if (hex.startsWith('#') && (hex.length === 7)) {
    const r = parseInt(hex.substring(1, 3), 16)
    const g = parseInt(hex.substring(3, 5), 16)
    const b = parseInt(hex.substring(5, 7), 16)
    const rgb = `rgb(${r},${g},${b})`

    return rgb
  }
  return hex
}

export default convertHexToRgb
