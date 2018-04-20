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

  const input = {}
  const suffix = {
    ...styles,
    maxWidth: width.input - width.left - width.right
  }

  if (rtl) {
    suffix.right = Math.min(width.right + width.value, width.input - width.suffix - width.left)
    input.paddingLeft = width.left + width.suffix
  } else {
    input.paddingRight = width.right + width.suffix
    suffix.left = Math.min(width.left + width.value, width.input - width.suffix - width.right)
  }

  // Calculate styles for input and suffix
  return { hash, input, suffix }
}

export default calculateInputStyles
