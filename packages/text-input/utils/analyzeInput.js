import createInvisibleElement from './createInvisibleElement'

const copiedStyles = [
  'fontSize', 'fontFamily', 'fontWeight', 'fontStyle',
  'letterSpacing', 'textTransform', 'color'
]

/**
 * Analyze dimensions of input and suffix
 *
 * @param {HTMLElement} inputEl
 * @param {HTMLElement} suffixEl
 * @returns {object|{ hash: string, width: { input: number, left: number, value: number, suffix: number, right: number}, styles: object }}
 */
function analyzeInput (inputEl, suffixEl) {
  // Create dummy element with preffered type
  const element = createInvisibleElement(inputEl.value)

  // Remove padding set to input directly
  // And save previous one to recover it
  const previousLeftPadding = inputEl.style.paddingLeft
  const previousRightPadding = inputEl.style.paddingRight
  inputEl.style.paddingLeft = ''
  inputEl.style.paddingRight = ''

  // Compute styles for input
  const computed = document.defaultView.getComputedStyle(inputEl)

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
  const value = element.offsetWidth
  document.body.removeChild(element)

  // Get width of input
  const input = inputEl.offsetWidth

  // Calculate size of all input parts (in px)
  const left = parseInt(computed.paddingLeft, 10)
  const suffix = suffixEl.offsetWidth
  const right = parseInt(computed.paddingRight, 10)

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
