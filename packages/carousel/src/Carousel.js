import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'carousel'

/**
 * Component which represents Carousel.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class Carousel extends React.PureComponent {
  state = {
    currentSlide: 1,
    childrenLength: this.props.children.length + 1,
    transform: 0,
    transitionTime: 400
  }

  handlerPrev = () => {
    const { currentSlide, childrenLength, transform } = this.state

    if (currentSlide === 0) {
      this.setState({
        transform: '75%'
      })
    }

    if (currentSlide < 0) {
      this.setState({
        currentSlide: childrenLength - 1
      })
    } else {
      this.setState({
        currentSlide: currentSlide - 1,
        transform: transform + (100 / childrenLength)
      })
    }
  }

  handlerNext = () => {
    const { currentSlide, childrenLength, transform } = this.state

    if (currentSlide === childrenLength) {
      this.setState({
        transitionTime: 0,
        transform: 0
      })
    }

    if (currentSlide > childrenLength - 1) {
      this.setState({currentSlide: 1})
    } else {
      this.setState({
        currentSlide: currentSlide + 1,
        transform: transform - (100 / childrenLength)
      })
    }
  }

  renderChildren = () => {
    const {children} = this.props
    const {childrenLength} = this.state
    return (
      <span style={{width: '100%'}}>
        {children.map((el, i) => {
          return (
            <span className='one-slide' style={{order: i + 1, width: `${100 / childrenLength}%`}} key={i}>{el}</span>
          )
        })}
        <span className='one-slide' style={{order: childrenLength, width: `${100 / childrenLength}%`}} key={children.length}>{children[0]}</span>
      </span>
    )
  }

  renderWrapper = () => {
    const { childrenLength, transform, transitionTime } = this.state

    return (
      <span style={{width: `${childrenLength * 100}%`, transform: `translateX(${transform}%)`, transition: `${transitionTime}ms`}} className='children-wrapper'>
        {this.renderChildren()}
      </span>
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
    const { arrows, className, children, dots, ...passedProps } = this.props

    return (
      <div className={buildClassName(moduleName, className)} {...passedProps} >
        {this.renderWrapper()}
        {dots && this.renderDots()}
        {arrows && <span className={buildClassName([moduleName, 'buttons'])}>
          <button onClick={this.handlerPrev}>Prev</button>
          <button onClick={this.handlerNext}>Next</button>
        </span>}
      </div>
    )
  }
}

Carousel.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  slidesVisible: PropTypes.number
}

Carousel.defaultProps = {
  children: []
}

export default Carousel
