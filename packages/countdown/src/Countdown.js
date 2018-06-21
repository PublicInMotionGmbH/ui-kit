import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Format of displayed date */
  format: PropTypes.string,

  /** The date to which it will count down. */
  targetDate: PropTypes.string.isRequired
}

const defaultProps = {
  format: 'dd : hh : mm : ss'
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
    const { targetDate } = this.props
    setInterval(() => this.countTime(targetDate), 1000)
  }

  /**
   * Set each part of date in state
   * @param {string} targetDate
   */
  countTime = (targetDate) => {
    const time = Date.parse(targetDate) - Date.parse(new Date())
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    const sec = Math.floor((time / 1000) % 60)
    const min = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)

    this.setState({days, hours, min, sec})
  }

  /**
   * Render parts of remaining time
   * @param {number} num
   * @param {string} time
   *
   * @returns {number | string}
   */
  renderTime = (num, time) => {
    const { format } = this.props
    const regex = /\[.*?\]/
    const findOptional = regex.exec(format)
    let isOptional

    if (findOptional) {
      isOptional = findOptional[0].match(time)
    }

    if (num <= 0 && isOptional) {
      return null
    }

    if (num < 0) return '00'

    return num < 10 ? '0' + num : num
  }

  /**
   * Render lables for each part of date
   * @param {string} label
   *
   * @returns string
   */
  renderLabels = (label) => {
    const { format } = this.props
    const { days, hours, min, sec } = this.state
    let result

    const regex = /\[.*?\]/
    const findOptional = regex.exec(format)

    function handleLabel (time, type, findLabel) {
      if (label === type) {
        if (time <= 0 && findOptional) {
          const isOptional = findOptional[0].match(type)
          if (isOptional) return
        }
        result = findLabel.exec(format.replace(/[[\]']+/g, ''))
      }
    }

    if (label === 'dd') {
      handleLabel(days, 'dd', /(\bdd\s)(\S+)/)
    } else if (label === 'hh') {
      handleLabel(hours, 'hh', /(\bhh\s)(\S+)/)
    } else if (label === 'mm') {
      handleLabel(min, 'mm', /(\bmm\s)(\S+)/)
    } else if (label === 'ss') {
      handleLabel(sec, 'ss', /(\bss\s)(\S+)/)
    }

    if (!result) return
    return result[2]
  }

  render () {
    const { className } = this.props
    const { days, hours, min, sec } = this.state

    return (
      <span className={buildClassName('countdown', className)} >
        {this.renderTime(days, 'dd') &&
          <React.Fragment>
            <span>{this.renderTime(days, 'dd')} </span>
            <span>{this.renderLabels('dd')} </span>
          </React.Fragment>
        }

        {this.renderTime(hours, 'hh') &&
          <React.Fragment>
            <span>{this.renderTime(hours, 'hh')} </span>
            <span>{this.renderLabels('hh')} </span>
          </React.Fragment>
        }

        {this.renderTime(min, 'mm') &&
          <React.Fragment>
            <span>{this.renderTime(min, 'mm')} </span>
            <span>{this.renderLabels('mm')} </span>
          </React.Fragment>
        }

        {this.renderTime(sec, 'ss') &&
          <React.Fragment>
            <span>{this.renderTime(sec, 'ss')} </span>
            <span>{this.renderLabels('ss')}</span>
          </React.Fragment>
        }
      </span>
    )
  }
}

Countdown.propTypes = propTypes
Countdown.defaultProps = defaultProps

export default Countdown
