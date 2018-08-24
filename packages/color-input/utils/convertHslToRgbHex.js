/**
 * Convert short Hex to long Hex.
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {string} color
 * @param {string} outputFormat
 */
function convertHslToRgbHex (h, s, l, color, outputFormat) {
  let r, g, b
  h = parseFloat(h)
  s = parseFloat(s)
  l = parseFloat(l)

  if (h < 0) h = 0
  if (s < 0) s = 0
  if (l < 0) l = 0
  if (h >= 360) h = 359
  if (s > 100) s = 100
  if (l > 100) l = 100
  s /= 100
  l /= 100
  let c = (1 - Math.abs(2 * l - 1)) * s
  let hh = h / 60
  let x = c * (1 - Math.abs(hh % 2 - 1))
  r = g = b = 0

  if (hh >= 0 && hh < 1) {
    r = c
    g = x
  } else if (hh >= 1 && hh < 2) {
    r = x
    g = c
  } else if (hh >= 2 && hh < 3) {
    g = c
    b = x
  } else if (hh >= 3 && hh < 4) {
    g = x
    b = c
  } else if (hh >= 4 && hh < 5) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }

  const m = (l - c / 2) < 0 ? 0 : l - c / 2

  r += m
  g += m
  b += m

  r *= 255
  g *= 255
  b *= 255

  r = Math.floor(r)
  g = Math.floor(g)
  b = Math.floor(b)

  let hex = r * 65536 + g * 256 + b
  hex = hex.toString(16, 6)
  let len = hex.length
  if (len < 6) {
    for (let i = 0; i < 6 - len; i++) {
      hex = '0' + hex
    }
  }

  if (!outputFormat) {
    if (!color || color.startsWith('#')) {
      return `#${hex}`
    } else if (color.startsWith('rgb')) {
      return `rgb(${r},${g},${b})`
    }
  } else if (outputFormat === 'hex') {
    return `#${hex}`
  } else if (outputFormat === 'rgb') {
    return `rgb(${r},${g},${b})`
  }
}

export default convertHslToRgbHex
