import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'masked-input'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Event called when input inside  input has lost focus. */
  onBlur: PropTypes.func,

  /** Event called when input inside has changed. */
  onChange: PropTypes.func,

  /** Event called when input is focused. */
  onFocus: PropTypes.func,

  /** Input element. */
  children: PropTypes.node.isRequired,

  /** Function which returns masking element to render when input is blurred. First argument function is value passed
   * either by parent changing value prop or by children if `props.value` is undefined.
   * */
  renderMask: PropTypes.func.isRequired,

  /** Value to be passed to render mask function.  */
  value: PropTypes.any,

  /** ID passed to control element */
  id: PropTypes.string
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
    value: this.props.value === undefined ? null : this.props.value,
    focused: false
  }

  /**
   * Update value inside state if it was updateed
   *
   * @param nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  /**
   * Handle focus change. Update focused inside state
   * and invoke passed onBlur/onFocus callbacks
   *
   * @param {boolean} focused
   * @param {*} args
   */
  handleFocusChange = (focused, ...args) => {
    const { onFocus, onBlur } = this.props
    const { props: { onFocus: childOnFocus, onBlur: childOnBlur } } = this.props.renderInput

    // Updated state when focus changes
    this.setState({ focused })

    // Invoke onFocus callback of MaskInput and/or children
    if (focused) {
      if (onFocus) onFocus(focused, ...args)
      if (childOnFocus) childOnFocus(...args)
    }

    // Invoke onBLur callback of MaskInput and/or children
    if (!focused) {
      if (onBlur) onBlur(focused, ...args)
      if (childOnBlur) childOnBlur(...args)
    }
  }

  focus = (...args) => {
    this.handleFocusChange(true, ...args)
  }

  blur = (...args) => {
    this.handleFocusChange(false, ...args)
  }

  /**
   * Update value inside state
   *
   * @param v
   * @param args
   */
  handleChange = (v, ...args) => {
    const { onChange, value, children } = this.props
    const input = React.Children.only(children)
    const { onChange: childOnChange } = input.props

    // Invoke MaskInpu onChange callback if is set
    if (onChange) {
      onChange(v, ...args)
    }

    // Invoke children onChange callback if is set
    if (childOnChange) {
      childOnChange(v, ...args)
    }

    // If no value is passed from props update it to match the value passed by children
    if (value === undefined) {
      this.setState({ value: v })
    }
  }
  /**
   * Generate input props with new event handlers
   *
   * @returns {{onBlur: void | any, onFocus: void | any, onChange: MaskedInput.handleChange}}
   */
  getInputProps () {
    const { children, id } = this.props
    const input = React.Children.only(children)

    const newProps = {
      id: id
      ...input.props,
      onBlur: this.blur,
      onFocus: this.focus,
      onChange: this.handleChange
    }

    return newProps
  }

  /**
   * Create element from function passed to renderMask prop and apply class
   *
   * @returns {object|null}
   */
  maskRenderer () {
    const { renderMask } = this.props
    const { value } = this.state

    // Only generate element if input is not focused and value inside state exists
    const element = renderMask(value)

    return React.cloneElement(element, {
      ...element.props,
      className: buildClassName([ moduleName, 'mask' ], element.props.className)
    })
  }

  render () {
    const { className, error, onBlur, onFocus, onChange, children, renderMask, id, ...passedProps } = this.props
    const { focused, value } = this.state
    const input = React.Children.only(children)

    const wrapperCls = buildClassName(moduleName, className)
    const inputProps = this.getInputProps()

    const mask = !focused && value ? this.maskRenderer() : null

    return (
      <div className={wrapperCls} {...passedProps}>
        {mask}
        {React.cloneElement(input, inputProps)}
      </div>
    )
  }
}

MaskedInput.propTypes = propTypes

MaskedInput.defaultProps = defaultProps

export default MaskedInput
