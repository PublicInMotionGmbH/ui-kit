import { allCountries } from 'country-telephone-data'

const countriesList = allCountries
  .filter(country => country.iso2 != null && country.name != null && country.dialCode != null)
  .map(country => ({
    code: country.iso2,
    name: country.name,
    prefix: `+${country.dialCode}`
  }))

export const sortedCountriesList = countriesList.slice().sort((a, b) => b.prefix.length - a.prefix.length)

export default countriesList
