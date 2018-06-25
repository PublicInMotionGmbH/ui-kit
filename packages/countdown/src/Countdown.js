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
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  }

  /**
   * Set interval to update counter
   */
  componentDidMount () {
    this.tick()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.targetDate !== this.props.targetDate) {
      this.setState({ targetDate: nextProps.targetDate })
    }
  }

  componentWillUnmount () {
    clearTimeout(this.tickTimeout)
  }

  tick = () => {
    const { targetDate } = this.props

    this.countTime(targetDate)

    this.tickTimeout = setTimeout(this.tick, 300)
  }

  /**
   * Set each part of date in state
   * @param {string} targetDate
   */
  countTime = (targetDate) => {
    const time = Math.max(0, Date.parse(targetDate) - Date.now())
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const sec = Math.floor((time / 1000) % 60)
    const min = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)

    this.setState({days, hours, min, sec})
  }

  render () {
    return (
      <React.Fragment>
        {this.props.render(this.state)}
      </React.Fragment>
    )
  }
}

Countdown.propTypes = propTypes
Countdown.defaultProps = defaultProps

export default Countdown
