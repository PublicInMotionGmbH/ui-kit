import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const propTypes = {
  /** Root node of portal */
  attachTo: PropTypes.object,

  /** Children */
  children: PropTypes.node
}

/**
* Component which represents Portal.
*
* @property {object} props
* @property {string} [props.attachTo]
* @property {*} [props.children]
* @class
*/
class Portal extends React.PureComponent {
  constructor (props) {
    super(props)

    this.el = typeof document !== 'undefined'
      ? document.createElement('div')
      : null
  }

  componentWillReceiveProps (props) {
    // Do not do anything on Node.js environment
    if (typeof document === 'undefined') {
      return
    }

    // When Portal is already mounted and root node has changed,
    // Immediately move it to another container
    if (this.mounted && props.attachTo !== this.props.attachTo) {
      const attachTo = props.attachTo || document.body

      attachTo.appendChild(this.el)
    }
  }

  componentDidMount () {
    this.getParentContainer().appendChild(this.el)
    this.mounted = true
  }

  componentWillUnmount () {
    this.getParentContainer().removeChild(this.el)
    this.mounted = false
  }

  getParentContainer () {
    return this.props.attachTo || document.body
  }

  render () {
    // Do not use portals in Node.js environment
    if (typeof document === 'undefined') {
      return null
    }

    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

Portal.displayName = 'Portal'

Portal.propTypes = propTypes

export default Portal
