import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

import TextInput from '@talixo/text-input'
import { prefix } from '@talixo/shared'

const moduleName = prefix('combo-box')

/**
 * Dropdown button component.
 *
 * @param {object} props
getInputProps* @param {string} [props.className]
 * @param {string} [props.firstItem]
 * @param {string} [props.getInputProps]
 * @param {string} [props.id]
 * @param {string} [props.inputComponent]
 * @param {string} [props.isOpen]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.separated]
 * @param {string} [props.value]
 * @returns {React.Element}
 */
const AutocompleteInput = props => {
  const {
    className, getInputProps, id, inputComponent: InputComponent,
    isOpen, placeholder, separated, style
  } = props

  const inputClsName = cls(className, `${moduleName}__input`, {
    [`${moduleName}--open`]: isOpen,
    [`${moduleName}__input--separated`]: isOpen && separated
  })

  const inputStyle = { ...style, width: '100%' }

  return (
    <InputComponent
      {...getInputProps({
        className: inputClsName,
        id: id,
        placeholder: placeholder,
        style: inputStyle
      })}
    />
  )
}

AutocompleteInput.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Returns the props applied to menu button */
  getInputProps: PropTypes.func,

  /** Additional id */
  id: PropTypes.string,

  /** Input component */
  inputComponent: PropTypes.func,

  /** Controls whether the menu should be open */
  isOpen: PropTypes.bool,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Displays input as separated element */
  separated: PropTypes.bool,

  /** Style object */
  style: PropTypes.object
}

AutocompleteInput.defaultProps = {
  inputComponent: TextInput,
  getInputProps: props => props
}

export default AutocompleteInput
