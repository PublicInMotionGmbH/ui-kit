/**
 * Replace country prefix in phone number.
 *
 * @param {string} phoneNumber
 * @param {object|{ prefix: string }|null} [previousCountry]
 * @param {object|{ prefix: string }|null} [nextCountry]
 * @returns {string}
 */
function replaceCountryPrefix (phoneNumber, previousCountry, nextCountry) {
  if (!nextCountry) {
    return phoneNumber
  }

  if (!phoneNumber) {
    return nextCountry.prefix + ' '
  }

  if (!previousCountry) {
    return phoneNumber.indexOf(nextCountry.prefix) === 0 ? phoneNumber : `${nextCountry.prefix}${phoneNumber}`
  }

  return phoneNumber.replace(previousCountry.prefix, nextCountry.prefix)
}

export default replaceCountryPrefix
