import React from 'react'

import sprite from '../sprites/sprite'

const isBrowser = typeof document !== 'undefined'

// Counter to remove or create sprite when we need it
let mountedInstances = 0
let element

/**
 * Attach sprite to DOM tree
 */
function attachSprite () {
  // Ignore when it's not browser or already attached
  if (element || !isBrowser) {
    return
  }

  // This sprite is using gradients,
  // so simple 'display: none' will not work
  element = document.createElement('div')
  element.style.width = '1px'
  element.style.height = '1px'
  element.style.margin = '-1px'
  element.style.padding = '0'
  element.style.border = '0'
  element.style.clip = 'rect(0 0 0 0)'
  element.style.position = 'absolute'
  element.style.whiteSpace = 'nowrap'

  // Attach sprite to DOM element
  element.innerHTML = sprite

  // Insert sprite to DOM tree
  document.body.insertBefore(element, document.body.childNodes[0])
}

/**
 * Detach sprite from DOM tree
 */
function detachSprite () {
  if (!element || !isBrowser) {
    return
  }

  document.body.removeChild(element)
  element = null
}

/**
 * Component which allows using flags sprite when it's mounted
 */
class CountryFlagsSprite extends React.Component {
  /**
   * Attach sprite on mount when there is no other sprite yet
   */
  componentWillMount () {
    if (!mountedInstances) {
      attachSprite()
    }

    mountedInstances++
  }

  /**
   * Remove sprite on unmount when there is no sprite instance left mounted
   */
  componentWillUnmount () {
    mountedInstances--

    if (mountedInstances === 0) {
      detachSprite()
    }
  }

  /**
   * Don't update this component
   *
   * @returns {boolean}
   */
  shouldComponentUpdate () {
    return false
  }

  /**
   * Don't render it
   *
   * @returns {null}
   */
  render () {
    return null
  }
}

export default CountryFlagsSprite
