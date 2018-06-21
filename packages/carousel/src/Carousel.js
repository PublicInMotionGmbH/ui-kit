import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import chunk from 'lodash/chunk'

import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

import Dots from './Dots'

const moduleName = 'carousel'

function reflow (node) {
  return node.offsetHeight
}

const propTypes = {
  /** Show arrows to navigate */
  arrows: PropTypes.bool,

  /** Children passed as slides */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Show dots to navigate */
  dots: PropTypes.bool,

  /** Slides animation duration */
  duration: PropTypes.number,

  /** Number of slides visible in one time */
  perPage: PropTypes.number,

  /** Function which render custom dots */
  renderDots: PropTypes.func
}

const defaultProps = {
  children: [],
  duration: 500,
  perPage: 1,
  renderDots: Dots
}

/**
 * Component which represents Carousel.
 *
 * @property {object} props
 * @property {boolean} [props.arrows]
 * @property {node} [props.children]
 * @property {string} [props.className]
 * @property {boolean} [props.dots]
 * @property {number} [props.duration]
 * @property {number} [props.perPage]
 * @property {function} [props.rednerDots]
 * @class {React.Element}
 */
class Carousel extends React.PureComponent {
  state = {
    currentSlide: 0,
    childrenLength: this.props.children.length + 1,
    transform: 0,
    transitionTime: this.props.duration
  }

  /**
   * Change immadiately to proper slide
   * @param {number} slide
   * @returns Promise
   */
  goImmediately (slide) {
    const { currentSlide } = this.state
    const { duration } = this.props

    if (slide === currentSlide) {
      return Promise.resolve()
    }

    return new Promise(resolve => {
      this.setState({
        currentSlide: slide,
        transitionTime: 0
      }, () => {
        reflow(this.wrapper)

        this.setState({
          transitionTime: duration
        }, resolve)
      })
    })
  }

  /**
   * Change to next or previous slide
   * @param {number} index
   * @param {string} type
   */
  async go (index, type = 'forward') {
    const { children, perPage } = this.props
    const { currentSlide } = this.state

    let length = children.length

    while (length < perPage) {
      length += children.length
    }

    while (index < 0) {
      index = length + index
    }

    let current = currentSlide % length
    let next = index % length

    if (type === 'forward') {
      next = next > current ? next : length + next
    } else {
      current = next > current ? length + current : current
    }

    await this.goImmediately(current)

    this.setState({ currentSlide: next })
  }

  /**
   * Handle click next
   */
  handlerNext = () => {
    const { perPage } = this.props
    const { currentSlide } = this.state

    this.go(currentSlide + perPage)
  }

  /**
   * Handle click prev
   */
  handlerPrev = () => {
    const { perPage } = this.props
    const { currentSlide } = this.state

    this.go(currentSlide - perPage, 'back')
  }

  /**
   * Handle change slide when click on proper dot
   */
  handlerDot = (i) => {
    const { perPage } = this.props

    this.setState({
      currentSlide: i * perPage
    })
  }

  /**
   * Set reference to node
   */
  setRef = node => {
    this.wrapper = findDOMNode(node)
  }

  /**
   * Render children
   * @returns {React.Element}
   */
  renderSlides () {
    const { children, perPage } = this.props

    const clsName = buildClassName([ moduleName, 'slide' ])
    const style = { minWidth: `${100 / perPage}%`, maxWidth: `${100 / perPage}%` }

    const copies = []

    for (let i = 0; i < Math.max(children.length) + 3 * perPage; i++) {
      copies.push(
        <div className={clsName} style={style} key={'copy-' + i}>
          {children[i % children.length]}
        </div>
      )
    }

    return children.map((el, i) => (
      <div className={clsName} style={style} key={i}>
        {el}
      </div>
    )).concat(copies)
  }

  /**
   * Render dots
   * @returns {React.Element}
   */
  renderDots () {
    const { renderDots, children, perPage, ...restProps } = this.props
    const { currentSlide } = this.state

    const slides = chunk(children, perPage)

    return renderDots({
      ...restProps,
      slides: slides,
      perPage: perPage,
      value: currentSlide % slides.length,
      onChange: this.handlerDot
    })
  }

  renderArrows () {
    const clsName = buildClassName([ moduleName, 'arrows' ])
    const prevArrowClsName = buildClassName([ moduleName, 'arrow' ], null, [ 'prev' ])
    const nextArrowClsName = buildClassName([ moduleName, 'arrow' ], null, [ 'next' ])

    return (
      <div className={clsName}>
        <button className={prevArrowClsName} onClick={this.handlerPrev}>
          <Icon name='chevron_left' />
        </button>
        <button className={nextArrowClsName} onClick={this.handlerNext}>
          <Icon name='chevron_right' />
        </button>
      </div>
    )
  }

  render () {
    const { arrows, className, dots, perPage } = this.props
    const { currentSlide, transitionTime } = this.state

    const clsName = buildClassName(moduleName, className)
    const contentClsName = buildClassName([ moduleName, 'content' ])
    const wrapperClsName = buildClassName([ moduleName, 'wrapper' ])
    const innerClsName = buildClassName([ moduleName, 'inner' ])

    const _dots = dots ? this.renderDots() : null
    const _arrows = arrows ? this.renderArrows() : null

    const wrapperProps = {
      ref: this.setRef,
      style: {
        transform: `translateX(-${currentSlide * 100 / perPage}%)`,
        transitionDuration: `${transitionTime}ms`
      }
    }

    return (
      <div className={clsName}>
        <div className={contentClsName}>
          {_arrows}

          <div className={wrapperClsName} {...wrapperProps}>
            <div className={innerClsName}>
              {this.renderSlides()}
            </div>
          </div>
        </div>

        {_dots}
      </div>
    )
  }
}

Carousel.propTypes = propTypes
Carousel.defaultProps = defaultProps

export default Carousel
