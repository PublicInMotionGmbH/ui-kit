import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'

import { prefix } from '@talixo/commons'

const name = prefix('item-address')

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
    <div className={cls(name, className)} style={style}>
      <i className={`material-icons ${name}-icon`}>
        {item.icon}
      </i>
      <span className={`${name}-place`}>{item.place}</span>
      <span className={`${name}-address`}>{item.address}</span>
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
