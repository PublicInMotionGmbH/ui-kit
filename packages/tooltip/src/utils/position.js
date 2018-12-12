/**
 * Calculate CSS for positioning element on left.
 *
 * @param {object|{ top: number, left: number, width: number, height: number }} boundingRect
 * @returns {{ top: string, left: string, position: string }}
 */
export function buildPositionOnLeft (boundingRect) {
  return {
    top: `${boundingRect.top + boundingRect.height / 2}px`,
    left: `${boundingRect.left}px`,
    position: 'left'
  }
}

/**
 * Calculate CSS for positioning element on right.
 *
 * @param {object|{ top: number, left: number, width: number, height: number }} boundingRect
 * @returns {{ top: string, left: string, position: string }}
 */
export function buildPositionOnRight (boundingRect) {
  return {
    top: `${boundingRect.top + boundingRect.height / 2}px`,
    left: `${boundingRect.left + boundingRect.width}px`,
    position: 'right'
  }
}

/**
 * Calculate CSS for positioning element on top.
 *
 * @param {object|{ top: number, left: number, width: number, height: number }} boundingRect
 * @returns {{ top: string, left: string, position: string }}
 */
export function buildPositionOnTop (boundingRect) {
  return {
    top: `${boundingRect.top}px`,
    left: `${boundingRect.left + boundingRect.width / 2}px`,
    position: 'top'
  }
}

/**
 * Calculate CSS for positioning element on bottom.
 *
 * @param {object|{ top: number, left: number, width: number, height: number }} boundingRect
 * @returns {{ top: string, left: string, position: string }}
 */
export function buildPositionOnBottom (boundingRect) {
  return {
    top: `${boundingRect.top + boundingRect.height}px`,
    left: `${boundingRect.left + boundingRect.width / 2}px`,
    position: 'bottom'
  }
}

export const positionBuilders = {
  left: buildPositionOnLeft,
  right: buildPositionOnRight,
  top: buildPositionOnTop,
  bottom: buildPositionOnBottom
}

export const preferredOptionsOrder = {
  left: [ 'left', 'right', 'top', 'bottom' ],
  right: [ 'right', 'left', 'top', 'bottom' ],
  top: [ 'top', 'bottom', 'left', 'right' ],
  bottom: [ 'bottom', 'top', 'left', 'right' ]
}

/**
 * Get best position near element (for tooltip).
 *
 * @param {HTMLElement} element
 * @param {string} position
 * @param {number} [minimumWidth]
 * @param {number} [minimumHeight]
 * @param {bool} [lockedPosition]
 * @returns {{ top: string, left: string, position: string }}
 */
export function getPositionNearElement (element, position, minimumWidth, minimumHeight, lockedPosition = false) {
  minimumWidth = minimumWidth || 70
  minimumHeight = minimumHeight || 50

  const boundingClientRect = element.getBoundingClientRect()

  // Calculate bounding client rect for element
  const childRect = {
    top: boundingClientRect.top + window.scrollY,
    left: boundingClientRect.left + window.scrollX,
    width: boundingClientRect.width,
    height: boundingClientRect.height
  }

  // Do not try to find best position when position is locked
  if (lockedPosition) {
    return positionBuilders[position](childRect)
  }

  // Calculate fraction of tooltip space it will take (0 - 1) for each position
  const space = {
    left: boundingClientRect.left / minimumWidth,
    right: (window.innerWidth + window.scrollX - boundingClientRect.left - boundingClientRect.width) / minimumWidth,
    top: boundingClientRect.top / minimumHeight,
    bottom: (window.innerHeight + window.scrollY - boundingClientRect.top - boundingClientRect.height) / minimumHeight
  }

  // Preferred position has enough space to put element near, so just stick to it
  if (space[position] >= 1) {
    return positionBuilders[position](childRect)
  }

  // Find preferred position equivalents for the current one
  const options = preferredOptionsOrder[position]
  const preferredOptions = options.sort((a, b) => Math.min(1, space[b]) - Math.min(1, space[a]))

  // Use the best one
  position = preferredOptions[0]

  return positionBuilders[position](childRect)
}
