export const getPositionNearElement = (element, position, minimumWidth, minimumHeight, lockedPosition = false) => {
  minimumWidth = minimumWidth || 70
  minimumHeight = minimumHeight || 50

  const boundingClientRect = element.getBoundingClientRect()
  const childRect = {
    top: boundingClientRect.top + window.scrollY,
    left: boundingClientRect.left + window.scrollX,
    width: boundingClientRect.width,
    height: boundingClientRect.height
  }

  getPositionNearElement.right = {
    top: `${childRect.top + childRect.height / 2}px`,
    left: `${childRect.left + childRect.width}px`,
    position: 'right'
  }

  getPositionNearElement.left = {
    top: `${childRect.top + childRect.height / 2}px`,
    left: `${childRect.left}px`,
    position: 'left'
  }

  getPositionNearElement.top = {
    top: `${childRect.top}px`,
    left: `${childRect.left + childRect.width / 2}px`,
    position: 'top'
  }

  getPositionNearElement.bottom = {
    top: `${childRect.top + childRect.height}px`,
    left: `${childRect.left + childRect.width / 2}px`,
    position: 'bottom'
  }

  const space = {
    left: boundingClientRect.left / minimumWidth,
    right: (window.innerWidth + window.scrollX - boundingClientRect.left - boundingClientRect.width) / minimumWidth,
    top: boundingClientRect.top / minimumHeight,
    bottom: (window.innerHeight + window.scrollY - boundingClientRect.top - boundingClientRect.height) / minimumHeight
  }

  if (space[position] >= 1 || lockedPosition) {
    return getPositionNearElement[position]
  }

  const possibleOptions = {
    left: [ 'left', 'right', 'top', 'bottom' ],
    right: [ 'right', 'left', 'top', 'bottom' ],
    top: [ 'top', 'bottom', 'left', 'right' ],
    bottom: [ 'bottom', 'top', 'left', 'right' ]
  }

  const options = possibleOptions[position]
  const preferredOptions = options.sort((a, b) => Math.min(1, space[b]) - Math.min(1, space[a]))

  position = preferredOptions[0]

  return getPositionNearElement[position]
}
