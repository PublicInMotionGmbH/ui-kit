/**
 * Build path for SVG circle in progress ring
 *
 * @param {number} value  between 0 and 1
 * @returns {string}
 */
function buildCirclePath (value) {
  const isLong = value > 0.5 ? 1 : 0
  const arcX = Math.cos(2 * Math.PI * value)
  const arcY = Math.sin(2 * Math.PI * value)

  return `M 1 0 A 1 1 0 ${isLong} 1 ${arcX} ${arcY} L 0 0`
}

export default buildCirclePath
