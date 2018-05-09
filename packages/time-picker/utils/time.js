import moment from 'moment'

export const formatOutput = (value, type, ap, format) => ({
  value,
  type,
  ap,
  format
})

export function getTime (type) {
  let date, ap, hour, minutes

  // Get current time
  date = moment()
  // Get current hour
  hour = date.hour()

  ap = hour <= 11
    ? 'a'
    : 'p'

  if (hour > 12 && type === '12') { hour = hour - 12 }
  if (hour < 10) { hour = '0' + hour.toString() }
  hour = hour.toString()

  // Get current minutes
  minutes = date.minutes()
  if (minutes < 10) { minutes = '0' + minutes.toString() }
  minutes = minutes.toString()

  return {
    h: formatOutput(hour, type, ap, 'h'),
    m: formatOutput(minutes, type, ap, 'm')
  }
}

/**
 * Format time according to ISO - HH:mm.
 *
 * @param {object} time
 * @param {string|null} prevTime
 * @returns {string}
 */
export function formatTimeValue (time) {
  let output
  const { ap, format, type, value } = time

  if (format === 'h') {
    // Convert time value to number
    const timeValue = parseFloat(value)

    // If time type is '12 hour' add 12 hours to 'am' values
    output = type === '24'
      ? timeValue
      : ap === 'p'
        ? timeValue + 12
        : timeValue

    // Format hours correctly
    if (output < 10) { output = '0' + output.toString() }
  } else if (format === 'm') {
    // Convert time value to number
    const timeValue = parseFloat(value)

    output = timeValue

    // Format minutes correctly
    if (output < 10) { output = '0' + output.toString() }
  }

  return output.toString()
}

/**
 * Format time input value.
 *
 * @param {string} format
 * @param {string} inputValue
 * @param {string} prevInputValue
 * @param {string} type
 * @returns {string}
 */
export function formatInputValue (format, inputValue, prevInputValue, type) {
  /// Convert
  const prevValue = parseInt(prevInputValue)
  let output = inputValue === ''
    ? ''
    : parseInt(inputValue)

  let range

  if (format === 'm') {
    // If the format is minutes - keep input value between 0 and 59
    range = output >= 0 && output <= 59
  } else if (format === 'h' && type === '24') {
    // If the format is hours and type 24 - keep input value between 0 and 23
    range = output >= 0 && output <= 23
  } else if (format === 'h' && type === '12') {
    // If the format is hours and type 12 - keep input value between 0 and 11
    range = type === '12' && output >= 0 && output <= 11
  }

  // Check if input value is a number and in time range
  output = isNaN(output) || !range
    ? prevValue.toString()
    : output.toString()

  // if (output < 10) { output = '0' + output.toString() }
  return output
}

/**
 * Get ap from time value.
 *
 * @param {string} value
 * @param {string} format
 * @param {string} type
 * @returns {string}
 */
export function getAp (value, format, type) {
  let ap
  if (format === 'h' && type === '24') {
    ap = parseInt(value) <= 11
      ? 'a'
      : 'p'
  }

  return ap
}
