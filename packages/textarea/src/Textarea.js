import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Disabled textarea */
  disabled: PropTypes.bool,

  /** Placeholder for textarea */
  placeholder: PropTypes.string,

  /** Resize textarea */
  resize: PropTypes.bool,

  /** Component used as textarea */
  TextareaComponent: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),

  /** Handler for change */
  onChange: PropTypes.func,

  /** Text to pass inside */
  value: PropTypes.string
}

const defaultProps = {
  resize: true,
  TextareaComponent: 'textarea'
}
/**
 * Component which represents Textarea.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {bool} [props.disabled]
 * @property {string} [props.placeholder]
 * @property {bool} [props.resize]
 * @property {function} [props.onChange]
 * @property {string} [props.value]
 * @property {string|function} [props.TextareaComponent]
 * @class {React.Element}
 */
class Textarea extends React.PureComponent {
  state = {
    value: this.props.value == null ? '' : this.props.value
  }

  /**
   * Update state when new props came
   *
   * @param {object} props
   * @param {object} state
   *
   * @returns {object || null}
   */
  static getDerivedStateFromProps (props, state) {
    if (props.value != null && props.value !== state.value) {
      return { value: props.value }
    } else return null
  }

  /**
   * Handle textarea change.
   *
   * @param {SyntheticEvent} event
   */
  change = event => {
    const { value, onChange } = this.props
    const nextValue = event.target.value

    if (value == null) {
      this.setState({ value: nextValue })
    }

    // Trigger change to parent components
    if (onChange) {
      onChange(nextValue, event)
    }
  }

  render () {
    const {
      className, disabled, placeholder, resize, error,
      TextareaComponent, value, onChange, ...passedProps
    } = this.props

    const clsName = buildClassName('textarea', className, { 'no-resize': !resize, disabled })

    return (
      <TextareaComponent
        className={clsName}
        disabled={disabled}
        placeholder={placeholder}
        value={this.state.value}
        onChange={this.change}
        {...passedProps}
      />
    )
  }
}

Textarea.displayName = 'Textarea'

Textarea.propTypes = propTypes
Textarea.defaultProps = defaultProps

export default Textarea
