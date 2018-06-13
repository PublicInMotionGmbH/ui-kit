import React from 'react'
import PropTypes from 'prop-types'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
    currentSlide: 0,
    childrenLength: this.props.children ? this.props.children.length : 0,
    isNext: true
  }

  handlerPrev = () => {
    const { currentSlide, childrenLength } = this.state

    if (currentSlide < 1) {
      this.setState({currentSlide: childrenLength - 1})
    } else {
      this.setState({currentSlide: currentSlide - 1})
    }

    this.setState({isNext: false})
  }

  handlerNext = () => {
    const { currentSlide, childrenLength } = this.state

    if (currentSlide > childrenLength - 2) {
      this.setState({currentSlide: 0})
    } else {
      this.setState({currentSlide: currentSlide + 1})
    }

    this.setState({isNext: true})
  }

  renderChildren = () => {
    const {children} = this.props
    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: this.state.isNext ? 'enter-next' : 'enter-prev',
          enterActive: 'enter-active',
          leave: 'leave',
          leaveActive: this.state.isNext ? 'leave-active-next' : 'leave-active-prev'
        }}
        transitionEnterTimeout={900}
        transitionLeaveTimeout={900}
      >
        {<span className='one-slide' key={this.state.currentSlide}>{children[this.state.currentSlide]}</span>}
      </ReactCSSTransitionGroup>

    )
  }

  render () {
    const { arrows, className, children, dots, ...passedProps } = this.props

    return (
      <span className={buildClassName(moduleName, className)} {...passedProps} >
        <span className='children-wrapper'>
          {this.renderChildren()}
        </span>
        {/* {dots && <span className='dots'>{children.length}</span>} */}

        {arrows && <span className='buttons'>
          <button onClick={this.handlerPrev}>Prev</button>
          <button onClick={this.handlerNext}>Next</button>
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
