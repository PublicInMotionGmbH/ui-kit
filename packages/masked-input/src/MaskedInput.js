import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Input element. */
  renderInput: PropTypes.node.isRequired,

  /** Masking element to render when input is blurred. */
  renderMask: PropTypes.func.isRequired
}

const defaultProps = {
}

/**
 * Component which represents Masked Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class MaskedInput extends React.Component {
  state = {
    value: this.props.value,
    focused: false
  }

  handleFocusChange = (focused, e) => {
    this.setState({ focused })
    console.log('handleFocusChange: ', focused)
    const { onFocus, onBlur } = this.props

    if (focused && onFocus) {
      onFocus(focused, e)
    }
    if (!focused && onBlur) {
      onBlur(focused, e)
    }
  }

  handleChange = (v) => {
    this.setState({ value: v })
  }

  getInputProps = () => {
    const { renderInput } = this.props
    const { onBlur, onFocus, onChange } = renderInput
    const { handleFocusChange, handleChange } = this

    return {
      ...renderInput.props,
      onBlur: handleFocusChange.bind(this, false),
      onFocus: handleFocusChange.bind(this, true),
      onChange: (...args) => { handleChange(...args); onChange && onChange(...args) }
    }
  }

  maskRenderer = () => {
    const { focused, value } = this.state
    const { renderMask } = this.props
    console.log(focused)

    if (!focused && value) {
      const element = renderMask(value)
      return React.cloneElement(element, {
        ...element.porps,
        className: buildClassName(['masked-input', 'mask'], element.className)
      })
    }
    return null
  }

  render () {
    const { className, error, renderInput, renderMask, value, ...passedProps } = this.props
    const { handleChange, getInputProps, maskRenderer } = this
    const wrapperCls = buildClassName('masked-input', className)
    const mask = maskRenderer()
    const inputProps = getInputProps()


    return (
      <div className={wrapperCls} {...passedProps}>
        { mask }
        { React.cloneElement(renderInput, inputProps) }
      </div>
    )
  }
}

MaskedInput.propTypes = propTypes

MaskedInput.defaultProps = defaultProps

export default MaskedInput
