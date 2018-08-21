import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

const propTypes = {
  /** Function to build toggle props with handlers */
  getToggleButtonProps: PropTypes.func.isRequired,

  /** Function to build clear button props with handlers */
  getClearButtonProps: PropTypes.func.isRequired,

  /** Function to build input props with handlers */
  getInputProps: PropTypes.func.isRequired,

  /** Function to render item value */
  renderValue: PropTypes.func.isRequired,

  /** Value provided to input */
  inputValue: PropTypes.string,

  /** Additional icon to put in the select box */
  icon: PropTypes.node,

  /** Is it multi-select? */
  multi: PropTypes.bool,

  /** Placeholder to show when there is no value */
  placeholder: PropTypes.string,

  /** Is menu open? */
  isOpen: PropTypes.bool,

  /** List of currently selected items */
  selectedItems: PropTypes.array
}

const defaultProps = {
  isOpen: false,
  selectedItems: []
}

/**
 * Value shown in single-select ComboBox.
 *
 * @property {object} props
 * @property {function} props.getToggleButtonProps
 * @property {function} props.getClearButtonProps
 * @property {function} props.getInputProps
 * @property {function} props.renderValue
 * @property {boolean} props.multi
 * @property {boolean} props.isOpen
 * @property {array} props.selectedItems
 * @property {string} [props.placeholder]
 * @property {*} [props.icon]
 *
 * @property {*} focusTimeout
 * @property {HTMLElement|null} [input]
 *
 * @class
 */
class ComboBoxValue extends React.PureComponent {
  /**
   * Cancel delayed focus on input,
   * when component is unmounted anyway.
   */
  componentWillUnmount () {
    this.cancelDelayedFocus()
  }

  /**
   * Save reference to input for further use.
   *
   * @param {HTMLElement} el
   */
  saveInputRef = (el) => {
    this.input = el
  }

  /**
   * Focus input if it is possible.
   */
  focus = () => {
    if (this.input) {
      this.input.focus()
    }
  }

  /**
   * Focus input if it is possible (on next tick).
   */
  delayedFocus = () => {
    this.focusTimeout = setTimeout(() => this.focus(), 1)
  }

  /**
   * Cancel delayed focus on input.
   */
  cancelDelayedFocus () {
    clearTimeout(this.focusTimeout)
  }

  /**
   * Build 'clear' button which can remove current selection.
   *
   * @returns {React.Element}
   */
  buildClearButton () {
    const { getClearButtonProps } = this.props

    // Build class name for 'clear' button
    const clearClsName = buildClassName([ 'combo-box', 'clear' ])

    // Build 'clear' button props,
    // including focus on input after clearing
    const clearProps = getClearButtonProps({
      role: 'button',
      className: clearClsName,
      onClick: this.delayedFocus
    })

    return (
      <span {...clearProps}><Icon name='clear' /></span>
    )
  }

  /**
   * Build arrow which determines a state of list.
   *
   * @returns {React.Element}
   */
  buildArrow () {
    const { isOpen } = this.props

    // Build class name for arrow element
    const arrowClsName = buildClassName([ 'combo-box', 'arrow' ])

    return (
      <span className={arrowClsName}>
        <Icon name={isOpen ? 'expand_less' : 'expand_more'} />
      </span>
    )
  }

  /**
   * Build controls on end of combo-box.
   * By default it is arrow which shows list state,
   * but it can be 'clear' button as well (when element is select).
   *
   * Additionally, there can be external icon passed.
   *
   * @returns {React.Element}
   */
  buildControls () {
    const { icon, selectedItems } = this.props

    // Get information about selection
    const isSelected = selectedItems.length > 0

    // Build class names for element
    const controlsClsName = buildClassName([ 'combo-box', 'controls' ])
    const iconClsName = buildClassName([ 'combo-box', 'icon' ])

    // Build element for external icom
    const iconElement = icon ? <div className={iconClsName}>{icon}</div> : null

    // Build main control which should be shown on end
    const mainControl = isSelected
      ? this.buildClearButton()
      : this.buildArrow()

    return (
      <div className={controlsClsName}>
        {iconElement}
        {mainControl}
      </div>
    )
  }

  /**
   * Build text input to provide data for combo-box.
   *
   * @returns {React.Element}
   */
  buildInput () {
    const { getInputProps, placeholder, inputValue } = this.props

    // Build props for input
    const inputProps = getInputProps({
      type: 'text',
      placeholder: placeholder,
      value: inputValue
    })

    return (
      <input ref={this.saveInputRef} {...inputProps} />
    )
  }

  /**
   * Render value box for single-select combo-box.
   *
   * @returns {React.Element}
   */
  render () {
    const { getToggleButtonProps, selectedItems, inputValue, renderValue } = this.props

    // Get information about selection
    const isSelected = selectedItems.length > 0

    // Get properties required by toggle button
    const passedProps = getToggleButtonProps({
      onFocus: this.focus,
      onClick: this.focus
    })

    // Build class names for elements
    const innerClsName = buildClassName([ 'combo-box', 'inner' ])
    const clsName = buildClassName([ 'combo-box', 'value' ], null, {
      placeholder: isSelected ? false : inputValue == null || inputValue === ''
    })

    // Build either input for new value or show current value
    const value = isSelected
      ? renderValue(selectedItems[0], this.props)
      : this.buildInput()

    // Render combo-box value container
    return (
      <button {...passedProps} className={clsName}>
        <div className={innerClsName}>
          {value}
        </div>
        {this.buildControls()}
      </button>
    )
  }
}

ComboBoxValue.displayName = 'ComboBoxValue'

ComboBoxValue.propTypes = propTypes
ComboBoxValue.defaultProps = defaultProps

export default ComboBoxValue
