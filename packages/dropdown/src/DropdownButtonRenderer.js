import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

import DropdownButton from './DropdownButton'

import { prefix } from '@talixo/commons'

const name = prefix('dropdown')

/**
 * Dropdown renderer.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.closeMenu]
 * @param {string} [props.menuComponent]
 * @param {string} [props.defaultSelectedItem]
 * @param {string} [props.getButtonProps]
 * @param {string} [props.getItemProps]
 * @param {string} [props.getRootProps]
 * @param {string} [props.maxHeight]
 * @param {string} [props.overflow]
 * @param {string} [props.highlightedIndex]
 * @param {string} [props.innerRef]
 * @param {string} [props.inputValue]
 * @param {string} [props.isOpen]
 * @param {string} [props.itemComponent]
 * @param {string} [props.items]
 * @param {string} [props.openMenu]
 * @param {string} [props.placeholder]
 * @param {string} [props.selectedItem]
 * @param {string} [props.style]
 * @returns {React.Element}
 */

const DropdownButtonRenderer = props => {
  const {
    className,
    closeMenu,
    menuComponent: MenuComponent,
    defaultSelectedItem,
    getButtonProps,
    getItemProps,
    overflow,
    highlightedIndex,
    isOpen,
    innerRef,
    itemComponent,
    items,
    maxHeight,
    placeholder,
    selectedItem,
    style
  } = props
  return (
    <div className={cls(`${name}-wrapper`, className)} ref={innerRef} style={style}>
      <DropdownButton
        onOuterClick={() => closeMenu()}
        firstItem={defaultSelectedItem || (items && items.length && items[0]) || ''}
        getButtonProps={getButtonProps}
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
  className: PropTypes.string,
  closeMenu: PropTypes.func,
  menuComponent: PropTypes.func,
  defaultSelectedItem: PropTypes.any,
  getButtonProps: PropTypes.func,
  getItemProps: PropTypes.func,
  getRootProps: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overflow: PropTypes.oneOf(['truncate', 'break']),
  highlightedIndex: PropTypes.number,
  innerRef: PropTypes.func,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpen: PropTypes.bool,
  itemComponent: PropTypes.func,
  items: PropTypes.array,
  openMenu: PropTypes.func,
  placeholder: PropTypes.string,
  selectedItem: PropTypes.any,
  style: PropTypes.object
}

DropdownButtonRenderer.defaultProps = {}

export default DropdownButtonRenderer
