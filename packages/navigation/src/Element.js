import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

export const moduleName = 'navigation-element'

/**
 * Default elements renderer.
 *
 * @param {object} props
 * @param {object} options
 * @returns {Element|ReactElement}
 */
function defaultRender (props, options) {
  return props.type !== 'tree'
    ? props.label
    : <span>
      <Icon
        style={{ visibility: props.subelements ? 'visible' : 'hidden' }}
        name={options.open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
      />
      { props.label }
    </span>
}

const propTypes = {
  /** Is element active? */
  active: PropTypes.bool,

  /** Element children. */
  children: PropTypes.node,

  /** Additional class name passedto element wrapper. */
  className: PropTypes.string,

  /** Is action related to this element completed (e.g. iniside a step)? */
  completed: PropTypes.bool,

  /** Is element disabled? */
  disabled: PropTypes.bool,

  /** Does it have ana error? */
  error: PropTypes.bool,

  /** Element identifier. It will be passed to onChange and onHover functions as a first argument. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Element label. */
  label: PropTypes.node,

  /** onClick callback. */
  onClick: PropTypes.func,

  /** Is this element open? */
  open: PropTypes.bool,

  /** Render method of each element. */
  render: PropTypes.func,

  /** Array of subelements. Any of element prop can be passed to each object. */
  subelements: PropTypes.arrayOf(PropTypes.object),

  /** Subtitle of element exapandable menu. */
  subtitle: PropTypes.node,

  /** Navigation type. */
  type: PropTypes.string
}

const defaultProps = {
  render: defaultRender
}

/**
 * Component which represents Navigation Element.
 *
 * @property {object} props
 * @property {boolean} [props.active]
 * @property {node} [props.children]
 * @property {string} [props.className]
 * @property {boolean} [props.completed]
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.error]
 * @property {number|string} [props.id]
 * @property {string} [props.label]
 * @property {function} [props.onClick]
 * @property {boolean} [props.open]
 * @property {function} [props.render]
 * @property {object[]} [props.subelements]
 * @property {node} [props.subtitle]
 * @property {string} [props.type]
 *
 * @property {object} state
 * @property {string} state.active
 * @property {string} state.open
 *
 * @property {node} element
 *
 * @class Element
 */
class Element extends React.Component {
  state = {
    active: this.props.active || this.props.open || false,
    open: this.props.open || false
  }
  element = null

  componentWillReceiveProps (nextProps) {
    const newState = {}
    if (nextProps.open != null && nextProps.open !== this.state.open) {
      newState.open = nextProps.open
    }
    if (nextProps.active != null && nextProps.active !== this.state.active) {
      newState.active = nextProps.active
    }
    this.setState(newState)
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
   * to check if it should be closed now.
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

    // Close current element if it was clicked outside
    if (this.props.open == null) {
      state.open = false
    }

    // Remove active class from element if it was clicked outside
    if (this.props.active == null) {
      state.active = false
    }
    this.setState(state)

    // Detach events to not listen on it without reason
    this.detachListener()
  }

  /**
   * Handle click on Element button,
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
    e.preventDefault()

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

  /**
   * Attach listeners which will check if element should be closed.
   */
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
  }

  /**
   * Detach all listeners.
   */
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
  }

  /**
   * Checks if listeners should be added.
   *
   * @returns {boolean}
   */
  shouldAttachListeners () {
    const { type } = this.props
    return type === 'navbar' || type === 'sidebar'
  }

  /**
   * Renders collapsible menu with subelements.
   *
   * @returns {null|Element|ReactElement}
   */
  renderMenu () {
    const { subelement } = this.props
    const menuCls = buildClassName([ moduleName, 'menu' ])
    return (
      <div className={menuCls}>
        { subelement }
      </div>
    )
  }

  render () {
    const { active: propsActive, className, completed, children, disabled, error, id, label,
      onClick, open: propsOpen, panel, render, subelement, subelements, subtitle, type, ...restProps
    } = this.props

    const { active, open } = this.state

    const elementCls = buildClassName(moduleName, className, { active, completed, disabled, error, open })
    const buttonCls = buildClassName([ moduleName, 'button' ])

    const renderElement = render(this.props, { open, active }) || children
    const menuElement = subelements ? this.renderMenu() : null

    return (
      <div
        className={elementCls}
        ref={this.saveRef}
        {...restProps}
      >
        <div onClick={this.handleClick} className={buttonCls}>{ renderElement }</div>
        { menuElement }
      </div>
    )
  }
}

Element.displayName = 'NavigationElement'

Element.propTypes = propTypes

Element.defaultProps = defaultProps

export default Element
