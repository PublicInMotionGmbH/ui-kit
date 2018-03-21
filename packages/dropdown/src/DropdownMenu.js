import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

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
    selectedItem
  } = props
  return (
    <div className={`${name}-options`} style={maxHeight && { maxHeight: maxHeight, overflowY: 'auto' }}>
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
  getItemProps: PropTypes.func,
  highlightedIndex: PropTypes.number,
  itemComponent: PropTypes.func,
  items: PropTypes.array,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overflow: PropTypes.oneOf(['truncate', 'break']),
  selectedItem: PropTypes.any
}

DropdownMenu.defaultProps = {
  items: [],
  getItemProps: props => props
}

export default DropdownMenu
