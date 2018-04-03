import invariant from 'fbjs/lib/invariant'

export const getPositionNearElement = (element, position) => {
  const boundingClientRect = element.getBoundingClientRect()
  const childRect = {
    top: boundingClientRect.top + window.scrollY,
    left: boundingClientRect.left + window.scrollX,
    width: boundingClientRect.width,
    height: boundingClientRect.height
  }

  getPositionNearElement.right = {
    top: `${childRect.top + childRect.height / 2}px`,
    left: `${childRect.left + childRect.width}px`
  }

  getPositionNearElement.left = {
    top: `${childRect.top + childRect.height / 2}px`,
    left: `${childRect.left}px`
  }

  getPositionNearElement.top = {
    top: `${childRect.top}px`,
    left: `${childRect.left + childRect.width / 2}px`
  }

  getPositionNearElement.bottom = {
    top: `${childRect.top + childRect.height}px`,
    left: `${childRect.left + childRect.width / 2}px`
  }

  return getPositionNearElement[position]
}

export const getTarget = target => {
  let selection = document.querySelector(target)
  invariant(selection !== null, 'The target %s could not be identified in the dom', target)

  return selection
}
