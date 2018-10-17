import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'

import { Button } from '@talixo/button'

import { buildClassName } from '@talixo/shared/'

// import Element from './Element'
import Navigation from './Navigation'

const moduleName = 'pagination'

const propTypes = {
  /** Active page */
  activePage: PropTypes.number,

  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Maximum number of displayed page buttons on each side of active page. */
  displayedLimit: PropTypes.number,

  /**  */
  ellipsisPlaceholder: PropTypes.string,

  /**  */
  hidePages: PropTypes.bool,

  /**  */
  hideButtons: PropTypes.bool,

  /**  */
  nextDisabled: PropTypes.bool,

  /** Next button label */
  nextLabel: PropTypes.node,

  /** Function passed to page buttons */
  onChange: PropTypes.func,

  /** The total number of pages */
  pageCount: PropTypes.number.isRequired,

  /**  */
  previousDisabled: PropTypes.bool,

  /** Previous button label */
  previousLabel: PropTypes.node
}

const defaultProps = {
  displayedLimit: 3,
  ellipsisPlaceholder: '...',
  nextLabel: 'Next',
  previousLabel: 'Previous'
}

class Pagination extends React.Component {
  state = {
    activePage: this.props.activePage || 1
  }

  /**
   * Handles changing page when user clicks bprev/next button
   *
   * @param {number} value
   */
  handleNext = (value) => {
    const minValue = 1
    const maxValue = this.props.pageCount
    const nextPage = this.state.activePage + value

    // Check if page exists
    if (nextPage > maxValue || nextPage < minValue) {
      return
    }

    if (this.props.step == null) {
      this.handlePageChange(nextPage)
    }

    if (this.props.onClickButton) {
      this.props.onClickButton(nextPage)
    }
  }

  /**
   * Changes current page.
   *
   * @param {number} page
   */
  handlePageChange = (page) => {
    this.setState({ activePage: page })
  }

  /**
   * Generates proper object for each element of pagination.
   *
   * @param {array} elements
   * @returns {object[]}
   */
  prepareElements = (elements) => {
    const { ellipsisPlaceholder } = this.props
    const { activePage } = this.state

    return elements.map((page, index) => ({
      id: page === ellipsisPlaceholder ? `${page}--${index}` : page,
      label: page,
      active: page === activePage,
      disabled: page === ellipsisPlaceholder,
      onClick: this.handlePageChange
    }))
  }

  /**
   * Generates elements of pagination
   *
   * @returns {object[]}
   */
  buildPages () {
    const { displayedLimit: siblingsCount, ellipsisPlaceholder, pageCount } = this.props
    const { activePage } = this.state

    // Current element + always visible sideelements + siblings from each side.
    const maxVisibleElements = 1 + 4 + 2 * siblingsCount

    // If ellipsis is not needed, show all pages.
    if (pageCount <= maxVisibleElements) {
      const elements = range(1, pageCount + 1)
      return this.prepareElements(elements)
    }

    // Calculate min and max value number for middle page group.
    const minMiddleNumber = 2 + siblingsCount + 1
    const maxMiddleNumber = pageCount - 2 - siblingsCount

    // Get current middle number.
    const currentMiddle = Math.max(minMiddleNumber, Math.min(activePage, maxMiddleNumber))

    // Check which ellipsis will be needed.
    const leftEllipsis = currentMiddle - siblingsCount - 1 > 2
    const rightEllipsis = pageCount - 2 > currentMiddle + siblingsCount

    // Get left group elements.
    const leftElements = leftEllipsis
      ? [1, ellipsisPlaceholder]
      : [1, 2]

    // Get right group elements.
    const rightElements = rightEllipsis
      ? [ellipsisPlaceholder, pageCount]
      : [pageCount - 1, pageCount]

    // Get middle group elements.
    const middleElements = range(currentMiddle - siblingsCount, currentMiddle + siblingsCount + 1)

    return this.prepareElements([...leftElements, ...middleElements, ...rightElements])
  }

  render () {
    const {
      activePage: propsPage, className, displayedLimit, ellipsisPlaceholder, hidePages, hideButtons,
      nextDisabled, nextLabel, onChange, pageCount, previousDisabled, previousLabel, ...restProps
    } = this.props
    const { activePage } = this.state
    const pageElements = !hidePages ? this.buildPages() : []
    const wrapperCls = buildClassName(moduleName, className)

    // Handle buttons disable state.
    const prevButtonDisabled = previousDisabled || activePage === 1
    const nextButtonDisabled = nextDisabled || activePage === pageCount

    return (
      <div className={wrapperCls} {...restProps}>
        {
          !hideButtons &&
          <Button disabled={prevButtonDisabled} type='primary' onClick={() => this.handleNext(-1)}>
            { previousLabel }
          </Button>
        }
        <Navigation elements={pageElements} type='pagination' />
        {
          !hideButtons &&
          <Button disabled={nextButtonDisabled} type='primary' onClick={() => this.handleNext(1)}>
            { nextLabel }
          </Button>
        }
      </div>
    )
  }
}

Pagination.propTypes = propTypes

Pagination.defaultProps = defaultProps

export default Pagination
