import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'
import { displayObject } from './utils'

const propTypes = {
  className: PropTypes.string,
  itemRender: PropTypes.func,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func
}
const defaultProps = {
  active: false,
  itemRender: item => displayObject(item)
}

const Item = (props) => {
  const { active, item, itemRender, onClick } = props
  const itemCls = buildClassName([moduleName, 'list', 'item'], null, { active })

  const onItemClick = (e) => {
    if (onClick) {
      onClick(item, e)
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
