import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
  format: 'dd : hh : mm : ss'
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

  renderTime = (num, time) => {
    const { format } = this.props

    // wyniesc do osobnej funkcji
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

  renderLabels = (label) => {
    const { format } = this.props
    const { days, hours, min, sec } = this.state
    let result

    const regex = /\[.*?\]/
    const findOptional = regex.exec(format)

    /// ////////////////////////////////////////////////////////
    function handleLabel (time, type, findLabel) {
      if (label === type) {
        if (time <= 0 && findOptional) {
          const isOptional = findOptional[0].match(type)
          if (isOptional) return
        }
        result = findLabel.exec(format)
      }
    }

    if (label === 'dd') {
      handleLabel(days, 'dd', /(?<=\bdd\s)(\S+)/)
    } else if (label === 'hh') {
      handleLabel(hours, 'hh', /(?<=\bhh\s)(\S+)/)
    } else if (label === 'mm') {
      handleLabel(min, 'mm', /(?<=\bmm\s)(\S+)/)
    } else if (label === 'ss') {
      handleLabel(sec, 'ss', /(?<=\bss\s)(\S+)/)
    }
    // //////////////////////////////////////////////////////////
    // if (label === 'days') {
    //   if (days <= 0 && findOptional) {
    //     isOptional = findOptional[0].match('dd')
    //   }
    //   const findLabel = /(?<=\bdd\s)(\S+)/
    //   result = findLabel.exec(format)
    // }

    // if (label === 'hours') {
    //   if (hours <= 0 && findOptional) {
    //     isOptional = findOptional[0].match('hh')
    //   }
    //   const findLabel = /(?<=\bhh\s)(\S+)/
    //   result = findLabel.exec(format)
    // }

    // if (label === 'min') {
    //   if (min <= 0 && findOptional) {
    //     isOptional = findOptional[0].match('mm')
    //   }
    //   const findLabel = /(?<=\bmm\s)(\S+)/
    //   result = findLabel.exec(format)
    // }

    // if (label === 'sec') {
    //   if (sec <= 0 && findOptional) {
    //     isOptional = findOptional[0].match('ss')
    //   }
    //   const findLabel = /(?<=\bss\s)(\S+)/
    //   result = findLabel.exec(format)
    //   if (!result) {
    //     result = ''
    //   }
    // }
    if (!result) return
    return result[0]
  }

  render () {
    const { className, ...passedProps } = this.props
    const { days, hours, min, sec } = this.state

    return (
      <span className={buildClassName('countdown', className)} {...passedProps} >
        <span>{this.renderTime(days, 'dd')} </span>
        <span>{this.renderLabels('dd')} </span>
        <span>{this.renderTime(hours, 'hh')} </span>
        <span>{this.renderLabels('hh')} </span>
        <span>{this.renderTime(min, 'mm')} </span>
        <span>{this.renderLabels('mm')} </span>
        <span>{this.renderTime(sec, 'ss')} </span>
        <span>{this.renderLabels('ss')}</span>
      </span>
    )
  }
}

Countdown.propTypes = propTypes
Countdown.defaultProps = defaultProps

export default Countdown
