import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'carousel'

function reflow (node) {
  return node.offsetHeight
}

/**
 * Component which represents Carousel.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class Carousel extends React.PureComponent {
  state = {
    currentSlide: 0,
    childrenLength: this.props.children.length + 1,
    transform: 0,
    transitionTime: this.props.duration,
    lastSlide: false
  }

  componentDidUpdate () {
    // const { currentSlide, childrenLength, lastSlide, transform } = this.state
    // const { duration } = this.props
    // if (lastSlide) {
    //   this.setState({
    //     transitionTime: 0,
    //     currentSlide: currentSlide + 1,
    //     transform: transform - (100 / childrenLength),
    //     lastSlide: false
    //   })
    //   console.log('acompo did mount')
    // }
    console.log(this.state.currentSlide)
    console.log('update')
  }

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

  async go (index, type = 'forward') {
    const { children, perPage } = this.props
    const { currentSlide } = this.state

    let length = children.length

    while (length < perPage) {
      length += children.length
    }

    while (index < 0 /* && length */) {
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

  handlerNext = () => {
    const { perPage } = this.props
    const { currentSlide } = this.state

    this.go(currentSlide + perPage)
  }

  handlerPrev = () => {
    const { perPage } = this.props
    const { currentSlide } = this.state

    this.go(currentSlide - perPage, 'back')
  }

  setRef = node => {
    this.wrapper = findDOMNode(node)
  }

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

  renderWrapper = () => {
    const { perPage } = this.props
    const { transitionTime, currentSlide } = this.state

    return (
      <div ref={this.setRef} style={{transform: `translateX(-${currentSlide * 100 / perPage}%)`, transitionDuration: `${transitionTime}ms`}} className='children-wrapper'>
        {this.renderChildren()}
      </div>
    )
  }

  renderDots = () => {
    const { children } = this.props
    return (
      children.map((el, i) => {
        return (
          <span key={i} className='dots'>{i}</span>
        )
      })
    )
  }

  render () {
    const { arrows, className, children, dots, duration, ...passedProps } = this.props

    return (
      <div className={buildClassName(moduleName, className)} {...passedProps} >
        {this.renderWrapper()}
        {dots && this.renderDots()}
        {arrows && <div className={buildClassName([moduleName, 'buttons'])}>
          <button onClick={this.handlerPrev}>Prev</button>
          <button onClick={this.handlerNext}>Next</button>
        </div>}
      </div>
    )
  }
}

Carousel.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Number of visible elements in one slide */
  slidesVisible: PropTypes.number,

  /** Slides animation duration */
  duration: PropTypes.number

  /**  */
}

Carousel.defaultProps = {
  children: [],
  duration: 500,
  perPage: 1
}

export default Carousel
