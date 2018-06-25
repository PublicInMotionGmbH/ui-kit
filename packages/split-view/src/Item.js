import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'
import { displayObject } from './utils'

const propTypes = {
  /** Function used to render data item. */
  renderItems: PropTypes.func,

  /** Object which contains data to be displayed. */
  item: PropTypes.object.isRequired,

  /** onClick callback function. */
  onClick: PropTypes.func
}
const defaultProps = {
  active: false,
  renderItems: item => displayObject(item)
}

/**
 * Component which renders data item inside list using given renderItem function.
 *
 * @param {object} props
 * @param {bool} [props.active]
 * @param {object} props.item
 * @param {function} [props.renderItems]
 * @param {function} [props.onClick]
 *
 * @returns {React.Element}
 */
function Item (props) {
  const { active, item, renderItems, onClick } = props
  const itemCls = buildClassName([moduleName, 'list-item'], null, { active })

  // Invoke props.onCLick function if provided
  const onItemClick = (e) => {
    if (onClick) {
      onClick(item, e)
    }
  }

  return (
    <div className={itemCls} onClick={onItemClick}>
      { renderItems(item) }
    </div>
  )
}

Item.propTypes = propTypes

Item.defaultProps = defaultProps

export default Item
