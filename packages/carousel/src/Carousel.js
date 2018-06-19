import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

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
   * @returns Reac.Element
   */
  renderChildren = () => {
    const { children, perPage } = this.props

    const style = { minWidth: `${100 / perPage}%`, maxWidth: `${100 / perPage}%` }

    const elements = []

    for (let i = 0; i < Math.max(children.length, perPage) * 3; i++) {
      elements.push(
        <div className='one-slide' style={style} key={'copy-' + i}>{children[i % children.length]}</div>
      )
    }

    return (
      <div style={{display: 'flex', height: '100%'}}>
        {children.map((el, i) => {
          return (
            <div className='one-slide' style={style} key={i}>{el}</div>
          )
        })}
        {elements}
      </div>
    )
  }

  /**
  * Render wrapper for slides
  * @returns React.Element
  */
  renderWrapper = () => {
    const { perPage } = this.props
    const { transitionTime, currentSlide } = this.state

    return (
      <div ref={this.setRef} style={{transform: `translateX(-${currentSlide * 100 / perPage}%)`, transitionDuration: `${transitionTime}ms`}} className='children-wrapper'>
        {this.renderChildren()}
      </div>
    )
  }

  /**
   * Render dots
   * @returns {function}
   */
  renderDots = () => {
    const { renderDots, ...restProps } = this.props

    return renderDots({
      ...restProps,
      onChange: this.handlerDot
    })
  }

  render () {
    const { arrows, className, dots } = this.props

    return (
      <div className={buildClassName(moduleName, className)}>
        {this.renderWrapper()}
        {dots && this.renderDots()}
        {arrows && <div className={buildClassName([moduleName, 'arrows'])}>
          <div className={buildClassName([moduleName, 'arrows--prev'])} onClick={this.handlerPrev}><Icon name='chevron_left' /></div>
          <div className={buildClassName([moduleName, 'arrows--next'])} onClick={this.handlerNext}><Icon name='chevron_right' /></div>
        </div>}
      </div>
    )
  }
}

Carousel.propTypes = propTypes
Carousel.defaultProps = defaultProps

export default Carousel
