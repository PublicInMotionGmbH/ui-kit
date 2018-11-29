/**
 * Converts given value to float value with fixed precision.
 *
 * @param {string|number} value
 * @param {number} precision
 * @returns {string}
 */
export function valueToFixedPrecision (value, precision = 2) {
  return parseFloat(value).toFixed(precision)
}

/**
 * It tries to format number using JS Intl and returns formatted number.
 *
 * @param {string|number} value
 * @param {string} locale
 * @param {number} precision
 * @returns {string}
 */
export function formatNumber (value, locale, precision) {
  try {
    const price = new Intl.NumberFormat(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision }).format(value)
    return price
  } catch (e) { return value }
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
export function generatePrice (value, config = {}) {
  const { currency, currencyToSymbol, locale, precision } = config

  value = valueToFixedPrecision(value, precision)

  if (isNaN(value)) {
    return {
      value: value,
      symbol: currency,
      error: true
    }
  }

  // If user provides own mapping, use it.
  if (currencyToSymbol) {
    const symbol = currencyToSymbol[currency] || currency
    const price = formatNumber(value, locale, precision)

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

      // Try to extract symbol and value
      const matchedValue = formattedValue.match(/^(.*?)((?:[0-9.,-]|\s)+)(.*)$/)

      if (matchedValue) {
        const symbolBefore = matchedValue[1].trim()
        const value = matchedValue[2].trim()
        const symbolAfter = matchedValue[3].trim()

        if (value && (symbolAfter || symbolBefore)) {
          return {
            value: value,
            symbol: symbolAfter || symbolBefore,
            displayBefore: !!symbolBefore
          }
        }
      }

      return { value: formattedValue, symbol: null }
    } catch (e) {
      // Fallback if js Intl is not supported by a browser
      const price = formatNumber(value, locale, precision)
      return { value: price, symbol: currency }
    }
  } else {
    const price = formatNumber(value, locale, precision)
    return { value: price, symbol: currency }
  }
}
