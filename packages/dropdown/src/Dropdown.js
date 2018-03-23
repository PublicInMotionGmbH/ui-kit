import React from 'react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'

import DropdownButtonRenderer from './DropdownButtonRenderer'
import DropdownMenu from './DropdownMenu'

const itemToStringOrObject = i => (i == null ? '' : typeof i === 'object' ? i : String(i))

/**
 * Component which represents dropdown.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.defaultSelectedItem]
 * @param {string} [props.itemComponent]
 * @param {string} [props.items]
 * @param {string} [props.maxHeight]
 * @param {string} [props.menuComponent]
 * @param {string} [props.onChange]
 * @param {string} [props.overflow]
 * @param {string} [props.placeholder]
 * @param {string} [props.style]
 * @param {string} [props.toggleComponent]
 * @returns {React.Element}
 */
const Dropdown = props => {
  const {
    className, menuComponent, defaultSelectedItem,
    itemComponent, items, maxHeight, onChange, overflow,
    placeholder, style, toggleComponent: ToggleComponent
  } = props
  return (
    <Downshift
      onChange={onChange}
      defaultSelectedItem={defaultSelectedItem}
      itemToString={itemToStringOrObject}
      render={({
        closeMenu,
        getToggleButtonProps,
        getItemProps,
        getRootProps,
        inputValue,
        isOpen,
        openMenu,
        selectedItem,
        highlightedIndex
      }) => (
        <ToggleComponent
          {...getRootProps({
            refKey: 'innerRef',
            className: className,
            closeMenu: closeMenu,
            menuComponent: menuComponent,
            defaultSelectedItem: defaultSelectedItem,
            getToggleButtonProps: getToggleButtonProps,
            getItemProps: getItemProps,
            getRootProps: getRootProps,
            maxHeight: maxHeight,
            overflow: overflow,
            highlightedIndex: highlightedIndex,
            isOpen: isOpen,
            inputValue: inputValue,
            itemComponent: itemComponent,
            items: items,
            openMenu: openMenu,
            placeholder: placeholder,
            selectedItem: selectedItem,
            style: style
          })}
        />
      )}
    />
  )
}

Dropdown.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Default selected Item */
  defaultSelectedItem: PropTypes.node,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Items array */
  items: PropTypes.array,

  /** Maximum toggle menu height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Toggle menu component */
  menuComponent: PropTypes.func,

  /** Additional onChange function */
  onChange: PropTypes.func,

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Style object */
  style: PropTypes.object,

  /** Toggle component */
  toggleComponent: PropTypes.func
}

Dropdown.defaultProps = {
  menuComponent: DropdownMenu,
  toggleComponent: DropdownButtonRenderer
}

export default Dropdown
