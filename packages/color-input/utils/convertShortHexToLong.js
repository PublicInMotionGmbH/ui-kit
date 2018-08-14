/**
 * Convert short Hex to long Hex.
 *
 * @param {string} hex
 * @returns {string}
 */
function convertShortHexToLong (hex) {
  if (hex.startsWith('#') && (hex.length === 4)) {
    const longHex = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`

    return longHex
  }
  return hex
}

export default convertShortHexToLong
