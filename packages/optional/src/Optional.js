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

  /** Optional element */
  optionalElement: PropTypes.node,

  /** Send value to parent component */
  onChange: PropTypes.func,

  /** Placeholder to display in textarea */
  placeholder: PropTypes.string,

  /** Read only textarea */
  readOnly: PropTypes.bool,

  /** Value passed to component */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const defaultProps = {
  optionalElement: <Textarea />
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
     (this.props.collapsible && this.props.open)
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
  handleChange = (value) => {
    const { onChange } = this.props
    const { visible } = this.state

    this.setState({
      value: value
    })

    if (!visible) {
      value = null
    }

    if (onChange) {
      onChange(value)
    }
  }

  /**
   * Handle Checkbox change
   * @param {*} value
   */
  handleCheckboxChange = (value) => {
    this.setState({
      visible: value
    })
  }

  render () {
    const { className, collapsible, disabled, label, name, open, optionalElement, placeholder, readOnly, onChange, ...passedProps } = this.props
    const { value, visible } = this.state

    const clsName = buildClassName(moduleName, className)
    const clsLabelName = buildClassName([moduleName, 'label'])
    const clsCheckboxName = buildClassName([moduleName, 'checkbox'])

    return (
      <div
        className={clsName} {...passedProps}
      >
        {collapsible &&
          <Checkbox
            className={clsCheckboxName}
            onChange={this.handleCheckboxChange}
            value={visible}
            disabled={disabled}
          >
            <span className={clsLabelName}>{label}</span>
          </Checkbox>}
        {!collapsible && label && <span className={clsLabelName}>{label}</span>}
        {visible &&
          React.cloneElement(
            optionalElement, {
              value: value,
              onChange: this.handleChange,
              placeholder,
              disabled,
              readOnly
            }
          )
        }
      </div>
    )
  }
}

Optional.displayName = 'Optional'

Optional.defaultProps = defaultProps
Optional.propTypes = propTypes

export default Optional
