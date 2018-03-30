import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

import Icon from '@talixo/icon'

const moduleName = prefix('sidebar-element')

/**
 * Component which represents sidebar element,
 * which can be also opened.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.children]
 * @property {string} props.icon
 * @property {string|*} props.label
 * @property {boolean} props.active
 *
 * @property {object} state
 * @property {boolean} state.isOpen
 *
 * @property {Element} node  reference to DOM element of Sidebar
 *
 * @class
 */
class SidebarElement extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.saveRef = this.saveRef.bind(this)

    this.node = null
    this.state = {
      isOpen: false
    }
  }

  /**
   * Remove listeners when component is unmounted.
   */
  componentWillUnmount () {
    this.detachListener()
    this.node = null
  }

  /**
   * Save reference to own DOM Element,
   * required to detect closing event.
   *
   * @param {Element} node
   */
  saveRef (node) {
    this.node = node
  }

  /**
   * Handle click on any element,
   * to check if sidebar element should be closed now.
   *
   * @param {Event} e
   */
  handleClose (e) {
    // Ignore when there is no DOM element attached
    if (!this.node) {
      return
    }

    // Find HTML element
    const html = document.documentElement

    // Iterate over elements in Event to see if it was click on this element
    // Or its children
    let element = e.target
    while (element !== html && element !== this.node) {
      element = element.parentElement
    }

    // Ignore click when it's inside of current element
    if (element === this.node) {
      return
    }

    // Close current sidebar if it was clicked outside
    this.setState({ isOpen: false })

    // Detach events to not listen on it without reason
    this.detachListener()
  }

  /**
   * Handle click on SidebarElement button,
   * To eventually toggle inner children.
   *
   * @param {Event} e
   */
  handleClick (e) {
    const { children, onClick } = this.props

    // Toggle opening status when it could be isOpen
    if (children) {
      const isOpen = !this.state.isOpen

      this.setState({ isOpen: isOpen })

      if (isOpen) {
        this.attachListener()
      } else {
        this.detachListener()
      }
    }

    // Propagate event to `onClick` property
    if (onClick) {
      onClick(e)
    }
  }

  attachListener () {
    // Ignore when there is no DOM element attached
    // As it may be running in Node.js environment
    if (!this.node) {
      return
    }

    // Detach previous listeners
    this.detachListener()

    // Attach new listeners
    document.documentElement.addEventListener('click', this.handleClose)
    window.addEventListener('hashchange', this.handleClose)
    window.addEventListener('popstate', this.handleClose)
    window.addEventListener('close-sidebar', this.handleClose)
  }

  detachListener () {
    // Ignore when there is no DOM element attached
    // As it may be running in Node.js environment
    if (!this.node) {
      return
    }

    // Detach previous listeners
    document.documentElement.removeEventListener('click', this.handleClose)
    window.removeEventListener('hashchange', this.handleClose)
    window.removeEventListener('popstate', this.handleClose)
    window.removeEventListener('close-sidebar', this.handleClose)
  }

  render () {
    const { className, icon, label, active, children, onClick, ...passedProps } = this.props
    const { isOpen } = this.state

    // Build class name with modifiers according to current state
    const clsName = cls(moduleName, className, {
      [`${moduleName}--active`]: active,
      [`${moduleName}--open`]: isOpen
    })

    // Check if we do have single children inside
    const element = children ? React.Children.only(children) : null

    // Build button
    const button = (
      <div className={`${moduleName}__button`} onClick={this.handleClick}>
        <Icon name={icon} />
        {label}
      </div>
    )

    return (
      <div className={clsName} {...passedProps} ref={this.saveRef}>
        {button}
        {element}
      </div>
    )
  }
}

SidebarElement.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Icon name */
  icon: PropTypes.string.isRequired,

  /** Label to show with icon */
  label: PropTypes.node.isRequired,

  /** Is this element already active? */
  active: PropTypes.bool,

  /** Additional handler for clicking on button */
  onClick: PropTypes.func
}

SidebarElement.defaultProps = {
  active: false
}

export default SidebarElement
