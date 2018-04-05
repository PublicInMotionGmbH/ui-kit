import React from 'react'
import PropTypes from 'prop-types'

import ComboBox from './ComboBox'
import AutocompleteInput from './AutocompleteInput'
import AutocompleteMenu from './AutocompleteMenu'

/**
 * Component which represents dropdown.
 *
 * @param {object} props
 * @param {string} [props.defaultSelectedItem]
 * @param {string} [props.items]
 * @param {boolean} [props.loading]
 * @param {string} [props.inputComponent]
 * @param {string} [props.maxHeight]
 * @param {string} [props.onChange]
 * @param {string} [props.overflow]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.separated]
 * @returns {React.Element}
 */
const Dropdown = props => {
  const {
    className, defaultSelectedItem, inputComponent, itemComponent,
    items, loading, maxHeight, onChange, overflow, placeholder,
    separated, ...passedProps
  } = props

  return (
    <ComboBox
      defaultSelectedItem={defaultSelectedItem}
      items={items}
      loading={loading}
      maxHeight={maxHeight}
      menuComponent={AutocompleteMenu}
      onChange={onChange}
      overflow={overflow}
      placeholder={placeholder}
      separated={separated}
      toggleComponent={AutocompleteInput}
      inputComponent={inputComponent}
      {...passedProps}
    />
  )
}

Dropdown.propTypes = {
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

  /** Additional onChange function */
  onChange: PropTypes.func,

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Displays input and menu components as separated elements */
  separated: PropTypes.bool
}

export default Dropdown
