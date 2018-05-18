import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

const propTypes = {
  /** Item to show */
  item: PropTypes.any.isRequired,

  /** Index of this item in options list */
  index: PropTypes.number.isRequired,

  /** Function to build item props with handlers */
  getItemProps: PropTypes.func.isRequired,

  /** Function to render item value */
  renderItem: PropTypes.func.isRequired,

  /** Index of currently highlighted item */
  highlightedIndex: PropTypes.number,

  /** List of currently selected items */
  selectedItems: PropTypes.array
}

const defaultProps = {
  selectedItems: []
}

/**
 * Component which represents item in expandable menu.
 *
 * @param {object} props
 * @param {*} props.item
 * @param {number} props.index
 * @param {function} props.getItemProps
 * @param {function} props.renderItem
 * @param {array} props.selectedItems
 * @param {number} [props.highlightedIndex]
 *
 * @returns {React.Element}
 */
function MenuItem (props) {
  const { item, index, getItemProps, highlightedIndex, selectedItems, renderItem } = props

  // Build required props for item
  const passedProps = getItemProps({ item, index })

  // Build class name for menu item component
  const clsName = buildClassName([ 'combo-box', 'item' ], null, {
    highlighted: highlightedIndex === index,
    selected: selectedItems.indexOf(item) !== -1
  })

  // Build additional class names
  const tickClsName = buildClassName([ 'combo-box', 'item', 'tick' ])
  const innerClsName = buildClassName([ 'combo-box', 'item', 'inner' ])

  return (
    <div {...passedProps} className={clsName}>
      <div className={tickClsName}>
        <Icon name='check' />
      </div>
      <div className={innerClsName}>
        {renderItem(item, props)}
      </div>
    </div>
  )
}

MenuItem.propTypes = propTypes
MenuItem.defaultProps = defaultProps

export default MenuItem
