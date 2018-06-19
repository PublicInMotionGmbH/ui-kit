/**
 * Get the container's position and size.
 * @param {Element} container
 * @param {boolean} horizontal
 *
 * @returns {object}
 */
function getContainerRect (container, horizontal) {
  let top, left, width, height
  if (container === window) {
    top = left = 0
    width = container.innerWidth
    height = container.innerHeight
  } else {
    ({ top, left, width, height } = container.getBoundingClientRect())
  }

  const containerHeight = height + top
  const containerWidth = width + left

  const containerBeginning = horizontal ? left : top
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

  const elementTop = top - offset
  const elementBottom = bottom - offset
  const elementRight = right - offset
  const elementLeft = left - offset

  const elementBeginning = horizontal ? elementLeft : elementTop
  const elementEnd = horizontal ? elementRight : elementBottom
  const elementLength = horizontal ? width : height

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
  const { left: startLeft, top: startTop } = !!start && start.getBoundingClientRect()
  const { left: endLeft, top: endTop } = !!end && end.getBoundingClientRect()

  const rangeStart = horizontal ? startLeft : startTop
  const rangeEnd = horizontal ? endLeft : endTop

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
  const { left, top } = !!trigger && trigger.getBoundingClientRect()

  const triggerPoint = horizontal ? left : top

  return triggerPoint
}

export {
  getContainerRect,
  getElementRect,
  getRangePoints,
  getTriggerPoint
}
