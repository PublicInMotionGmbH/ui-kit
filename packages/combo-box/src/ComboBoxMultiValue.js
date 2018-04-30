import React from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from 'react-input-autosize'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

import TagsList from './TagsList'

/**
 * Value shown in multi-select ComboBox.
 *
 * @property {object} props
 * @property {function} props.getToggleButtonProps
 * @property {function} props.getInputProps
 * @property {function} props.renderValue
 * @property {boolean} props.multi
 * @property {boolean} props.isOpen
 * @property {array} props.selectedItems
 * @property {string} [props.placeholder]
 * @property {*} [props.icon]
 *
 * @property {object} state
 * @property {number} state.inputKey  key required for forcing styles in auto-growing input
 *
 * @property {HTMLElement|null} [input]
 *
 * @class
 */
class ComboBoxMultiValue extends React.PureComponent {
  state = {
    inputKey: 0
  }

  /**
   * Force updating styles in auto-growing input
   * after page is loaded.
   */
  componentDidMount () {
    // When component is mounted but styles are still not loaded,
    // It may occur that your input has wrong size
    window.addEventListener('load', this.forceUpdatingStyles)
    window.addEventListener('resize', this.forceUpdatingStyles)
  }

  /**
   * Tear down styles (and listeners) for auto-growing input.
   */
  componentWillUnmount () {
    window.removeEventListener('load', this.forceUpdatingStyles)
    window.removeEventListener('resize', this.forceUpdatingStyles)
  }

  /**
   * Force updating styles of auto-growing input.
   */
  forceUpdatingStyles = () => {
    // Do not force refreshing input when it's not in DOM yet
    if (!this.input) {
      return
    }

    // Change input key to re-render it
    this.setState({
      inputKey: this.state.inputKey + 1
    })
  }

  /**
   * Save reference to input for further use.
   *
   * @param {HTMLElement} el
   */
  saveInputRef (el) {
    this.input = el
  }

  /**
   * Focus input if it is possible.
   */
  focus () {
    if (this.input) {
      this.input.focus()
    }
  }

  /**
   * Build controls on end of combo-box.
   * It is arrow which shows list state.
   *
   * Additionally, there can be external icon passed.
   *
   * @returns {React.Element}
   */
  buildControls () {
    const { icon, isOpen } = this.props

    // Build class names for elements
    const iconClsName = buildClassName([ 'combo-box', 'icon' ])
    const arrowClsName = buildClassName([ 'combo-box', 'arrow' ])
    const controlsClsName = buildClassName([ 'combo-box', 'controls' ])

    // Build icon
    const iconElement = icon ? <div className={iconClsName}>{icon}</div> : null
    const arrow = <Icon name={isOpen ? 'expand_less' : 'expand_more'} />

    // Select main control
    const mainControl = <span className={arrowClsName}>{arrow}</span>

    // Build controls
    return (
      <div className={controlsClsName}>
        {iconElement}
        {mainControl}
      </div>
    )
  }

  /**
   * Build auto-growing text input to provide data for combo-box.
   *
   * @returns {React.Element}
   */
  buildInput () {
    const { getInputProps, placeholder, inputValue, selectedItems } = this.props

    // Get information about selection
    const isSelected = selectedItems.length > 0

    // Build props for input
    const inputProps = getInputProps({
      key: this.state.inputKey,
      type: 'text',
      placeholder: isSelected ? null : placeholder,
      value: inputValue
    })

    // Build auto sizing input
    return (
      <AutosizeInput
        ref={this.saveInputRef.bind(this)}
        {...inputProps}
      />
    )
  }

  /**
   * Render value box for multi-select ComboBox.
   *
   * @returns {React.Element}
   */
  render () {
    const { getToggleButtonProps, inputValue, selectedItems } = this.props

    // Get information about selection
    const isSelected = selectedItems.length > 0

    // Get properties required by toggle button
    const passedProps = getToggleButtonProps({
      onFocus: this.focus.bind(this),
      onClick: this.focus.bind(this)
    })

    // Build class names for elements
    const innerClsName = buildClassName([ 'combo-box', 'inner' ])
    const clsName = buildClassName([ 'combo-box', 'value' ], null, {
      placeholder: isSelected ? false : inputValue == null || inputValue === ''
    })

    // Build current value
    const value = isSelected ? <TagsList {...this.props} /> : null

    // Build input for providing new data
    const input = this.buildInput()

    // Render combo-box value container
    return (
      <button {...passedProps} className={clsName}>
        <div className={innerClsName}>
          {value}
          {input}
        </div>
        {this.buildControls()}
      </button>
    )
  }
}

ComboBoxMultiValue.propTypes = {
  /** Function to build toggle props with handlers */
  getToggleButtonProps: PropTypes.func.isRequired,

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

ComboBoxMultiValue.defaultProps = {
  isOpen: false,
  selectedItems: []
}

export default ComboBoxMultiValue
