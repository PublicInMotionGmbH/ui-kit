import React from 'react'
import PropTypes from 'prop-types'

import ComboBox from './ComboBox'
import AutocompleteInput from './AutocompleteInput'
import AutocompleteMenu from './AutocompleteMenu'

/**
 * Component which represents dropdown.
 *
 * @param {object} props
 * @param {string} [props.defaultHighlightedIndex]
 * @param {string} [props.defaultSelectedItem]
 * @param {string} [props.items]
 * @param {boolean} [props.loading]
 * @param {string} [props.inputComponent]
 * @param {string} [props.maxHeight]
 * @param {string} [props.menuComponent]
 * @param {string} [props.onChange]
 * @param {string} [props.onInputValueChange]
 * @param {string} [props.overflow]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.separated]
 * @returns {React.Element}
 */
const Autocomplete = props => {
  const {
    className, defaultHighlightedIndex, defaultSelectedItem, inputComponent,
    itemComponent, items, loading, maxHeight, menuComponent, onChange,
    onInputValueChange, overflow, placeholder, separated, ...passedProps
  } = props

  return (
    <ComboBox
      defaultHighlightedIndex={defaultHighlightedIndex}
      defaultSelectedItem={defaultSelectedItem}
      items={items}
      loading={loading}
      maxHeight={maxHeight}
      menuComponent={menuComponent}
      onChange={onChange}
      onInputValueChange={onInputValueChange}
      overflow={overflow}
      placeholder={placeholder}
      separated={separated}
      toggleComponent={AutocompleteInput}
      inputComponent={inputComponent}
      {...passedProps}
    />
  )
}

Autocomplete.propTypes = {
  /** Initial index to highlight when the menu first opens */
  defaultHighlightedIndex: PropTypes.number,

  /** Default selected Item */
  defaultSelectedItem: PropTypes.node,

  /** Items array */
  items: PropTypes.array,

  /** Loading state */
  loading: PropTypes.bool,

  /** Input component */
  inputComponent: PropTypes.func,

  /** Maximum toggle menu height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Toggle menu component */
  menuComponent: PropTypes.func,

  /** Additional onChange function */
  onChange: PropTypes.func,

  /** Called whenever the input value changes */
  onInputValueChange: PropTypes.func,

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Displays input and menu components as separated elements */
  separated: PropTypes.bool
}

Autocomplete.defaultProps = {
  defaultHighlightedIndex: 0,
  menuComponent: AutocompleteMenu
}

export default Autocomplete
