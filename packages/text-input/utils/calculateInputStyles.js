import analyzeInput from './analyzeInput'

const MINIMUM_INPUT_SPACE = 30 // px

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

  // Calculate suffix dimensions
  const expectedSuffixWidth = width.input - width.left - width.right - Math.min(width.value, MINIMUM_INPUT_SPACE)

  return {
    hash,
    input: {
      [paddingEnd]: width[end] + width.suffix
    },
    suffix: {
      ...styles,
      maxWidth: expectedSuffixWidth,
      [start]: Math.min(width[start] + width.value, width.input - width.suffix - width[end])
    }
  }
}

export default calculateInputStyles
