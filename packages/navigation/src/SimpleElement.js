import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'navigation-element'

function isEmpty (obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true
    }
  }
  return false
}

const propTypes = {
  /**  */
  active: PropTypes.bool,

  /**  */
  completed: PropTypes.bool,

  /**  */
  children: PropTypes.node,

  /**  */
  disabled: PropTypes.bool,

  /**  */
  error: PropTypes.bool,

  /**  */
  hasSubelements: PropTypes.bool,

  /**  */
  id: PropTypes.number,

  /**  */
  name: PropTypes.string,

  /**  */
  onMouseOver: PropTypes.func,

  /**  */
  onClick: PropTypes.func,

  /**  */
  open: PropTypes.bool,

  /**  */
  render: PropTypes.func,

  /**  */
  subelements: PropTypes.array,

  /**  */
  subtitle: PropTypes.string,

  /**  */
  type: PropTypes.string
}

const defaultProps = {
  name: '',
  render: x => x.label
}

class Element extends React.Component {
  state = {
    open: this.props.open,
    active: this.props.active || this.props.open
  }
  element = null

  static getDerivedStateFromProps (nextProps, prevState) {
    const newState = {}
    if (nextProps.open != null && nextProps.open !== prevState.open) {
      newState.open = nextProps.open
    }
    if (nextProps.active != null && nextProps.active !== prevState.active) {
      newState.active = nextProps.active
    }
    if (!isEmpty(newState)) {
      return newState
    }
    return null
  }

  /**
   * Remove listeners when component is unmounted.
   */
  componentWillUnmount () {
    this.detachListener()
    this.element = null
  }

  /**
   * Save reference to own DOM Element,
   * required to detect closing event.
   *
   * @param {Element} element
   */
  saveRef = (element) => {
    this.element = findDOMNode(element)
  }

  /**
   * Handle click on any element,
   * to check if sidebar element should be closed now.
   *
   * @param {Event} e
   */
  handleClose = (e) => {
    const state = {}

    // Ignore when there is no DOM element attached
    if (!this.element) {
      return
    }

    // Find HTML element
    const html = document.documentElement

    // Iterate over elements in Event to see if it was click on this element
    // Or its children
    let target = e.target
    while (target !== html && target !== this.element) {
      target = target.parentElement
    }

    // Ignore click when it's inside of current element
    if (target === this.element) {
      return
    }

    // Close current sidebar if it was clicked outside
    if (this.props.open == null) {
      state.open = false
    }

    // Close current sidebar if it was clicked outside
    if (this.props.active == null) {
      state.active = false
    }
    this.setState(state)

    // Detach events to not listen on it without reason
    this.detachListener()
  }

  /**
   * Handle click on SidebarElement button,
   * To eventually toggle inner children.
   *
   * @param {Event} e
   */
  handleClick = (e) => {
    const { disabled, subelement, id, onClick } = this.props
    const open = !this.state.open
    const state = {}
    const hasSubelement = !!subelement
    e.stopPropagation()

    if (disabled) {
      return
    }

    // Toggle opening status when it could be open
    if (hasSubelement) {
      if (this.props.open == null) {
        state.open = open
      }
      if (this.props.active == null) {
        state.active = open
      }

      if (open && this.shouldAttachListeners()) {
        this.attachListener()
      } else {
        this.detachListener()
      }
    }

    this.setState(state)
    // Propagate event to `onClick` property
    if (onClick) {
      onClick(id, open)
    }
  }

  handleMouseOver (e) {
    const { id, onMouseOver } = this.props
    if (onMouseOver) {
      onMouseOver(id, e)
    }
  }

  attachListener () {
    // Ignore when there is no DOM element attached
    // As it may be running in Node.js environment
    if (!this.element) {
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
    if (!this.element) {
      return
    }

    // Detach previous listeners
    document.documentElement.removeEventListener('click', this.handleClose)
    window.removeEventListener('hashchange', this.handleClose)
    window.removeEventListener('popstate', this.handleClose)
    window.removeEventListener('close-sidebar', this.handleClose)
  }

  shouldAttachListeners () {
    const { type } = this.props
    return type === 'navbar' || type === 'sidebar' || type === 'tabs'
  }

  renderMenu () {
    const { subelement } = this.props
    const menuCls = buildClassName([ moduleName, 'menu' ])
    return !subelement
      ? null
      : <div className={menuCls}>
        { subelement }
      </div>
  }

  render () {
    const { active: propsActive, className, completed, children, disabled, error, id, label, onMouseOver,
      onClick, open: propsOpen, panel, render, subelement, subelements, subtitle, type, ...restProps
    } = this.props

    const { active, open } = this.state

    const elementCls = buildClassName(moduleName, className, { active, completed, disabled, error, open })
    const buttonCls = buildClassName([ moduleName, 'button' ])
    const renderElement = render(this.props, { open, active })

    return (
      <div
        className={elementCls}
        onClick={this.handleClick}
        ref={this.saveRef}
        {...restProps}
      >
        <div className={buttonCls}>{ renderElement || children }</div>
        { this.renderMenu() }
      </div>
    )
  }
}

Element.propTypes = propTypes

Element.defaultProps = defaultProps

export default Element
