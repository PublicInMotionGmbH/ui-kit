import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Radio button description  */
  children: PropTypes.node,

  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Has radio input error? */
  error: PropTypes.bool,

  /** Styles passed to radio button wrapper */
  style: PropTypes.object
}

const defaultProps = {
  error: false
}

/**
 * Component which represents Radio Input.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.error]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
class RadioInput extends React.PureComponent {
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
    const { children, className, error, style, onChange, onKeyDown, ...passedProps } = this.props

    const wrapperClass = buildClassName('radio-input', className, { error })

    return (
      <label className={wrapperClass} style={style}>
        <input
          type='radio'
          onChange={this.change}
          {...passedProps}
        />
        <span tabIndex={-1}>
          <span>
            {children}
          </span>
        </span>
      </label>
    )
  }
}

RadioInput.displayName = 'RadioInput'

RadioInput.propTypes = propTypes
RadioInput.defaultProps = defaultProps

export default RadioInput
