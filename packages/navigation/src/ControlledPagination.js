import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import includes from 'lodash/includes'

import Element from './Element'
import calculateNearestMultiple from '../utils/calculateNearestMultiple'

const propTypes = {
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

const defaultProps = {
  activePage: 1,
  displayedLimit: 10,
  nextLabel: 'Next',
  previousLabel: 'Previous'
}

/**
 * Method that maps numbers to elements.
 *
 * @param {number[]} numbers
 * @param {number} activePage
 * @param {function} onChange
 * @param {object} passedProps
 * @returns {React.Element[]}
 */
const renderedNumbers = (numbers, activePage, onChange, passedProps) => {
  return numbers.map(page => (
    <Element
      key={page}
      page={page}
      active={activePage === page + 1}
      onClick={() => onChange(page + 1)}
      {...passedProps}
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
 * @param {function} onChange
 * @param {object} passedProps
 * @returns {React.Element[]}
 */
const renderedMargin = (prefix, page, onChange, passedProps) => {
  let marginItems = [(
    <Element
      key={`${prefix}-ellispis`}
      disabled
      {...passedProps}
    >
      ...
    </Element>
  )]

  const pages = (
    <Element
      key={prefix}
      onClick={() => onChange(page)}
      {...passedProps}
    >
      {page}
    </Element>
  )

  if (prefix === 'first') marginItems.unshift(pages)
  if (prefix === 'last') marginItems.push(pages)

  return marginItems
}

/**
 * Component which represents Pagination.
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
function Pagination (props) {
  const { activePage, displayedLimit, nextLabel, onChange,
    pageCount, previousLabel, ...passedProps } = props

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
      ? calculateNearestMultiple(activePage - 1, displayedLimit)
      : null

    // Set the range end to be larger from start by the displayedLimit
    // unless it is larger than number of pages
    const end = start + displayedLimit > pageCount
      ? pageCount
      : start + displayedLimit

    // Create an array of numbers to be displayed
    const pageArray = range(start, end)

    // Add previous button
    items.push(
      <Element
        key='previous'
        onClick={() => { if (activePage > 1) change(-1) }}
        {...passedProps}
      >
        {previousLabel}
      </Element>
    )

    // Add margin number buttons if needed
    if (isLong && !includes(pageArray, 1)) {
      items.push(...renderedMargin('first', 1, onChange, passedProps))
    }

    // Add page buttons
    items.push(...renderedNumbers(pageArray, activePage, onChange, passedProps))

    // Add margin numbers buttons if needed
    if (isLong && !includes(pageArray, pageCount - 1)) {
      items.push(...renderedMargin('last', pageCount, onChange, passedProps))
    }

    // Add next button
    items.push(
      <Element
        key='next'
        onClick={() => { if (activePage < pageCount) change(1) }}
        {...passedProps}
      >
        {nextLabel}
      </Element>
    )

    return items
  }

  return createPagination()
}

Pagination.displayName = 'Pagination'

Pagination.propTypes = propTypes

Pagination.defaultProps = defaultProps

export default Pagination
