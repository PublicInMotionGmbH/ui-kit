import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

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

  const wrapperClsNames = buildClassName([ 'combo-box', 'options' ], null, { separated })
  const loadingClsName = buildClassName([ 'combo-box', 'item' ])

  const generateClsNames = (item, index) => (
    buildClassName([ 'combo-box', 'item' ], null, {
      highlighted: highlightedIndex === index,
      selected: selectedItem === item,
      'overflow-truncate': overflow === 'truncate',
      'overflow-break': overflow === 'break'
    })
  )

  if (loading) {
    return (
      <div className={wrapperClsNames} style={maxHeight ? maxHeightStyle : style}>
        <div
          className={loadingClsName}
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
