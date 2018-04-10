import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('combo-box')

/**
 * Dropdown menu component.
 *
 * @param {object} props
 * @param {*} [props.getItemProps]
 * @param {number} [props.highlightedIndex]
 * @param {*} [props.itemComponent]
 * @param {array} [props.items]
 * @param {boolean} [props.loading]
 * @param {string || number} [props.maxHeight]
 * @param {string} [props.overflow]
 * @param {boolean} [props.separated]
 * @param {*} [props.selectedItem]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
const AutocompleteMenu = props => {
  const {
    getItemProps, highlightedIndex, items, itemComponent: ItemComponent,
    loading, maxHeight, overflow, selectedItem, separated, style
  } = props

  const maxHeightStyle = {
    overflowY: 'auto',
    maxHeight,
    ...style
  }

  const wrapperClsNames = cls(`${moduleName}__options`, {
    [`${moduleName}__options--separated`]: separated
  })

  const generateClsNames = (item, index) => (
    cls(`${moduleName}__item`, {
      [`${moduleName}__item--highlighted`]: highlightedIndex === index,
      [`${moduleName}__item--selected`]: selectedItem === item,
      [`${moduleName}__item--overflow-truncate`]: overflow === 'truncate',
      [`${moduleName}__item--overflow-break`]: overflow === 'break'
    })
  )

  if (loading) {
    return (
      <div className={wrapperClsNames} style={maxHeight ? maxHeightStyle : style}>
        <div
          className={`${moduleName}__item`}
        >
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className={wrapperClsNames} style={maxHeight ? maxHeightStyle : style}>
      {items.map((item, index) => (
        <div
          {...getItemProps({ item })}
          key={ItemComponent ? index : item}
          className={generateClsNames(item, index)}
        >
          {ItemComponent ? <ItemComponent item={item} /> : item}
        </div>
      ))}
    </div>
  )
}

AutocompleteMenu.propTypes = {
  /** Returns the props applied to menu item */
  getItemProps: PropTypes.func,

  /** The currently highlighted item */
  highlightedIndex: PropTypes.number,

  /** Optional item component */
  itemComponent: PropTypes.func,

  /** Items array */
  items: PropTypes.array,

  /** Loading state */
  loading: PropTypes.bool,

  /** Maximum toggle menu height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Item text overflow type */
  overflow: PropTypes.oneOf(['truncate', 'break']),

  /** The currently selected item */
  selectedItem: PropTypes.any,

  /** Displays menu as separated element */
  separated: PropTypes.bool,

  /** The currently selected item */
  style: PropTypes.object
}

AutocompleteMenu.defaultProps = {
  items: [],
  separated: false,
  getItemProps: props => props
}

export default AutocompleteMenu
