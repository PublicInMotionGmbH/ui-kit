import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('select')

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
    getItemProps, highlightedIndex, items,
    itemComponent: ItemComponent, maxHeight,
    overflow, selectedItem, style
  } = props

  const maxHeightStyle = {
    overflowY: 'auto',
    maxHeight,
    ...style
  }

  const clsName = (item, index) => (
    cls(`${moduleName}__item`, {
      [`${moduleName}__item--highlighted`]: highlightedIndex === index,
      [`${moduleName}__item--selected`]: selectedItem === item,
      [`${moduleName}__item--overflow-truncate`]: overflow === 'truncate',
      [`${moduleName}__item--overflow-break`]: overflow === 'break'
    })
  )

  return (
    <div className={`${moduleName}__options`} style={maxHeight ? maxHeightStyle : style}>
      {items.map((item, index) => (
        <div
          {...getItemProps({ item: item })}
          key={ItemComponent ? index : item}
          className={clsName(item, index)}
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
