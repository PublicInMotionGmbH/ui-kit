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

  /** This placeholder is displayed if provided value is not a number (isNaN returns true). */
  errorPlaceholder: PropTypes.node,

  /** Locale code of user. */
  locale: PropTypes.string,

  /** Price precision. */
  precision: PropTypes.number,

  /** Prefix which will be displayed before the price. Can be to e.g. indicate that price is approximate. */
  prefix: PropTypes.node,

  /** Given price. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const defaultProps = {
  displayBefore: false,
  errorPlaceholder: '-',
  precision: 2
}

/**
 * Component which represents Price.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.currency]
 * @param {object} [props.currencyToSymbol]
 * @param {boolean} [props.displayBefore]
 * @param {*} [props.errorPlaceholder]
 * @param {string} [props.locale]
 * @param {number} [props.precision]
 * @param {*} [props.prefix]
 * @param {string|number} [props.value]
 *
 * @returns {React.Element}
 */
function Price (props) {
  const {
    className, currency, currencyToSymbol, errorPlaceholder,
    displayBefore, locale, prefix, precision, value, ...passedProps
  } = props

  const wrapperCls = buildClassName(moduleName, className)
  const prefixElement = prefix ? <small>{prefix}</small> : null

  // Get formatted price and symbol if needed.
  const price = generatePrice(value, {
    locale, currency, currencyToSymbol, precision
  })

  const shouldDisplayBefore = 'displayBefore' in price ? price.displayBefore : displayBefore

  const symbol = price.symbol ? <abbr title={currency || price.symbol}>{price.symbol}</abbr> : null
  const symbolBefore = shouldDisplayBefore ? symbol : null
  const symbolAfter = shouldDisplayBefore ? null : symbol

  // Generate price element
  const priceElement = price.error
    ? <React.Fragment>{errorPlaceholder}</React.Fragment>
    : <React.Fragment>
      {symbolBefore} {price.value} {symbolAfter}
    </React.Fragment>

  return (
    <span className={wrapperCls} {...passedProps}>
      {prefixElement}
      {priceElement}
    </span>
  )
}

Price.displayName = 'Price'

Price.propTypes = propTypes
Price.defaultProps = defaultProps

export default Price
