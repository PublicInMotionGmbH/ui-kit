import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Item from './Item'

import { moduleName } from './config'

const propTypes = {

  /** Additional class name. */
  className: PropTypes.string,

  /** Function used to render data item. */
  itemRender: PropTypes.func,

  /** Array of objects which contain data to be displayed. */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** onClick callback function. */
  onClick: PropTypes.func,

  /** Currently opened item. */
  openItem: PropTypes.object
}

/**
 * Component which renders data items list.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {function} [props.itemRender]
 * @param {object[]} props.items
 * @param {function} [props.onClick]
 * @param {number} [props.openItem]
 *
 * @returns {React.Element}
 */
function ItemList (props) {
  const { className, itemRender, items, onClick, openItem } = props
  const wrapperCls = buildClassName([moduleName, 'list'], className)

  return (
    <div className={wrapperCls}>
      {
        items.map((item, index) => (
          <Item
            key={index}
            active={openItem === item}
            item={item}
            itemRender={itemRender}
            onClick={onClick}
          />
        ))
      }
    </div>
  )
}

ItemList.propTypes = propTypes

export default ItemList
