import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Textarea } from '@talixo/textarea'
import { Checkbox } from '@talixo/checkbox'

const moduleName = 'optional'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Textarea should collapse or not */
  collapsible: PropTypes.bool,

  /** Disable textarea and checkbox */
  disabled: PropTypes.bool,

  /** Label to display */
  label: PropTypes.string,

  /** Name of form field */
  name: PropTypes.string,

  /** Should be open initially when collapsible */
  open: PropTypes.bool,

  /** Send value to parent component */
  onChange: PropTypes.func,

  /** Placeholder to display in textarea */
  placeholder: PropTypes.string,

  /** Read only textarea */
  readOnly: PropTypes.bool,

  /** Value passed to component */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

/**
 * Component which represents Optional.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.collapsible]
 * @property {boolean} [props.disabled]
 * @property {string} [props.label]
 * @property {string} [props.name]
 * @property {boolean} [props.open]
 * @property {function} [props.onChange]
 * @property {string} [props.placeholder]
 * @property {boolean} [props.readOnly]
 * @property {string || number} [props.value]
 *
 * @class {React.Element}
 */
class Optional extends React.PureComponent {
  state = {
    value: this.props.value || null,
    visible: !this.props.collapsible ||
     (this.props.collapsible && this.props.open) ||
     false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value != null && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  /**
   * Send value to parent when change
   *
   * @param {SyntheticEvent} e
   */
  handleChange = (e) => {
    const { onChange } = this.props
    const newValue = e.target.value

    if (onChange) {
      onChange(newValue)
    }
  }

  /**
   * Handle Textarea change
   * @param {*} value
   */
  handleTextareaChange (value) {
    this.setState({
      value: value
    })
  }

  /**
   * Handle Checkbox change
   * @param {*} value
   */
  handleCheckboxChange (value) {
    this.setState({
      visible: value
    })
  }

  render () {
    const { className, collapsible, disabled, label, name, open, placeholder, readOnly, ...passedProps } = this.props
    const { value, visible } = this.state

    const clsName = buildClassName(moduleName, className)
    const clsLabelName = buildClassName([moduleName, 'label'], className)
    const clsCheckboxName = buildClassName([moduleName, 'checkbox'], className)

    return (
      <div
        className={clsName} {...passedProps}
        name={name}
        label={label}
        value={value}
        onChange={this.handleChange}
      >
        {collapsible &&
          <Checkbox
            className={clsCheckboxName}
            onChange={(value) => this.handleCheckboxChange(value)}
            value={visible}
            disabled={disabled}
          >
            {<span className={clsLabelName}>{label}</span>}
          </Checkbox>}
        {!collapsible && label && <span className={clsLabelName}>{label}</span>}
        {visible &&
          <Textarea
            value={value}
            onChange={(value) => this.handleTextareaChange(value)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
          />}
      </div>
    )
  }
}

Optional.displayName = 'Optional'

Optional.propTypes = propTypes

export default Optional
