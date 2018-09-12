import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { generatePrice } from './formatters'

const moduleName = 'price'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Currency of a price. */
  currency: PropTypes.string,

  /** Mapping which provides will be used to convert currency to provided symbol. */
  currencyToSymbol: PropTypes.object,

  /** Should the currency be displayed before price? */
  displayBefore: PropTypes.bool,

  /** Locale code of user. */
  locale: PropTypes.string,

  /** Price precision. */
  precision: PropTypes.number,

  /** Prefix whoich will be displayed before the price. Can be to e.g. indicate that price is aproximate. */
  prefix: PropTypes.node,

  /** Given price. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const defaultProps = {
  displayBefore: false,
  precision: 2
}

/**
 * Component which represents Price.
 *
 * @param {object} props
 * @param {*} [props.approximateLabel]
 * @param {string} [props.className]
 * @param {string} [props.currency]
 * @param {object} [props.currencyToSymbol]
 * @param {boolean} [props.displayBefore]
 * @param {string} [props.locale]
 * @param {number} [props.precision]
 * @param {string|number} [props.value]
 * @returns {React.Element}
 */
function Price (props) {
  const {
    className, currency, currencyToSymbol, decimal,
    displayBefore, locale, prefix, precision, value, ...passedProps
  } = props
  const wrapperCls = buildClassName(moduleName, className)
  const prefixElem = prefix ? <small>{prefix}</small> : null

  // Get formatted price and symbol if needed.
  const price = generatePrice(value, {
    locale, currency, currencyToSymbol, precision
  })

  // Generate price element
  const priceElement = <span>
    {displayBefore && price.symbol}
    {price.value}
    {!displayBefore && price.symbol}
  </span>

  return (
    <span className={wrapperCls} {...passedProps}>
      {prefixElem}
      {priceElement}
    </span>
  )
}

Price.displayName = 'Price'

Price.propTypes = propTypes
Price.defaultProps = defaultProps

export default Price
