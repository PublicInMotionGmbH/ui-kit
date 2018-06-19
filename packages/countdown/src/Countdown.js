import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

/**
 * Component which represents Countdown.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class Countdown extends React.PureComponent {
  state = {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  }

  componentDidMount () {
    setInterval(() => this.countTime(this.props.targetDate), 1000)
  }

  countTime = (targetDate) => {
    const time = Date.parse(targetDate) - Date.parse(new Date())
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const sec = Math.floor((time / 1000) % 60)
    const min = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)

    this.setState({days, hours, min, sec})
  }

  renderTime = (num) => {
    if (num < 0) return '00'

    return num < 10 ? '0' + num : num
  }

  // renderHours = () => {
  // const { hours } = this.state
  //   this.renderTime(this.state.hours)

  // return
  // }

  // renderLabels = (param) => {
  //   const { format } = this.props
  // }

  render () {
    const { className, ...passedProps } = this.props
    const { days, hours, min, sec } = this.state

    return (
      <span className={buildClassName('countdown', className)} {...passedProps} >
        <span>{this.renderTime(days)}</span>
        <span> : </span>
        <span>{this.renderTime(hours)}</span>
        <span> : </span>
        <span>{this.renderTime(min)}</span>
        <span> : </span>
        <span>{this.renderTime(sec)}</span>
      </span>
    )
  }
}

Countdown.propTypes = propTypes

export default Countdown
