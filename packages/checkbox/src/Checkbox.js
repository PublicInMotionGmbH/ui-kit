import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'checkbox'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Checkbox description */
  children: PropTypes.node,

  /** Is checkbox checked? */
  value: PropTypes.bool,

  /** Indicates that input has error */
  error: PropTypes.bool,

  /** Additional styles for wrapper */
  style: PropTypes.object,

  /** Event handler for change of checked status */
  onChange: PropTypes.func
}

const defaultProps = {
  error: false,
  defaultChecked: false
}

/**
 * Component which represents checkbox.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.error]
 * @property {boolean} [props.value]
 * @property {function} [props.onChange]
 * @property {node} [props.children]
 * @property {string} [props.size]
 * @property {object} [props.style]
 * @class
 */
class Checkbox extends React.PureComponent {
  state = {
    value: this.props.value == null ? !!this.props.defaultChecked : !!this.props.value
  }

  componentWillReceiveProps (props) {
    if (props.value !== this.state.value && props.value != null) {
      this.setState({ value: props.value })
    }
  }

  change = (event) => {
    const value = event.target.checked

    if (this.props.value == null) {
      this.setState({ value })
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }

    // Focus label if it was changed due to click
    // To have separated styles for clicked and focused element by keyboard
    if (!this.changeBySpacebar) {
      this.label.focus()
    }

    // Reset "change by spacebar"
    this.changeBySpacebar = false
  }

  /**
   * Handle 'keyDown' event to get information if space-bar was clicked.
   * When checkbox element is focused, after clicking space bar it will be (un)ticked.
   * We would like to get styles for focused checkbox, but not including it for checkbox which was clicked.
   * This behavior should be for keyboard-masters only, to show them focus on this element.
   *
   * @param {Event|SyntheticEvent} event
   */
  keyDown = (event) => {
    const { onKeyDown } = this.props

    // Space-bar - it's (un)ticking checkbox
    this.changeBySpacebar = event.keyCode === 32

    if (onKeyDown) {
      onKeyDown(event)
    }
  }

  saveLabelRef = ref => {
    this.label = findDOMNode(ref)
  }

  render () {
    const { children, className, error, style, value, onChange, onKeyDown, ...passedProps } = this.props
    const _value = this.state.value

    const clsName = buildClassName(moduleName, className, { error })

    return (
      <label className={clsName} style={style}>
        <input
          type='checkbox'
          onChange={this.change}
          onKeyDown={this.keyDown}
          checked={_value}
          {...passedProps}
        />
        <span ref={this.saveLabelRef} tabIndex={-1}>{children}</span>
      </label>
    )
  }
}

Checkbox.propTypes = propTypes

Checkbox.defaultProps = defaultProps

export default Checkbox
