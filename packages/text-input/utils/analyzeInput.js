import createInvisibleElement from './createInvisibleElement'

const copiedStyles = [
  'fontSize', 'fontFamily', 'fontWeight', 'fontStyle',
  'letterSpacing', 'textTransform', 'color'
]

/**
 * Analyze dimensions of input and suffix
 *
 * @param {HTMLElement} input
 * @param {HTMLElement} suffix
 * @returns {object|{ hash: string, width: { input: number, left: number, value: number, suffix: number, right: number}, styles: object }}
 */
function analyzeInput (input, suffix) {
  // Create dummy element with preffered type
  const element = createInvisibleElement(input.value)

  // Remove padding set to input directly
  // And save previous one to recover it
  const previousLeftPadding = input.style.paddingLeft
  const previousRightPadding = input.style.paddingRight
  input.style.paddingLeft = ''
  input.style.paddingRight = ''

  // Compute styles for input
  const computed = document.defaultView.getComputedStyle(input)

  // Check if it's RTL text direction
  const isRTL = computed.direction === 'rtl'

  // Initialize styles for suffix
  const styles = {}

  // Copy text styles from input to element and suffix
  for (let i = 0; i < copiedStyles.length; i++) {
    const s = copiedStyles[i]
    element.style[s] = styles[s] = computed[s]
  }

  // Gather information about text width inside input
  document.body.appendChild(element)
  const textWidth = element.offsetWidth
  document.body.removeChild(element)

  // Get width of input
  const inputWidth = input.offsetWidth

  // Calculate size of all input parts (in px)
  const leftWidth = parseInt(computed.paddingLeft, 10)
  const suffixWidth = suffix.offsetWidth
  const rightWidth = parseInt(computed.paddingRight, 10)

  // Recover current padding set to input directly
  input.style.paddingLeft = previousLeftPadding
  input.style.paddingRight = previousRightPadding

  return {
    hash: `${isRTL ? 'rtl' : 'ltr'}*${inputWidth}*${leftWidth}*${textWidth}*${suffixWidth}*${rightWidth}`,
    rtl: isRTL,
    width: {
      input: inputWidth,
      left: leftWidth,
      value: textWidth,
      suffix: suffixWidth,
      right: rightWidth
    },
    styles: styles
  }
}

export default analyzeInput
