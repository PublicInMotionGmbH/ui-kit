import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

/**
* Component which represents Portal.
*
* @property {object} props
* @property {string} [props.attachTo]
* @property {*} [props.children]
* @class
*/
class Portal extends React.Component {
  constructor (props) {
    super(props)

    this.el = document.createElement('div')
  }

  componentDidMount () {
    this.getParentContainer().appendChild(this.el)
  }

  componentWillUnmount () {
    this.getParentContainer().removeChild(this.el)
  }

  getParentContainer () {
    return this.props.attachTo || document.body
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

Portal.propTypes = {
  /** Root node of portal */
  attachTo: PropTypes.object,

  /** Children */
  children: PropTypes.node
}

export default Portal
