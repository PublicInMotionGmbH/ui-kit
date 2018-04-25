/**
 * Create invisible element for dimensions calculation
 *
 * @param {string} content
 * @returns {HTMLElement}
 */
function createInvisibleElement (content) {
  const element = document.createElement('span')

  // Use non-breaking spaces in content
  element.textContent = content.replace(/ /g, String.fromCharCode(160))

  // Add some styles to put it outside of visibility and interaction
  element.style.position = 'absolute'
  element.style.visibility = 'hidden'
  element.style.pointerEvents = 'none'
  element.style.display = 'inline-block'
  element.style.boxSizing = 'border-box'
  element.style.overflow = 'hidden'

  return element
}

export default createInvisibleElement
