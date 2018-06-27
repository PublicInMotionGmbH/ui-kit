import React from 'react'
import PropTypes from 'prop-types'

import defaultFormat from './defaultFormat'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Format of displayed date */
  render: PropTypes.func,

  /** The date to which it will count down. */
  targetDate: PropTypes.string.isRequired
}

const defaultProps = {
  render: defaultFormat
}

/**
 * Component which represents Countdown.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.format]
 * @property {string} props.targetDate
 * @class {React.Element}
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.targetDate !== this.props.targetDate) {
      this.tick()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.tickTimeout)
  }

  tick = () => {
    const { targetDate } = this.props

    this.countTime(targetDate)

    clearTimeout(this.tickTimeout)
    this.tickTimeout = setTimeout(this.tick, 300)
  }

  /**
   * Set each part of date in state
   * @param {string} targetDate
   */
  countTime = (targetDate) => {
    const convertedDate = Date.parse(targetDate)

    this.setState({
      time: Math.max(0, convertedDate - Date.now())
    })
  }

  render () {
    const { time } = this.state
    const sec = Math.floor((time / 1000) % 60)
    const min = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const finished = !(sec + min + hours + days)
    const timeObj = {days, hours, min, sec, finished}

    return (
      <React.Fragment>
        {this.props.render(timeObj)}
      </React.Fragment>
    )
  }
}

Countdown.propTypes = propTypes
Countdown.defaultProps = defaultProps

export default Countdown
