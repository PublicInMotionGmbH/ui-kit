const DEFAULT_MASK = [
  '+', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
  /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
  /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
]

const masks = {}

/**
 * Build input mask for selected country
 *
 * @param {object|{ prefix: string }} country
 * @returns {Array<string|RegExp>}
 */
function buildMaskForCountry (country) {
  if (!country || !country.prefix) {
    return DEFAULT_MASK
  }

  const length = country.prefix.length

  if (!masks[length]) {
    const mask = [ '+' ]

    for (let i = 1; i < length; i++) {
      mask.push(/\d/)
    }

    mask.push(' ')

    for (let j = 0; j < 15; j++) {
      mask.push(/\d/)
    }

    masks[length] = mask
  }

  return masks[length]
}

export default buildMaskForCountry
