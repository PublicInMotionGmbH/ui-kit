import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import chunk from 'lodash/chunk'

import { buildClassName } from '@talixo/shared'

import Dots from './Dots'
import Arrows from './Arrows'

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

  /** Infinite scroll */
  infinite: PropTypes.bool,

  /** Number of slides visible in one time */
  perPage: PropTypes.number,

  /** Function which render custom dots */
  renderDots: PropTypes.func,

  /** Function which render custom arrows */
  renderArrows: PropTypes.func,

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
  infinite: false,
  perPage: 1,
  renderDots: Dots,
  renderArrows: Arrows,
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
 * @property {boolean} [props.infinite]
 * @property {number} [props.perPage]
 * @property {function} [props.renderDots]
 *
 * @class {React.Element}
 */
class Carousel extends React.PureComponent {
  mounted = false
  state = {
    slides: chunk(this.props.children, this.props.perPage),
    currentSlide: this.props.value != null
      ? this.props.value % this.props.children.length
      : 0,
    transitionTime: this.props.animationTime
  }

  componentDidMount () {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted = false
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

  change = (index, type = 'exact', force = false) => {
    const { value, onChange, children, infinite, perPage } = this.props
    const isImmediate = value == null || force

    if (!infinite) {
      const realIndex = index % children.length
      const maxIndex = Math.max(0, children.length - perPage)

      if (realIndex < 0) {
        index -= realIndex
      } else if (realIndex > maxIndex) {
        index -= realIndex - maxIndex
      }
    }

    if (onChange && !force) {
      onChange(index % children.length, type)
    }

    if (!isImmediate) {
      this.lastMovementType = type
      this.lastMovementIndex = index % children.length
      return
    }

    this.lastMovementType = null
    this.lastMovementIndex = null

    if (type === 'forward' || type === 'back') {
      return this.go(index, type)
    } else {
      // FIXME: GET CLONES IN CASE
      this.setState({
        currentSlide: index
      })
    }
  }

  /**
   * Change to next or previous slide.
   *
   * @param {number} index
   * @param {string} type
   */
  go (index, type = 'forward') {
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

    this.goImmediately(current).then(() => {
      // Do not update state if component has been unmounted meanwhile
      if (!this.mounted) {
        return
      }

      this.setState({ currentSlide: next })
    })
  }

  /**
   * Handle going to next slide.
   */
  handleForward = () => {
    const { perPage } = this.props
    const { currentSlide } = this.state

    return this.change(currentSlide + perPage, 'forward')
  }

  /**
   * Handle going to previous slide.
   */
  handleBack = () => {
    const { perPage } = this.props
    const { currentSlide } = this.state

    return this.change(currentSlide - perPage, 'back')
  }

  /**
   * Handle changing slide when click on proper dot.
   */
  handleExact = (index) => {
    return this.change(index, 'exact')
  }

  /**
   * Set reference to wrapper node.
   */
  setRef = node => {
    this.wrapper = findDOMNode(node)
  }

  /**
   * Render slides inside.
   *
   * @returns {React.Element}
   */
  renderSlides () {
    const { children, infinite, perPage } = this.props

    const clsName = buildClassName([ moduleName, 'slide' ])
    const style = { minWidth: `${100 / perPage}%`, maxWidth: `${100 / perPage}%` }

    const copies = []

    if (infinite) {
      for (let i = 0; i < Math.max(children.length) + 3 * perPage; i++) {
        copies.push(
          <div className={clsName} style={style} key={'copy-' + i}>
            {children[i % children.length]}
          </div>
        )
      }
    }

    return children.map((el, i) => (
      <div className={clsName} style={style} key={i}>
        {el}
      </div>
    )).concat(copies)
  }

  /**
   * Build props required for movement helpers (dots, arrows).
   *
   * @returns {{ slides: (Array|*), children: node, perPage: number, index: number, value: number }}
   */
  buildMovementProps () {
    const { renderDots, renderArrows, children, perPage, ...restProps } = this.props
    const { currentSlide, slides } = this.state

    const slide = currentSlide % children.length

    return {
      ...restProps,
      slides: slides,
      children: children,
      perPage: perPage,
      index: slide,
      value: Math.floor(slide / perPage)
    }
  }

  /**
   * Render dots component.
   *
   * @returns {React.Element}
   */
  renderDots () {
    const { renderDots } = this.props

    return React.createElement(renderDots, {
      ...this.buildMovementProps(),
      onChange: this.handleExact
    })
  }

  /**
   * Render arrows component.
   *
   * @returns {React.Element}
   */
  renderArrows () {
    const { children, infinite, perPage, renderArrows } = this.props
    const { currentSlide } = this.state

    const firstSlide = currentSlide === 0
    const lastSlide = currentSlide >= (children.length - perPage)

    const props = { ...this.buildMovementProps() }

    if (!firstSlide || infinite) {
      props.onBack = this.handleBack
    }

    if (!lastSlide || infinite) {
      props.onForward = this.handleForward
    }

    return React.createElement(renderArrows, props)
  }

  render () {
    const {
      arrows, className, dots, perPage, children, animationTime, infinite,
      renderArrows, renderDots, value, onChange, defaultMovement, ...passedProps
    } = this.props
    const { currentSlide, transitionTime } = this.state

    const firstSlide = currentSlide === 0
    const lastSlide = currentSlide >= (children.length - perPage)

    const clsName = buildClassName(moduleName, className)
    const contentClsName = buildClassName([ moduleName, 'content' ], null, {
      first: !infinite && firstSlide,
      last: !infinite && lastSlide
    })
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
