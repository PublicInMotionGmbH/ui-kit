import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const name = prefix('select')

/**
 * Dropdown menu component.
 *
 * @param {object} props
 * @param {string} [props.getItemProps]
 * @param {string} [props.highlightedIndex]
 * @param {string} [props.itemComponent]
 * @param {string} [props.items]
 * @param {string} [props.maxHeight]
 * @param {string} [props.overflow]
 * @param {string} [props.selectedItem]
 * @param {string} [props.style]
 * @returns {React.Element}
 */

const DropdownMenu = props => {
  const {
    getItemProps,
    highlightedIndex,
    items,
    itemComponent: ItemComponent,
    maxHeight,
    overflow,
    selectedItem,
    style
  } = props
  let maxHeightStyle = { maxHeight: maxHeight, overflowY: 'auto', ...style }
  return (
    <div className={`${name}__options`} style={maxHeight ? maxHeightStyle : style}>
      {items.map((item, index) => (
        <div
          {...getItemProps({ item: item })}
          key={ItemComponent ? index : item}
          className={cls(`${name}__item`, {
            [`${name}__item--highlighted`]: highlightedIndex === index,
            [`${name}__item--selected`]: selectedItem === item,
            [`${name}__item--overflow-truncate`]: overflow === 'truncate',
            [`${name}__item--overflow-break`]: overflow === 'break'
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
