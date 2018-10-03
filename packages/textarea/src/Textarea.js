import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Disabled textarea */
  disabled: PropTypes.bool,

  /** Indicates that textarea has error */
  error: PropTypes.bool,

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
 * @property {bool} [props.error]
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

  componentWillReceiveProps (props) {
    if (props.value != null && props.value !== this.props.value) {
      this.setState({ value: props.value })
    }
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

    const clsName = buildClassName('textarea', className, { 'no-resize': !resize, disabled, error })

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
