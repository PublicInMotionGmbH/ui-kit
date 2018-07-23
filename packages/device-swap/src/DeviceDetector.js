class DeviceDetector {
  constructor () {
    window.dev = this
    Object.defineProperty(this, 'registeredListeners', {
      enumerable: false,
      configurable: false,
      value: []
    })

    Object.defineProperty(this, 'viewType', {
      enumerable: false,
      configurable: true,
      value: null
    })

    const clearListeners = () => {
      window.removeEventListener('mouseover', listenForMouseOver)
      window.removeEventListener('touchstart', listenForTouch)
    }

    const listenForMouseOver = () => {
      this.setViewType('desktop')
      clearListeners()
    }

    const listenForTouch = () => {
      this.setViewType('mobile')
      clearListeners()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mouseover', listenForMouseOver)
      window.addEventListener('touchstart', listenForTouch)
    }
  }

  addListener (listener) {
    this.registeredListeners.push(listener)

    return () => this.removeListener(listener)
  }

  removeListener (listener) {
    for (let i = 0; i < this.registeredListeners.length; i++) {
      if (this.registeredListeners[i] === listener) {
        this.registeredListeners.splice(i, 1)
        i--
      }
    }
  }

  setViewType (type) {
    if (type !== 'desktop' && type !== 'mobile') {
      throw new Error('Incorrect view type')
    }

    if (this.viewType === type) {
      return
    }

    Object.defineProperty(this, 'viewType', {
      enumerable: false,
      configurable: true,
      value: type
    })

    for (let i = 0; i < this.registeredListeners.length; i++) {
      this.registeredListeners[i](type)
    }
  }

  getViewType () {
    return this.viewType
  }

  isMobile () {
    return this.viewType === null ? null : this.viewType === 'mobile'
  }

  isDesktop () {
    return this.viewType === null ? null : this.viewType === 'desktop'
  }

  isDetermined () {
    return this.viewType !== null
  }
}

export default DeviceDetector
