import React from 'react'
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
  }

  render () {
    const { children, className, error, style, value, onChange, defaultChecked, ...passedProps } = this.props
    const _value = this.state.value

    const clsName = buildClassName(moduleName, className, { error })

    return (
      <label className={clsName} style={style}>
        <input
          type='checkbox'
          onChange={this.change}
          checked={_value}
          {...passedProps}
        />
        <span>{children}</span>
      </label>
    )
  }
}

Checkbox.propTypes = propTypes

Checkbox.defaultProps = defaultProps

export default Checkbox
