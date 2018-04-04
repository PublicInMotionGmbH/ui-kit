import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

/**
 * Component which represents modal portal.
 *
 * @property {object} props
 * @property {Element} [props.attachTo]
 * @property {*} [props.children]
 * @class
 */
class Portal extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount () {
    const { attachTo } = this.props
    attachTo.appendChild(this.el)
  }

  componentWillUnmount () {
    const { attachTo } = this.props
    attachTo.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

Portal.propTypes = {
  /** Anything that can be displayed inside a portal */
  children: PropTypes.node,

  /** Portal root node */
  attachTo: PropTypes.object
}

export default Portal
