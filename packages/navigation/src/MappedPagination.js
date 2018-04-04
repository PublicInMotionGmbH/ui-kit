import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Element from './Element'

/**
* Returns the largest multiple of divisor less than or equal to provided number
*
* @param {number} number
* @param {number} divisor
* @returns {number}
*/
const nearestMultiple = (number, divisor) => Math.floor(number / divisor) * divisor

/**
 * Method that maps numbers to elements.
 *
 * @param {number} numbers
 * @returns {array}
 */
const renderedNumbers = (numbers, activePage, onChange) => {
  return numbers.map(page => (
    <Element
      key={page}
      active={activePage === page + 1}
      onClick={() => onChange(page + 1)}
      type='pagination'
    >
      {page + 1}
    </Element>
  ))
}

/**
 * Method that returns margin numbers.
 *
 * @param {string} prefix
 * @param {number} page
 * @returns {array}
 */
const renderedMargin = (prefix, page, onChange) => {
  let marginItems = [(
    <Element
      key={`${prefix}-ellispis`}
      type='pagination'
      disabled
    >
      ...
    </Element>
  )]

  const pages = (
    <Element
      key={prefix}
      onClick={() => onChange(page)}
      type='pagination'
    >
      {page}
    </Element>
  )

  if (prefix === 'first') marginItems.unshift(pages)
  if (prefix === 'last') marginItems.push(pages)

  return marginItems
}

/**
 * Component which represents MappedPagination.
 *
 * @param {object} props
 * @param {number} [props.activePage]
 * @param {number} [props.displayedLimit]
 * @param {*} [props.nextLabel]
 * @param {function} [props.onChange]
 * @param {number} [props.pageCount]
 * @param {*} [props.previousLabel]
 * @returns {React.Element}
 */
function MappedPagination (props) {
  const { activePage, displayedLimit, nextLabel, onChange,
    pageCount, previousLabel } = props

  const change = delta => onChange(activePage + delta)

  /**
   * Method that returns object with passed props.
   *
   * @param {array} children
   * @param {number} i
   * @returns {object}
   */
  const createPagination = () => {
    let items = []

    // If the number of pages exceeds the limit return true
    const isLong = pageCount > displayedLimit

    // If the active number is larger than the displayedLimit
    // set the range start to be the nearest multiple of the limit
    const start = activePage > displayedLimit
      ? nearestMultiple(activePage - 1, displayedLimit)
      : null

    // Set the range end to be larger from start by the displayedLimit
    // unless it is larger than number of pages
    const end = start + displayedLimit > pageCount
      ? pageCount
      : start + displayedLimit

    // Create an array of numbers to be displayed
    const pageArray = _.range(start, end)

    // Add previous button
    items.push(
      <Element
        key='previous'
        onClick={() => { if (activePage > 1) change(-1) }}
        type='pagination'
      >
        {previousLabel}
      </Element>
    )

    // Add margin number buttons if needed
    if (isLong && !_.includes(pageArray, 1)) {
      items.push(...renderedMargin('first', 1, onChange))
    }

    // Add page buttons
    items.push(...renderedNumbers(pageArray, activePage, onChange))

    // Add margin numbers buttons if needed
    if (isLong && !_.includes(pageArray, pageCount - 1)) {
      items.push(...renderedMargin('last', pageCount, onChange))
    }

    // Add next button
    items.push(
      <Element
        key='next'
        onClick={() => { if (activePage < pageCount) change(1) }}
        type='pagination'
      >
        {nextLabel}
      </Element>
    )

    return items
  }

  return createPagination()
}

MappedPagination.propTypes = {
  /** Active page */
  activePage: PropTypes.number,

  /** Maximum number of displayed page buttons */
  displayedLimit: PropTypes.number,

  /** Next button label */
  nextLabel: PropTypes.node,

  /** Function passed to page buttons */
  onChange: PropTypes.func,

  /** The total number of pages */
  pageCount: PropTypes.number.isRequired,

  /** Previous button label */
  previousLabel: PropTypes.node
}

MappedPagination.defaultProps = {
  activePage: 1,
  displayedLimit: 10,
  nextLabel: 'Next',
  previousLabel: 'Previous'
}

export default MappedPagination
