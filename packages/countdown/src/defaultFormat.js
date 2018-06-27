import React from 'react'

import { buildClassName } from '@talixo/shared'

function formatNumber (num) {
  if (isNaN(num)) {
    return '00'
  }

  if (num < 10) {
    return '0' + num
  }

  return num
}

function defaultFormat (props) {
  const { days, hours, min, sec, finished } = props

  return (
    <span className={buildClassName('countdown', null, { finished })} >
      <span className={buildClassName('countdown', null, 'days')}>{formatNumber(days)} </span>
       : <span className={buildClassName('countdown', null, 'hours')}>{formatNumber(hours)} </span>
       : <span className={buildClassName('countdown', null, 'minutes')}>{formatNumber(min)} </span>
       : <span className={buildClassName('countdown', null, 'seconds')}>{formatNumber(sec)} </span>
    </span>
  )
}

export default defaultFormat
