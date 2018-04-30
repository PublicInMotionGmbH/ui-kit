import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Tag from './Tag'

/**
 * Component which represents list of value tags for multi-select elements
 *
 * @param {object} props
 * @param {function} props.buildItemId
 * @param {array} props.selectedItems
 *
 * @returns {React.Element}
 */
function TagsList (props) {
  const { buildItemId, selectedItems, style } = props

  // Build class name for wrapper
  const clsName = buildClassName([ 'combo-box', 'tags' ])

  // Build elements for all selected items inside
  const elements = selectedItems.map((item, index) => (
    <Tag
      key={buildItemId(item, index)}
      {...props}
      item={item}
      index={index}
    />
  ))

  return (
    <div style={style} className={clsName}>
      {elements}
    </div>
  )
}

TagsList.propTypes = {
  /** Additional styles for wrapper */
  style: PropTypes.object,

  /** Function to build item ID - used for 'key' properties */
  buildItemId: PropTypes.func.isRequired,

  /** List of currently selected items */
  selectedItems: PropTypes.array,

  /** Function to build 'remove' button props with handlers */
  getRemoveButtonProps: PropTypes.func.isRequired,

  /** Function to render item value */
  renderValue: PropTypes.func.isRequired
}

TagsList.defaultProps = {
  selectedItems: []
}

export default TagsList
