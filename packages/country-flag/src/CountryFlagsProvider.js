import React from 'react'
import PropTypes from 'prop-types'

function load (url, callback) {
  if (url.match(/^data:/)) {
    // Handle Data URI Scheme
    let [ header, data ] = url.split(',')

    if (header.indexOf(';base64') > -1) {
      data = window.atob(data)
    } else {
      data = decodeURIComponent(data)
    }

    // Make sure that it will be asynchronous anyway (for consistency)
    const timeout = setTimeout(() => callback(null, data))

    return () => clearTimeout(timeout)
  }

  const xhr = new window.XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onload = () => {
    // Error happened
    if (xhr.status >= 400) {
      return
    }

    const div = document.createElement('div')
    div.innerHTML = xhr.responseText
    const svg = div.querySelector('svg')

    // It is not SVG response
    if (!svg || svg.parentNode !== div) {
      return
    }

    // It is OK, return it
    callback(null, xhr.responseText)
  }
  xhr.send()

  return () => xhr.abort()
}

/**
 * Component which allows using custom flags sprite in CountryFlag component.
 */
class CountryFlagsProvider extends React.PureComponent {
  registered = 0

  getChildContext () {
    return {
      registerFlag: this.registerFlag,
      unregisterFlag: this.unregisterFlag
    }
  }

  componentDidMount () {
    this.mounted = true
    this.load(this.props.url)
  }

  componentWillUnmount () {
    this.mounted = false
    this.unload()
  }

  componentWillReceiveProps (props) {
    this.load(props.url)
  }

  registerFlag = () => {
    this.registered++

    if (this.mounted) {
      this.load(this.props.url)
    }
  }

  unregisterFlag = () => {
    this.registered = Math.min(0, this.registered - 1)
  }

  load (url) {
    if (this.registered <= 0) {
      return
    }

    if (this.loadedUrl === url) {
      return
    }

    this.unload()

    this.loadedUrl = url
    this.abortRequest = load(url, (err, content) => {
      if (!err) {
        this.attach(content)
      }
    })
  }

  attach (svg) {
    this.unload()

    this.element = document.createElement('div')
    this.element.innerHTML = svg
    this.element.style.width = '1px'
    this.element.style.height = '1px'
    this.element.style.margin = '-1px'
    this.element.style.padding = '0'
    this.element.style.border = '0'
    this.element.style.clip = 'rect(0 0 0 0)'
    this.element.style.position = 'absolute'
    this.element.style.whiteSpace = 'nowrap'
    this.element.style.overflow = 'hidden'

    document.body.insertBefore(this.element, document.body.childNodes[0])
  }

  unload () {
    if (this.abortRequest) {
      this.abortRequest()
    }

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }

  /**
   * Render children.
   */
  render () {
    return this.props.children
  }
}

CountryFlagsProvider.childContextTypes = {
  registerFlag: PropTypes.func,
  unregisterFlag: PropTypes.func
}

CountryFlagsProvider.propTypes = {
  /** URL to sprite with country flags */
  url: PropTypes.string.isRequired,

  /** Children to pass down */
  children: PropTypes.node
}

export default CountryFlagsProvider
