import { sortedCountriesList } from './countriesList'

/**
 * Detect country by phone number.
 *
 * @param {string} phoneNumber
 * @returns {object|null}
 */
function detectCountry (phoneNumber) {
  if (!phoneNumber) {
    return null
  }

  phoneNumber = ('' + phoneNumber).replace(/[^0-9+]+/g, '')

  return sortedCountriesList.find(x => phoneNumber.indexOf(x.prefix) === 0)
}

export default detectCountry
