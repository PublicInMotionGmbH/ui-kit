import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Checkbox } from '@talixo/checkbox'

const moduleName = 'optional'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Disable textarea and checkbox */
  disabled: PropTypes.bool,

  /** Label to display */
  label: PropTypes.string,

  /** Should be open initially when collapsible */
  open: PropTypes.bool,

  /** Optional element */
  children: PropTypes.node,

  /** Send value to parent component */
  onChange: PropTypes.func,

  /** Value to pass to optional element */
  value: PropTypes.any,

  /** Name to pass to optional element */
  name: PropTypes.any,

  /** Error to pass to optional */
  error: PropTypes.any,

  /** onBlur to pass to optional */
  onBlur: PropTypes.func,

  /** onFocus to pass to optional */
  onFocus: PropTypes.func,

  /** id to pass to optional */
  id: PropTypes.string,

  /** Read-only prop to pass to optional element */
  readOnly: PropTypes.bool
}

/**
 * Component which represents Optional.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.label]
 * @property {string} [props.name]
 * @property {function} [props.onChange]
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.readOnly]
 * @property {function} [props.onBlur]
 * @property {function} [props.onFocus]
 * @property {string} [props.id]
 * @property {*} [props.error]
 * @property {*} [props.value]
 *
 * @class
 */
class Optional extends React.PureComponent {
  state = {
    value: this.props.value || null,
    visible: this.props.value != null
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
        visible: nextProps.value !== null
      })
    }
  }

  /**
   * Send value to parent after change.
   *
   * @param {*} value
   */
  handleChange = (value) => {
    const { onChange, value: propValue } = this.props

    if (propValue === undefined) {
      this.setState({
        value: value
      })
    }

    if (onChange) {
      onChange(value)
    }
  }

  /**
   * Handle visibility checkbox change.
   *
   * @param {boolean} visible
   */
  handleCheckboxChange = (visible) => {
    const { onChange } = this.props
    const value = visible ? this.state.value : null

    this.setState({ visible })

    if (onChange && (value !== this.state.value || visible !== this.state.visible)) {
      onChange(value)
    }
  }

  render () {
    const {
      className, label, children, onChange,
      id, name, value: propValue, readOnly, disabled, error, onBlur, onFocus, ...passedProps
    } = this.props
    const { value, visible } = this.state

    const clsName = buildClassName(moduleName, className)
    const clsLabelName = buildClassName([ moduleName, 'label' ])
    const clsCheckboxName = buildClassName([ moduleName, 'checkbox' ])

    const checkbox = (
      <Checkbox
        className={clsCheckboxName}
        onChange={this.handleCheckboxChange}
        value={visible}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
      >
        <span className={clsLabelName}>{label}</span>
      </Checkbox>
    )

    const inputProps = { id, readOnly, disabled, error, name, value, onBlur, onFocus }

    for (let key in inputProps) {
      if (inputProps[key] === undefined) {
        delete inputProps[key]
      }
    }

    const element = React.Children.only(children)
    const input = visible ? React.cloneElement(element, {
      ...inputProps,
      onChange: this.handleChange
    }) : null

    return (
      <div className={clsName} {...passedProps}>
        {checkbox}
        {input}
      </div>
    )
  }
}

Optional.displayName = 'Optional'

Optional.propTypes = propTypes

export default Optional
