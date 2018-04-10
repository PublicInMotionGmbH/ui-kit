import React from 'react'
import PropTypes from 'prop-types'

import ComboBox from './ComboBox'
import DropdownButton from './DropdownButton'
import Menu from './Menu'

/**
 * Component which represents dropdown.
 *
 * @param {object} props
 * @param {string} [props.defaultSelectedItem]
 * @param {string} [props.itemComponent]
 * @param {string} [props.items]
 * @param {string} [props.maxHeight]
 * @param {string} [props.onChange]
 * @param {string} [props.overflow]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.separated]
 * @returns {React.Element}
 */
const Dropdown = props => {
  const {
    className, defaultSelectedItem, itemComponent, items,
    maxHeight, onChange, overflow, placeholder, separated, ...passedProps
  } = props

  return (
    <ComboBox
      defaultSelectedItem={defaultSelectedItem}
      itemComponent={itemComponent}
      items={items}
      maxHeight={maxHeight}
      menuComponent={Menu}
      onChange={onChange}
      overflow={overflow}
      placeholder={placeholder}
      separated={separated}
      toggleComponent={DropdownButton}
      {...passedProps}
    />
  )
}

Dropdown.propTypes = {
  /** Default selected Item */
  defaultSelectedItem: PropTypes.node,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Items array */
  items: PropTypes.array,

  /** Maximum toggle menu height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Additional onChange function */
  onChange: PropTypes.func,

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Displays button and menu components as separated elements */
  separated: PropTypes.bool
}

export default Dropdown
