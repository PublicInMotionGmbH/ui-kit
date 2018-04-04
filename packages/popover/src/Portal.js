import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

/**
* Component which represents Portal.
*
* @property {object} props
* @property {string} [props.attachTo]
* @property {*} [props.children]
* @property {string} [props.elementType]
* @class
*/
class Portal extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement(this.props.tagName || 'div')
    this.attachTo = this.props.attachTo || document.querySelector('body')
  }

  componentDidMount () {
    this.attachTo.appendChild(this.el)
  }

  componentWillUnmount () {
    this.attachTo.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

Portal.propTypes = {
  /** Root node of portal */
  attachTo: PropTypes.node,

  /** Children */
  children: PropTypes.node,

  /** A string that specifies the type of parent element */
  tagName: PropTypes.string
}

export default Portal
