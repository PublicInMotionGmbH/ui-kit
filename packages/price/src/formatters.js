/**
 * Converts given value to float value with fixed precision.
 *
 * @param {string|number} value
 * @param {number} precision
 * @returns {string}
 */
export function valueToFixedPrecision (value, precision = 2) {
  return Number.parseFloat(value).toFixed(precision)
}

/**
 * It tries to format number using JS Intl and returns formatted number.
 *
 * @param {string|number} value
 * @param {string} locale
 * @param {number} precision
 * @returns {string}
 */
function fomatNumber (value, locale, precision) {
  let price
  try {
    price = new Intl.NumberFormat(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision }).format(value)
  } catch (e) { price = value }
  return price
}

/**
 * Formats price according to provided mapping or locale and currency
 *
 * @param {string|number} value
 * @param {object} config
 * @param {string} [config.currency]
 * @param {object} [config.currencyToSymbol]
 * @param {number} [config.precision]
 * @param {string} [config.locale]
 * @returns {object}
 */
export function generatePrice (value, config) {
  const { currency, currencyToSymbol, locale, precision } = config

  value = valueToFixedPrecision(value, precision)

  // If user provides own mapping, use it.
  if (currencyToSymbol) {
    const symbol = currencyToSymbol[currency] || currency
    const price = fomatNumber(value, locale, precision)

    return { value: price, symbol }
  } else if (locale && currency) {
    // If user provides locale and currency, try to format it according to provided information using JS Intl
    try {
      const formattedValue = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      }).format(value)

      return { value: formattedValue, symbol: null }
    } catch (e) {
      // Fallback if js Intl is not supported by a browser
      const price = fomatNumber(value, locale, precision)
      return {value: price, symbol: currency}
    }
  } else {
    const price = fomatNumber(value, locale, precision)
    return { value: price, symbol: currency }
  }
}
