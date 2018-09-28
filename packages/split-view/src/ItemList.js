import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Item from './Item'

import { moduleName } from './config'

const propTypes = {

  /** Additional class name. */
  className: PropTypes.string,

  /** Function used to render data item. */
  renderItems: PropTypes.func,

  /** Array of objects which contain data to be displayed. */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** onClick callback function. */
  onClick: PropTypes.func,

  /** Currently opened item. */
  openedItem: PropTypes.object
}

/**
 * Component which renders data items list.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {function} [props.renderItems]
 * @param {object[]} props.items
 * @param {function} [props.onClick]
 * @param {number} [props.value]
 *
 * @returns {React.Element}
 */
function ItemList (props) {
  const { className, renderItems, items, onClick, value } = props
  const wrapperCls = buildClassName([moduleName, 'list'], className)

  return (
    <div className={wrapperCls}>
      {
        items.map((item, index) => (
          <Item
            key={index}
            active={value === item}
            item={item}
            renderItems={renderItems}
            onClick={onClick}
          />
        ))
      }
    </div>
  )
}

ItemList.displayName = 'ItemList'

ItemList.propTypes = propTypes

export default ItemList
