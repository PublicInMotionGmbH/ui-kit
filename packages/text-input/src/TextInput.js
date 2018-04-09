import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Text Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.hasError]
 * @param {function} [props.onChange]
 * @param {string} [props.placeholder]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @class
 */
class TextInput extends React.Component {
  constructor () {
    super()
    this.state = { inputValue: '' }
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange (e) {
    const { onChange } = this.props

    this.setState({ inputValue: e.target.value })

    if (onChange) {
      onChange(e)
    }
  }

  render () {
    const { className, hasError, onChange, placeholder, size, style, ...restProps } = this.props
    const { inputValue } = this.state

    const inputClasses = buildClassName('text-input', className, [ size ], {
      error: hasError
    })

    const wrapperClasses = buildClassName([ 'text-input', 'wrapper' ], null, [ size ])

    const labelClasses = buildClassName([ 'text-input', 'label' ], null, [ size ], {
      error: hasError,
      'not-empty': inputValue
    })

    return (
      <div className={wrapperClasses} style={style}>
        <input
          type='text'
          className={inputClasses}
          onChange={this.onInputChange}
          {...restProps}
        />
        <label className={labelClasses}>
          {placeholder}
        </label>
      </div>
    )
  }
}

TextInput.propTypes = {
  /** Additional class name for text input */
  className: PropTypes.string,

  /** Indicates that input has error */
  hasError: PropTypes.bool,

  /** Callback for change event */
  onChange: PropTypes.func,

  /** Input floating label text */
  placeholder: PropTypes.node,

  /** Size of text input (can be 'small') */
  size: PropTypes.oneOf(['small']),

  /** Additional input wrapper styling */
  style: PropTypes.object
}

TextInput.defaultProps = {
  hasError: false
}

export default TextInput
