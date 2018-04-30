import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import MenuItem from './MenuItem'

/**
 * Component which represents expandable menu used in this package.
 *
 * @param {object} props
 * @param {array} props.options
 * @param {function} props.buildItemId
 *
 * @returns {React.Element}
 */
function Menu (props) {
  const { buildItemId, options } = props

  // Build class name for menu component
  const clsName = buildClassName([ 'combo-box', 'menu' ])

  // Build elements for all possible options
  const elements = options.map((item, index) => (
    <MenuItem
      key={buildItemId(item, index)}
      {...props}
      item={item}
      index={index}
    />
  ))

  return (
    <div className={clsName}>
      {elements}
    </div>
  )
}

Menu.propTypes = {
  /** Function to build item ID - used for 'key' properties */
  buildItemId: PropTypes.func.isRequired,

  /** List of options to show */
  options: PropTypes.array,

  /** Function to build item props with handlers */
  getItemProps: PropTypes.func.isRequired,

  /** Function to render item value */
  renderItem: PropTypes.func.isRequired,

  /** Index of currently highlighted item */
  highlightedIndex: PropTypes.number,

  /** List of currently selected items */
  selectedItems: PropTypes.array
}

Menu.defaultProps = {
  options: []
}

export default Menu
