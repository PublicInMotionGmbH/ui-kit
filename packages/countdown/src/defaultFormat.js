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

function defaultFormat (state) {
  const { days, hours, min, sec, finished } = state

  return (
    <span className={buildClassName('countdown', { finished })} >
      <span className={buildClassName('countdown', 'days')}>{formatNumber(days)} </span>
       : <span className={buildClassName('countdown', 'hours')}>{formatNumber(hours)} </span>
       : <span className={buildClassName('countdown', 'minutes')}>{formatNumber(min)} </span>
       : <span className={buildClassName('countdown', 'seconds')}>{formatNumber(sec)} </span>
    </span>
  )
}

export default defaultFormat
