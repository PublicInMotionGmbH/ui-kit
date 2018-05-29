import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Item from './Item'

import { moduleName } from './config'

const propTypes = {
  className: PropTypes.string,
  itemRender: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}
const defaultProps = {
}

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

ItemList.defaultProps = defaultProps

export default ItemList
