import createInvisibleElement from './createInvisibleElement'

/**
 * callculate offsets of input and suffix
 *
 * @param {HTMLElement} leftEl
 * @param {HTMLElement} rightEl
 * @param {boolean} isRTL
 * @returns {object|{ hash: string, width: { input: number, left: number, value: number, suffix: number, right: number}, styles: object }}
 */
function calculateOffsets (leftEl, rightEl, isRTL) {
  // Calculate offset when left or righ element is added
  const left = !isRTL
    ? leftEl ? (leftEl.offsetLeft + leftEl.clientWidth) : 0
    : rightEl ? (rightEl.offsetLeft + rightEl.clientWidth) : 0

  const right = !isRTL
    ? rightEl && rightEl.offsetParent ? rightEl.offsetParent.clientWidth - rightEl.offsetLeft : 0
    : leftEl && leftEl.offsetParent ? leftEl.offsetParent.clientWidth - leftEl.offsetLeft : 0

  return { left, right }
}

const copiedStyles = [
  'fontSize', 'fontFamily', 'fontWeight', 'fontStyle',
  'letterSpacing', 'textTransform', 'color'
]

/**
 * Analyze dimensions of input and suffix
 *
 * @param {HTMLElement} inputEl
 * @param {HTMLElement} suffixEl
 * @param {HTMLElement} leftEl
 * @param {HTMLElement} rightEl
 * @returns {object|{ hash: string, width: { input: number, left: number, value: number, suffix: number, right: number}, styles: object }}
 */
function analyzeInput (inputEl, suffixEl, leftEl, rightEl) {
  // Create dummy element with preffered type
  const element = createInvisibleElement(inputEl.value)

  // Remove padding set to input directly
  // And save previous one to recover it
  const previousLeftPadding = inputEl.style.paddingLeft
  const previousRightPadding = inputEl.style.paddingRight
  inputEl.style.paddingLeft = ''
  inputEl.style.paddingRight = ''

  // Compute styles for input
  const computed = window.getComputedStyle(inputEl)

  // Check if it's RTL text direction
  const isRTL = computed.direction === 'rtl'

  // Calculate offsets
  const offset = calculateOffsets(leftEl, rightEl, isRTL)

  // Initialize styles for suffix
  const styles = {}

  // Copy text styles from input to element and suffix
  for (let i = 0; i < copiedStyles.length; i++) {
    const s = copiedStyles[i]
    element.style[s] = styles[s] = computed[s]
  }

  // Gather information about text width inside input
  document.body.appendChild(element)
  const value = element.clientWidth
  document.body.removeChild(element)

  // Calculate size of all input parts (in px)
  const left = offset.left !== 0
    ? offset.left
    : parseInt(computed.paddingLeft, 10)
  const right = offset.right !== 0
    ? offset.right
    : parseInt(computed.paddingRight, 10)

  // Calculate suffix dimensions
  const suffixStyle = window.getComputedStyle(suffixEl)
  const suffixWidth = parseInt(suffixStyle.width, 10)

  const suffix = (suffixWidth || 0)

  // Get width of input
  const input = inputEl.clientWidth

  // Recover current padding set to input directly
  inputEl.style.paddingLeft = previousLeftPadding
  inputEl.style.paddingRight = previousRightPadding

  return {
    hash: `${isRTL ? 'rtl' : 'ltr'}*${input}*${left}*${value}*${suffix}*${right}`,
    rtl: isRTL,
    width: { input, left, value, suffix, right },
    styles: styles
  }
}

export default analyzeInput
