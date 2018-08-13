import React from 'react'
import PropTypes from 'prop-types'

import BasicCountdownRenderer from './BasicCountdownRenderer'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Format of displayed date */
  render: PropTypes.func,

  /** The date to which it will count down. */
  targetDate: PropTypes.string.isRequired
}

const defaultProps = {
  render: BasicCountdownRenderer
}

/**
 * Component which represents Countdown.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} props.targetDate
 * @property {function} props.render
 *
 * @property {object} state
 * @property {number} state.time
 *
 * @property {number} [tickTimeout]
 *
 * @class
 */
class Countdown extends React.PureComponent {
  state = {
    time: 0
  }

  /**
   * Set interval to update counter
   */
  componentDidMount () {
    this.tick()
  }

  /**
   * Update countdown time when the date has changed.
   *
   * @param {object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.targetDate !== this.props.targetDate) {
      this.tick(nextProps)
    }
  }

  /**
   * Stop ticking when it's not mounted anymore.
   */
  componentWillUnmount () {
    clearTimeout(this.tickTimeout)
  }

  /**
   * Calculate time left.
   */
  tick = (props) => {
    const { targetDate } = props || this.props

    this.countTime(targetDate)

    clearTimeout(this.tickTimeout)
    this.tickTimeout = setTimeout(this.tick, 300)
  }

  /**
   * Update time in state.
   *
   * @param {string} targetDate
   */
  countTime (targetDate) {
    const convertedDate = Date.parse(targetDate)

    this.setState({
      time: Math.max(0, convertedDate - Date.now())
    })
  }

  /**
   * Render countdown.
   *
   * @returns {React.Element}
   */
  render () {
    const { time } = this.state
    const { render: Renderer, ...passedProps } = this.props

    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)
    const days = Math.floor(time / (1000 * 60 * 60 * 24))

    const finished = time === 0

    const countdownProps = {
      ...passedProps,
      time,
      days,
      hours,
      minutes,
      seconds,
      finished
    }

    return <Renderer {...countdownProps} />
  }
}

Countdown.displayName = 'Countdown'

Countdown.propTypes = propTypes
Countdown.defaultProps = defaultProps

export default Countdown
