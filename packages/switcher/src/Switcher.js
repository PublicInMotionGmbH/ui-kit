import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Label for "No" */
  noLabel: PropTypes.node,

  /** Label for "Yes" */
  yesLabel: PropTypes.node,

  /** Is it checked? */
  value: PropTypes.bool,

  /** Callback for change event */
  onChange: PropTypes.func,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  yesLabel: 'Yes',
  noLabel: 'No',
  disabled: false,
  readOnly: false
}

/**
 * Component which represents Yes/No switcher.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.yesLabel]
 * @property {string} [props.noLabel]
 * @property {boolean} [props.value]
 * @property {boolean} [props.defaultChecked]
 * @property {function} [props.onChange]
 * @class
 */
class Switcher extends React.PureComponent {
  state = {
    value: this.props.value == null ? !!this.props.defaultChecked : !!this.props.value
  }

  componentWillReceiveProps (props) {
    if (props.value != null && props.value !== this.props.value) {
      this.setState({ value: props.value })
    }
  }

  change = (event) => {
    const nextValue = event.target.checked

    if (this.props.value == null) {
      this.setState({ value: nextValue })
    }

    if (this.props.onChange) {
      this.props.onChange(nextValue)
    }
  }

  render () {
    const { className, noLabel, yesLabel, onChange, value: _value, defaultChecked, ...passedProps } = this.props
    const { value } = this.state

    const clsName = buildClassName('switcher', className, {
      disabled: this.props.disabled
    })

    return (
      <label className={clsName}>
        <input
          type='checkbox'
          onChange={this.change}
          checked={value}
          {...passedProps}
        />

        <span>
          <span className={prefix('switcher__yes')}>{yesLabel}</span>
          <span className={prefix('switcher__no')}>{noLabel}</span>
        </span>
      </label>
    )
  }
}

Switcher.propTypes = propTypes
Switcher.defaultProps = defaultProps

export default Switcher
