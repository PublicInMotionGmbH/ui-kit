import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

export const moduleName = 'address'

const defaultProvider = {
  bar: 'local_bar',
  cafe: 'local_cafe',
  car_wash: 'local_car_wash',
  food: 'local_dining',
  restaurant: 'local_dining',
  drink: 'local_drink',
  gas_station: 'local_gas_station',
  hotel: 'local_hotel',
  hospital: 'local_hospital',
  store: 'local_grocery_store',
  activity: 'local_play',
  airport: 'local_airport',
  parking: 'local_parking',
  central_train_station: 'train',
  poi_train_station: 'train',
  transit_station: 'train',
  subway_station: 'train',
  train_station: 'train',
  light_rail_station: 'train',
  bus_station: 'directions_bus',
  taxi_stand: 'local_taxi',
  atm: 'local_atm',
  pharmacy: 'local_pharmacy',
  default: 'location_on'
}

const propTypes = {

  /** Address of a place. */
  address: PropTypes.string,

  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Place details. */
  details: PropTypes.string,

  /** Format details. */
  detailsFormatter: PropTypes.func,

  /** Icon displayed next to the address. */
  icon: PropTypes.string,

  /** You can provide here your custom mapping of Icon component names. Remember to add fallback icon under `default` key. */
  iconProvider: PropTypes.object,

  /** Place name abbreviation. It can be e.g. IATA code of an airport. */
  short: PropTypes.string
}

const defaultProps = {
  detailsFormatter: (x) => (x),
  iconProvider: defaultProvider
}

/**
 * This is a component which represents a place Address.
 *
 * @param props
 * @param {string} [props.abbreviation]
 * @param {string} [props.address]
 * @param {string} [props.className]
 * @param {string} [props.details]
 * @param {string} [props.type]
 *
 * @returns {React.Element}
 */
function Address (props) {
  const { address, className, details, detailsFormatter, icon, iconProvider, meta, short, ...passedProps } = props

  // Get classNames
  const shortCls = buildClassName([moduleName, 'short'])
  const detailsCls = buildClassName([moduleName, 'details'])
  const iconCls = buildClassName([moduleName, 'icon'])
  const wrapperCls = buildClassName(moduleName, className)

  // Get Icon element
  const iconType = iconProvider[icon] || iconProvider.default
  const iconElement = <Icon name={iconType} />
  const detailsElement = detailsFormatter(details)
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

Address.propTypes = propTypes
Address.defaultProps = defaultProps

export default Address
