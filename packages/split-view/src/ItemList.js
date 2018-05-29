import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Item from './Item'

import { moduleName } from './config'

const propTypes = {

  /** Additional class name */
  className: PropTypes.string,

  /** Function used to render data item. */
  itemRender: PropTypes.func,

  /** Array of objects which contain data to be displayed. */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** onClick callback function. */
  onClick: PropTypes.func,

  /** Index of currently opened item. */
  openIndex: PropTypes.number
}

/**
 * Component which renders data items list.
 *
 * @param props
 * @param {string} [props.className]
 * @param {function} [props.itemRender]
 * @param {object[]} props.items
 * @param {function} [props.onClick]
 * @param {number} [props.openIndex]
 *
 * @returns {React.Element}
 */
function ItemList (props) {
  const { className, itemRender, items, onClick, openIndex } = props
  const wrapperCls = buildClassName([moduleName, 'list'], className)

  return (
    <div className={wrapperCls}>
      {
        items.map((item, index) => (
          <Item
            key={index}
            active={openIndex === index}
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
