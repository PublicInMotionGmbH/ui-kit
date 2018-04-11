import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName, prefix } from '@talixo/shared'

/**
 * Component which represents dropdown.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {object} [props.item]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
const ItemAddress = props => {
  const { item, className, style } = props

  const clsName = buildClassName('item-address', className)
  const iconClsName = buildClassName([ 'item-address', 'icon' ], 'material-icons')

  return (
    <div className={clsName} style={style}>
      <i className={iconClsName}>
        {item.icon}
      </i>
      <span className={prefix('item-address', 'place')}>{item.place}</span>
      <span className={prefix('item-address', 'address')}>{item.address}</span>
    </div>
  )
}

ItemAddress.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Displayed item */
  item: PropTypes.object,

  /** Style object */
  style: PropTypes.object
}

ItemAddress.defaultProps = {}

export default ItemAddress
