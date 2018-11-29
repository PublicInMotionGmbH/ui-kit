import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

import defaultIconsMap from './defaultIconsMap'

export const moduleName = 'address'

const contextTypes = {
  addressTypesIconMap: PropTypes.objectOf(PropTypes.string)
}

const propTypes = {
  /** Address of a place. */
  address: PropTypes.string,

  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Place details. */
  details: PropTypes.string,

  /** Format details. */
  formatDetails: PropTypes.func,

  /** Address type to determine icon displayed next to the address. */
  type: PropTypes.string,

  /** Place name abbreviation. It can be e.g. IATA code of an airport. */
  short: PropTypes.string
}

const defaultProps = {
  formatDetails: x => x
}

/**
 * This is a component which represents a place Address.
 *
 * @param {object} props
 * @param {string} [props.address]
 * @param {string} [props.className]
 * @param {string} [props.details]
 * @param {function} [props.formatDetails]
 * @param {string} [props.type]
 * @param {string} [props.short]
 *
 * @returns {React.Element}
 */
function Address (props, context) {
  const { address, className, details, formatDetails, type, meta, short, ...passedProps } = props
  const { addressTypesIconMap } = context || {}

  // Get classNames
  const shortCls = buildClassName([ moduleName, 'short' ])
  const detailsCls = buildClassName([ moduleName, 'details' ])
  const iconCls = buildClassName([ moduleName, 'icon' ])
  const wrapperCls = buildClassName(moduleName, className)

  // Get Icon element
  const iconType = addressTypesIconMap
    ? addressTypesIconMap[type] || addressTypesIconMap.default || defaultIconsMap.default
    : defaultIconsMap[type] || defaultIconsMap.default

  const iconElement = <Icon name={iconType} />
  const detailsElement = formatDetails(details)
  const abbreviationElement = short == null ? null : <span className={shortCls}>{short.toUpperCase()}</span>

  return (
    <div className={wrapperCls} {...passedProps}>
      <span className={iconCls}>{iconElement}</span>
      {abbreviationElement}
      <span className={detailsCls}>
        <strong>{address}</strong>
        <span>{detailsElement}</span>
      </span>
    </div>
  )
}

Address.contextTypes = contextTypes
Address.propTypes = propTypes
Address.defaultProps = defaultProps

export default Address
