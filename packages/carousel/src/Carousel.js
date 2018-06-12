import React from 'react'
import PropTypes from 'prop-types'

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { buildClassName } from '@talixo/shared'

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
    childrenLength: this.props.children.length
  }

  handlerPrev = () => {
    const { currentSlide, childrenLength } = this.props

    this.setState({currentSlide: childrenLength - 1})

    if (currentSlide < 1) {
      this.setState({currentSlide: childrenLength})
    } else {
      this.setState({currentSlide: childrenLength - 1})
    }
  }

  handlerNext = () => {
    const { currentSlide, childrenLength } = this.props

    this.setState({currentSlide: childrenLength + 1})

    if (currentSlide === childrenLength) {
      this.setState({currentSlide: 1})
    } else {
      this.setState({currentSlide: childrenLength + 1})
    }
  }

  renderChildren = () => {
    const {children} = this.props
    return (
      React.Children.map(children, (el, i) => {
        return <span className='one-slide' key={i}>{el}</span>
      })
    )
  }

  render () {
    const { arrows, className, children, dots, ...passedProps } = this.props

    return (
      <span className={buildClassName('carousel', className)} {...passedProps} >
        <span className='children-wrapper'>
          {this.renderChildren()}
        </span>

        {dots && <span className='dots'>{children.length}</span>}
        {arrows && <span className='buttons'>
          <button onClick={this.handlerPrev()}>Prev</button>
          <button onClick={this.handlerNext()}>Next</button>
        </span>}
      </span>
    )
  }
}

Carousel.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Carousel.defaultProps = {
}

export default Carousel
