/**
 * Get the container's position and size.
 * @param {Element} container
 * @param {boolean} horizontal
 *
 * @returns {object}
 */
function getContainerRect (container, horizontal) {
  const containerHeight = container === window
    ? container.innerHeight
    : container.getBoundingClientRect().height + container.getBoundingClientRect().top

  const containerWidth = container === window
    ? container.innerWidth
    : container.getBoundingClientRect().width + container.getBoundingClientRect().left

  const containerTop = container === window
    ? 0
    : container.getBoundingClientRect().top

  const containerLeft = container === window
    ? 0
    : container.getBoundingClientRect().left

  const containerBeginning = horizontal ? containerLeft : containerTop
  const containerLength = horizontal ? containerWidth : containerHeight

  return { containerBeginning, containerLength }
}

/**
 * Get the element's position and size.
 * @param {Element} end
 * @param {number} offset
 * @param {boolean} horizontal
 *
 * @returns {object}
 */
function getElementRect (element, offset, horizontal) {
  const { height, width, top, bottom, right, left } = element.getBoundingClientRect()

  const elementHeight = height
  const elementWidth = width
  const elementTop = top - offset
  const elementBottom = bottom - offset
  const elementRight = right - offset
  const elementLeft = left - offset

  const elementBeginning = horizontal ? elementLeft : elementTop
  const elementEnd = horizontal ? elementRight : elementBottom
  const elementLength = horizontal ? elementWidth : elementHeight

  return { elementBeginning, elementEnd, elementLength }
}

/**
 * Get range points.
 * @param {Element} start
 * @param {Element} end
 * @param {boolean} horizontal
 *
 * @returns {object}
 */
function getRangePoints (start, end, horizontal) {
  const rangeStart = horizontal
    ? start && start.getBoundingClientRect().left
    : start && start.getBoundingClientRect().top

  const rangeEnd = horizontal
    ? end && end.getBoundingClientRect().left
    : end && end.getBoundingClientRect().top

  return { rangeStart, rangeEnd }
}

/**
 * Get trigger point.
 * @param {Element} trigger
 * @param {boolean} horizontal
 *
 * @returns {number}
 */
function getTriggerPoint (trigger, horizontal) {
  const triggerPoint = horizontal
    ? trigger && trigger.getBoundingClientRect().left
    : trigger && trigger.getBoundingClientRect().top

  return triggerPoint
}

export {
  getContainerRect,
  getElementRect,
  getRangePoints,
  getTriggerPoint
}
