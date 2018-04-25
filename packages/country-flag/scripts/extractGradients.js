/**
 * As svg-sprite library has still problem with extracting gradients,
 * on its GitHub @Laruxo has wrote transformation for that
 * and @func0der has fixed it a little.
 *
 * I have adjusted their code for readability.
 *
 * Remember: using this code you can't generate SVG twice, second one will have definitions duplicated.
 *
 * @see https://github.com/jkphl/svg-sprite/issues/74
 */

const DOMParser = require('xmldom').DOMParser

// Initialize counter for gradients ID
let count = 0

// Initialize definitions tree
const defs = new DOMParser().parseFromString('<defs></defs>')

/**
 * Escape regex characters in given string.
 *
 * @param {string} str
 * @return {string}
 */
function escape (str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

/**
 * Build regular expression for string.
 *
 * @param {string} str
 * @param {string} [flags]
 * @returns {RegExp}
 */
function buildStringRegex (str, flags) {
  return new RegExp(escape(str), flags)
}

/**
 * Updates urls in given SVG from array of [oldId, newId].
 *
 * @param {string} svg
 * @param {Array<{ 0: string, 1: string }>|object[]|array[]} idsToReplace
 * @return {string}
 */
function updateUrls (svg, idsToReplace) {
  for (let i = 0; i < idsToReplace.length; i++) {
    const [ prev, next ] = idsToReplace[i]

    const input = `url(#${prev})`
    const output = `url(#${next})`

    svg = svg.replace(buildStringRegex(input, 'g'), output)
  }

  return svg
}

/**
 * Extracts specific gradient defined by tag from given shape.
 *
 * @param {SVGShape} shape
 * @param {string} tag
 * @return {Array}
 */
function extractGradients (shape, tag) {
  const idsToReplace = []

  const gradients = shape.dom.getElementsByTagName(tag)

  while (gradients.length > 0) {
    // Add gradient to defs block
    defs.documentElement.appendChild(gradients[0])

    // Give gradient new ID
    const id = gradients[0].getAttribute('id')
    const newId = 'g' + (++count)
    gradients[0].setAttribute('id', newId)

    idsToReplace.push([ id, newId ])
  }

  return idsToReplace
}

/**
 * Extracts gradient from the sprite and replaces their ids to prevent duplicates.
 *
 * @param {SVGShape} shape
 * @param {SVGSpriter} spriter
 * @param {Function} callback
 */
function gradientsExtraction (shape, spriter, callback) {
  const idsToReplace = [].concat(
    extractGradients(shape, 'linearGradient'),
    extractGradients(shape, 'radialGradient')
  )

  shape.setSVG(updateUrls(shape.getSVG(), idsToReplace))

  callback(null)
}

/**
  * Adds defs tag at the top of svg with all extracted gradients.
  * @param {string} svg
  * @return {string} svg
  */
function extractDefinitionsOnTop (svg) {
  return svg.replace(
    '<symbol ',
    defs.firstChild.toString() + '<symbol '
  )
}

exports.shape = gradientsExtraction
exports.svg = extractDefinitionsOnTop
