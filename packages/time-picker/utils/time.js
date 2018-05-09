import moment from 'moment'

export const formatOutput = (time, type, ap, format) => ({
  value: time,
  type: type,
  ap: ap,
  format: format
})

export function getTime (type) {
  let date, ap, hour, minutes

  date = moment()
  hour = date.hour()

  ap = hour <= 11
    ? 'a'
    : 'p'

  if (hour > 12 && type === '12') { hour = hour - 12 }

  minutes = date.minutes()

  if (minutes < 10) { minutes = '0' + minutes.toString() }

  return {
    h: formatOutput(hour, type, ap, 'h'),
    m: formatOutput(minutes, type, ap, 'm')
  }
}

export function formatTime (value, prevTime) {
  let hour, minutes, prevHour, prevMinutes

  if (prevTime) {
    const prevTimeArray = prevTime.split(':')
    prevHour = prevTimeArray[0]
    prevMinutes = prevTimeArray[1]
  } else {
    prevHour = moment().hour()
    prevMinutes = moment().minutes()
  }

  if (value && value.format === 'h') {
    hour = value.value
    minutes = prevMinutes
  } else if (value && value.format === 'm') {
    hour = prevHour
    minutes = value.value
  } else {
    hour = prevHour
    minutes = prevMinutes
  }

  const time = `${hour}:${minutes}`
  return time
}
