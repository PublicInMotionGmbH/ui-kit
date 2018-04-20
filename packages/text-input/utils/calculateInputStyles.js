import analyzeInput from './analyzeInput'

/**
 * Calculate styles for input and suffix
 *
 * @param {HTMLElement} input
 * @param {HTMLElement} suffix
 * @returns {object|{ hash: string, suffix: object, input: object }}
 */
function calculateInputStyles (input, suffix) {
  // Analyze input and suffix dimensions
  const { hash, width, styles } = analyzeInput(input, suffix)

  // Calculate styles for input and suffix
  return {
    hash: hash,
    input: {
      paddingRight: width.right + width.suffix
    },
    suffix: {
      ...styles,
      maxWidth: width.input - width.left - width.right,
      left: Math.min(width.left + width.value, width.input - width.suffix - width.right)
    }
  }
}

export default calculateInputStyles
