import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('text-input')

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
    if (onChange) { onChange(e) }
  }

  render () {
    const {
      props: { className, hasError, onChange, placeholder, size, style, ...restProps },
      state: { inputValue },
      onInputChange
    } = this

    const inputClasses = cls(moduleName, className, {
      [`${moduleName}--${size}`]: size,
      [`${moduleName}--error`]: hasError
    })
    const wrapperClasses = cls(`${moduleName}__wrapper`, {
      [[`${moduleName}__wrapper--${size}`]]: size
    })
    const labelClasses = cls(`${moduleName}__label`, {
      [`${moduleName}__label--${size}`]: size,
      [`${moduleName}__label--error`]: hasError,
      [`${moduleName}__label--not-empty`]: inputValue
    })

    return (
      <div
        className={wrapperClasses}
        style={style}
      >
        <input
          type='text'
          className={inputClasses}
          onChange={onInputChange}
          {...restProps}
        />
        <label
          className={labelClasses}
        >
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
  hasError: false,
  onChange: () => {}
}

export default TextInput
