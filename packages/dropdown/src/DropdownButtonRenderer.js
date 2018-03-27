import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

import DropdownButton from './DropdownButton'
import DropdownMenu from './DropdownMenu'

import { prefix } from '@talixo/commons'

const name = prefix('dropdown')

/**
 * Dropdown renderer.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.closeMenu]
 * @param {*} [props.menuComponent]
 * @param {*} [props.defaultSelectedItem]
 * @param {*} [props.getToggleButtonProps]
 * @param {*} [props.getItemProps]
 * @param {*} [props.getRootProps]
 * @param {string || number} [props.maxHeight]
 * @param {string} [props.overflow]
 * @param {number} [props.highlightedIndex]
 * @param {*} [props.innerRef]
 * @param {string || object} [props.inputValue]
 * @param {boolean} [props.isOpen]
 * @param {*} [props.itemComponent]
 * @param {array} [props.items]
 * @param {*} [props.openMenu]
 * @param {string} [props.placeholder]
 * @param {*} [props.selectedItem]
 * @param {string} [props.style]
 * @returns {React.Element}
 */
const DropdownButtonRenderer = props => {
  const {
    className, closeMenu, menuComponent: MenuComponent,
    defaultSelectedItem, getToggleButtonProps, getItemProps,
    overflow, highlightedIndex, isOpen, innerRef, itemComponent,
    items, maxHeight, placeholder, selectedItem, style
  } = props
  return (
    <div className={cls(`${name}-wrapper`, className)} ref={innerRef} style={style}>
      <DropdownButton
        onOuterClick={() => closeMenu()}
        firstItem={defaultSelectedItem || (items && items.length && items[0]) || ''}
        getToggleButtonProps={getToggleButtonProps}
        isOpen={isOpen}
        itemComponent={itemComponent}
        overflow={overflow}
        placeholder={placeholder}
        value={selectedItem}
      />
      {isOpen ? (
        <MenuComponent
          itemComponent={itemComponent}
          items={items}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          maxHeight={maxHeight}
          overflow={overflow}
          selectedItem={selectedItem}
        />
      ) : null}
    </div>
  )
}

DropdownButtonRenderer.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Closes the menu */
  closeMenu: PropTypes.func,

  /** Toggle menu component */
  menuComponent: PropTypes.func,

  /** Item or an array of items that should be selected by default */
  defaultSelectedItem: PropTypes.any,

  /** Returns the props applied to menu button */
  getToggleButtonProps: PropTypes.func,

  /** Returns the props applied to menu item */
  getItemProps: PropTypes.func,

  /** Returns the props applied to root element */
  getRootProps: PropTypes.func,

  /** Maximum toggle menu height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** The currently highlighted item */
  highlightedIndex: PropTypes.number,

  /** Reference key to composite component */
  innerRef: PropTypes.func,

  /** The current value of the getInputProps input */
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /** Controls whether the menu should be open */
  isOpen: PropTypes.bool,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Items array */
  items: PropTypes.array,

  /** Opens menu */
  openMenu: PropTypes.func,

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** The currently selected item */
  selectedItem: PropTypes.any,

  /** Style object */
  style: PropTypes.object
}

DropdownButtonRenderer.defaultProps = {
  menuComponent: DropdownMenu
}

export default DropdownButtonRenderer
