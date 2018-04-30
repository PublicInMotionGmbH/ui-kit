import { allCountries } from 'country-telephone-data'

const countriesList = allCountries
  .filter(country => country.iso2 != null && country.name != null && country.dialCode != null)
  .map(country => ({
    code: country.iso2,
    name: country.name,
    prefix: `+${country.dialCode}`
  }))

export default countriesList

export function detectCountry (phoneNumber) {
  if (!phoneNumber) {
    return null
  }

  return countriesList.find(x => phoneNumber.indexOf(x.prefix) === 0)
}

export function replaceCountry (phoneNumber, previousCountry, nextCountry) {
  if (!nextCountry) {
    return phoneNumber
  }

  if (!phoneNumber) {
    return nextCountry ? nextCountry.prefix + ' ' : ''
  }

  if (!previousCountry) {
    return phoneNumber.indexOf(nextCountry.prefix) === 0 ? phoneNumber : `${nextCountry.prefix}${phoneNumber}`
  }

  return phoneNumber.replace(previousCountry.prefix, nextCountry.prefix)
}
