import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import chunk from 'lodash/chunk'

import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

import Dots from './Dots'

const moduleName = 'carousel'

/**
 * Get offset height of DOM node, to immediately apply CSS style changes.
 *
 * @param {HTMLElement} node
 * @returns {number}
 */
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

  /** Slides animation time */
  animationTime: PropTypes.number,

  /** Number of slides visible in one time */
  perPage: PropTypes.number,

  /** Function which render custom dots */
  renderDots: PropTypes.func,

  /** Index of current slide element */
  value: PropTypes.number,

  /** Event handler for active slide change */
  onChange: PropTypes.func,

  /** Default behavior for changing slide (for controlled component) */
  defaultMovement: PropTypes.oneOf([ 'exact', 'forward', 'back' ])
}

const defaultProps = {
  children: [],
  animationTime: 500,
  perPage: 1,
  renderDots: Dots,
  defaultMovement: 'exact'
}

/**
 * Component which represents Carousel.
 *
 * @property {object} props
 * @property {boolean} [props.arrows]
 * @property {node} [props.children]
 * @property {string} [props.className]
 * @property {boolean} [props.dots]
 * @property {number} [props.animationTime]
 * @property {number} [props.perPage]
 * @property {function} [props.renderDots]
 * @class {React.Element}
 */
class Carousel extends React.PureComponent {
  state = {
    slides: chunk(this.props.children, this.props.perPage),
    currentSlide: this.props.value != null
      ? this.props.value % this.props.children.length
      : 0,
    transitionTime: this.props.animationTime
  }

  componentWillReceiveProps (props) {
    // Handle change of animation time
    if (props.animationTime !== this.props.animationTime) {
      this.setState({
        transitionTime: props.animationTime
      })
    }

    // Update value if it's controlled & changed
    if (props.value != null && this.props.value !== props.value) {
      const slide = props.value % props.children.length

      const type = this.lastMovementIndex === slide
        ? this.lastMovementType
        : this.props.defaultMovement

      this.change(slide, type, true)
    }

    // Update current slide, if it's bigger than maximum slide
    const currentSlide = this.state.currentSlide % this.props.children.length

    if (currentSlide >= props.children.length) {
      this.setState({
        currentSlide: props.children.length - 1
      })
    }

    if (props.children !== this.props.children || props.perPage !== this.props.perPage) {
      this.setState({
        slides: chunk(props.children, props.perPage)
      })
    }
  }

  /**
   * Change immadiately to proper slide
   * @param {number} slide
   * @returns Promise
   */
  goImmediately (slide) {
    const { currentSlide } = this.state
    const { animationTime } = this.props

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
          transitionTime: animationTime
        }, resolve)
      })
    })
  }

  change = async (index, type = 'exact', force = false) => {
    const { value, onChange, children } = this.props
    const isImmediate = value == null || force

    if (onChange && !force) {
      onChange(index, type)
    }

    if (!isImmediate) {
      this.lastMovementType = type
      this.lastMovementIndex = index % children.length
      return
    }

    this.lastMovementType = null
    this.lastMovementIndex = null

    if (type === 'forward' || type === 'back') {
      await this.go(index, type)
    } else {
      // FIXME: GET CLONES IN CASE
      this.setState({
        currentSlide: index
      })
    }
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

    return this.change(currentSlide + perPage, 'forward')
  }

  /**
   * Handle click prev
   */
  handlerPrev = () => {
    const { perPage } = this.props
    const { currentSlide } = this.state

    return this.change(currentSlide - perPage, 'back')
  }

  /**
   * Handle change slide when click on proper dot
   */
  handlerDot = (index) => {
    return this.change(index, 'exact')
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
    const { currentSlide, slides } = this.state

    const slide = currentSlide % children.length

    return renderDots({
      ...restProps,
      slides: slides,
      children: children,
      perPage: perPage,
      index: slide,
      value: Math.floor(slide / perPage),
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
    const {
      arrows, className, dots, perPage,
      children, animationTime, renderDots, value, onChange, defaultMovement, ...passedProps
    } = this.props
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
      <div className={clsName} {...passedProps}>
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
