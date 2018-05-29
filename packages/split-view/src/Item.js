import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'
import { displayObject } from './utils'

const propTypes = {
  /** Function used to render data item. */
  itemRender: PropTypes.func,

  /** Object which contains data to be displayed. */
  item: PropTypes.object.isRequired,

  /** onClick callback function. */
  onClick: PropTypes.func
}
const defaultProps = {
  active: false,
  itemRender: item => displayObject(item)
}

/**
 * Component which renders data item inside list using given renderItem function.
 *
 * @param props
 * @param {bool} [props.active]
 * @param {object} props.item
 * @param {function} [props.itemRender]
 * @param {function} [props.onClick]
 *
 * @returns {React.Element}
 */
const Item = (props) => {
  const { active, item, itemRender, onClick } = props
  const itemCls = buildClassName([moduleName, 'list', 'item'], null, { active })

  // Invoke props.onCLick function if provided
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
