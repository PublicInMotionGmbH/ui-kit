import React from 'react'

let loadingGoogleMapsApi = false

/**
 * HOC to build component, that depends on Google Maps API.
 *
 * @param {function} BaseComponent
 * @returns {function}
 */
function withGoogleMapsApi (BaseComponent) {
  const factory = React.createFactory(BaseComponent)

  /**
   * Component which is required to ensure that Google Maps API is available.
   *
   * @property {object} props
   * @property {string} [props.googleMapURL]
   * @property {*} props.loadingElement
   *
   * @property {object} state
   * @property {boolean} state.google
   *
   * @property {number} [timeout]
   *
   * @class
   */
  class EnsureGoogleMapsApi extends React.PureComponent {
    state = {
      google: typeof window !== 'undefined' && !!window.google
    }

    componentDidMount () {
      if (typeof window === 'undefined' || this.state.google) {
        return
      }

      this.loadGoogleMapsApi()
      this.tick()
    }

    componentWillUnmount () {
      clearTimeout(this.timeout)
    }

    loadGoogleMapsApi () {
      // There should be only one instance of Google Maps API
      if (loadingGoogleMapsApi) {
        return
      }

      if (!this.props.googleMapURL) {
        return
      }

      if (typeof window === 'undefined') {
        return
      }

      loadingGoogleMapsApi = true

      const script = document.createElement('script')
      script.src = this.props.googleMapURL
      script.async = true
      document.body.appendChild(script)
    }

    tick = () => {
      if (window.google) {
        return this.setState({ google: true })
      }

      this.timeout = setTimeout(this.tick, 100)
    }

    render () {
      const { loadingElement, googleMapURL, ...passedProps } = this.props
      const { google } = this.state

      if (!google) {
        return loadingElement
      }

      return factory(passedProps)
    }
  }

  EnsureGoogleMapsApi.displayName = `withGoogleMapsApi(${BaseComponent.displayName || BaseComponent.name})`

  return EnsureGoogleMapsApi
}

export default withGoogleMapsApi
