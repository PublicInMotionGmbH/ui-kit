import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** Initial slide */
  initialSlide: PropTypes.number,

  /** Movement */
  movement: PropTypes.oneOf([ 'exact', 'forward', 'back' ]),

  /** Auto-play interval */
  interval: PropTypes.number,

  /** Number of slides to move each interval (defaults: perPage of child Carousel) */
  step: PropTypes.number,

  /** Carousel to add this behavior to */
  children: PropTypes.node
}

const defaultProps = {
  movement: 'forward',
  interval: 3000
}

/**
 * Component which adds auto-play behavior for child Carousel
 *
 * @property {object} props
 * @property {object} props.children
 * @property {object} props.children.props
 * @property {number} [props.children.props.value]
 * @property {number} props.interval
 * @property {string} props.movement
 * @property {number} [props.step]
 * @property {number} [props.initialSlide]
 *
 * @property {object} state
 * @property {React.Element} state.carousel
 * @property {number} state.value
 *
 * @property {boolean} mounted
 * @property {number} [tickTimeout]
 *
 * @class
 */
class CarouselAutoplay extends React.PureComponent {
  mounted = false

  /**
   * @param {object} props
   * @param {object} props.children
   * @param {object} props.children.props
   * @param {number} [props.children.props.value]
   * @param {number} props.interval
   * @param {string} props.movement
   * @param {number} [props.step]
   * @param {number} [props.initialSlide]
   */
  constructor (props) {
    super(props)

    const carousel = this.buildCarousel(this.props, this.props.initialSlide)

    this.state = {
      carousel: carousel,
      value: carousel.props.value
    }
  }

  /**
   * Start auto-play when component is mounted.
   */
  componentDidMount () {
    this.tick()
    this.mounted = true
  }

  /**
   * Stop auto-play when component is dismounted.
   */
  componentWillUnmount () {
    this.stop()
    this.mounted = false
  }

  /**
   * Initialize auto-play tick.
   */
  tick () {
    this.tickTimeout = setTimeout(() => {
      this.next()
      this.tick()
    }, this.props.interval)
  }

  /**
   * Abort current auto-play tick.
   */
  stop () {
    clearTimeout(this.tickTimeout)
  }

  /**
   * Build carousel element with expected properties (according to this wrapper).
   *
   * @param {object} props
   * @param {string} props.movement
   * @param {object} props.children
   * @param {object} props.children.props
   * @param {number} [props.children.props.value]
   * @param {number} [slide]
   * @returns {React.Element}
   */
  buildCarousel (props, slide) {
    const carousel = React.Children.only(props.children)

    if (slide == null) {
      slide = +carousel.props.value || 0
    }

    const onChange = carousel.props.onChange

    return React.cloneElement(props.children, {
      value: slide || 0,
      defaultMovement: props.movement,
      onChange: onChange == null
        ? this.change
        : (...args) => {
          this.change(...args)
          onChange(...args)
        }
    })
  }

  /**
   * Handle onChange event on Carousel.
   *
   * @param {number} value
   */
  change = (value) => {
    if (value === this.state.value) {
      return
    }

    this.setState({
      carousel: this.buildCarousel(this.props, value),
      value: value
    })

    // Restart auto-play interval
    if (this.mounted) {
      this.stop()
      this.tick()
    }
  }

  /**
   * Go to next slide.
   */
  next () {
    const { value, carousel } = this.state

    const step = this.props.step == null ? +carousel.props.perPage || 1 : this.props.step
    const nextValue = (value + step) % carousel.props.children.length

    this.setState({
      carousel: this.buildCarousel(this.props, nextValue),
      value: nextValue
    })
  }

  /**
   * Handle changes in props - changed children, movement type or interval.
   *
   * @param {object} props
   * @param {object} props.children
   * @param {object} props.children.props
   * @param {number} [props.children.props.value]
   * @param {number} props.interval
   * @param {string} props.movement
   * @param {number} [props.step]
   * @param {number} [props.initialSlide]
   */
  componentWillReceiveProps (props) {
    if (props.children !== this.props.children || props.movement !== this.props.movement) {
      this.setState({
        carousel: this.buildCarousel(props, this.state.value)
      })
    }

    if (this.props.interval !== props.interval) {
      if (this.mounted) {
        this.stop()
        this.tickTimeout = setTimeout(() => this.tick())
      }
    }
  }

  /**
   * Render built carousel.
   *
   * @returns {React.Element}
   */
  render () {
    return this.state.carousel
  }
}

CarouselAutoplay.propTypes = propTypes
CarouselAutoplay.defaultProps = defaultProps

export default CarouselAutoplay
