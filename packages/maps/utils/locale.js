const DEFAULT_LANGUAGE = 'en'
const DEFAULT_LOCALE = 'en-US'
const LANGUAGE_TO_LOCALE = {
  'en': 'en-us',
  'de': 'de-de'
}

const getLanguage = function () {
  const doc = document && document.documentElement
  return (doc && doc.lang) || DEFAULT_LANGUAGE
}

const getLocale = function () {
  return LANGUAGE_TO_LOCALE[getLanguage()] || DEFAULT_LOCALE
}

const formatPrice = function (value) {
  return new Intl.NumberFormat(getLocale(), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

export {
  getLocale,
  getLanguage,
  formatPrice
}
