import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'

const propTypes = {
  className: PropTypes.string,
  itemRender: PropTypes.func,
  item: PropTypes.object,
  onClick: PropTypes.func
}
const defaultProps = {
  itemRender: item => JSON.stringify(item)
}

const Item = (props) => {
  const { active, item, itemRender, onClick } = props
  const itemCls = buildClassName([moduleName, 'list', 'item'], null, { active })

  const onItemClick = () => {
    if (onClick) {
      onClick(item)
    }
  }

  return (
    <div className={itemCls} onClick={onItemClick}>
      { itemRender(item) }
    </div>
  )
}

Item.propTypes = propTypes

Item.defaultProps = defaultProps

export default Item
