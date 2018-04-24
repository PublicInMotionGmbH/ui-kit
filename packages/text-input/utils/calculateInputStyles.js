import analyzeInput from './analyzeInput'

/**
 * Calculate styles for input and suffix
 *
 * @param {HTMLElement} inputEl
 * @param {HTMLElement} suffixEl
 * @returns {object|{ hash: string, suffix: object, input: object }}
 */
function calculateInputStyles (inputEl, suffixEl) {
  // Analyze input and suffix dimensions
  const { hash, rtl, width, styles } = analyzeInput(inputEl, suffixEl)

  // Build information about directions (according to RTL)
  const start = rtl ? 'right' : 'left'
  const end = rtl ? 'left' : 'right'
  const paddingEnd = rtl ? 'paddingLeft' : 'paddingRight'

  return {
    hash,
    input: {
      [paddingEnd]: width[end] + width.suffix
    },
    suffix: {
      ...styles,
      maxWidth: width.input - width.left - width.right,
      [start]: Math.min(width[start] + width.value, width.input - width.suffix - width[end])
    }
  }
}

export default calculateInputStyles
