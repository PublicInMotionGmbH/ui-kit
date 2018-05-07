import countriesList from './countriesList'

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

  return countriesList.find(x => phoneNumber.indexOf(x.prefix) === 0)
}

export default detectCountry
