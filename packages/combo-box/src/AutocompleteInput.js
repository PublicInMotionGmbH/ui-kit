import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@talixo/text-input'
import { buildClassName, applyAnyClassNameModifiers } from '@talixo/shared'

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

  // We've got modifier here of the combo-box directly, but probably it should be `input` modifier
  const openClsName = applyAnyClassNameModifiers('combo-box', { open: isOpen })

  // Build class name for `input`
  const inputClsName = buildClassName(
    [ 'combo-box', 'input' ],
    [ className, openClsName ],
    { separated: isOpen && separated }
  )

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
