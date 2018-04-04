import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

import { prefix } from '@talixo/shared'

const moduleName = prefix('item-address')

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
  return (
    <div className={cls(moduleName, className)} style={style}>
      <i className={`material-icons ${moduleName}__icon`}>
        {item.icon}
      </i>
      <span className={`${moduleName}__place`}>{item.place}</span>
      <span className={`${moduleName}__address`}>{item.address}</span>
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
