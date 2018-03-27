import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('select')

/**
 * Dropdown menu component.
 *
 * @param {object} props
 * @param {*} [props.getItemProps]
 * @param {number} [props.highlightedIndex]
 * @param {*} [props.itemComponent]
 * @param {array} [props.items]
 * @param {string || number} [props.maxHeight]
 * @param {string} [props.overflow]
 * @param {*} [props.selectedItem]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
const DropdownMenu = props => {
  const {
    getItemProps, highlightedIndex, items,
    itemComponent: ItemComponent, maxHeight,
    overflow, selectedItem, style
  } = props
  let maxHeightStyle = { maxHeight: maxHeight, overflowY: 'auto', ...style }
  return (
    <div className={`${name}-options`} style={maxHeight ? maxHeightStyle : style}>
      {items.map((item, index) => (
        <div
          {...getItemProps({ item: item })}
          key={ItemComponent ? index : item}
          className={cls(`${name}-item`, {
            [`${name}-item-highlighted`]: highlightedIndex === index,
            [`${name}-item-selected`]: selectedItem === item,
            [`${name}-item-overflow-truncate`]: overflow === 'truncate',
            [`${name}-item-overflow-break`]: overflow === 'break'
          })}
        >
          {ItemComponent ? <ItemComponent item={item} /> : item}
        </div>
      ))}
    </div>
  )
}

DropdownMenu.propTypes = {
  /** Returns the props applied to menu item */
  getItemProps: PropTypes.func,

  /** The currently highlighted item */
  highlightedIndex: PropTypes.number,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Items array */
  items: PropTypes.array,

  /** Maximum toggle menu height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** The currently selected item */
  selectedItem: PropTypes.any,

  /** The currently selected item */
  style: PropTypes.object
}

DropdownMenu.defaultProps = {
  items: [],
  getItemProps: props => props
}

export default DropdownMenu
