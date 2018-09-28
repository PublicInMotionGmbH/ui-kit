/**
 * Get list of transferred files from event.
 *
 * @param {Event|SyntheticEvent} event
 * @returns {object[]}
 */
export function getDataTransferFiles (event) {
  if (event.dataTransfer) {
    return event.dataTransfer.files || []
  } else if (event.target) {
    return event.target.files || []
  } else {
    return []
  }
}

/**
 * Format bytes to human-readable format.
 *
 * @param {number} bytes
 * @param {number} precision
 * @returns {string}
 */
export function formatBytes (bytes, precision = 2) {
  // Ignore incorrect number
  if (isNaN(bytes)) {
    return 'n/a'
  }

  // Simplify for 0
  if (bytes === 0) {
    return '0 B'
  }

  // Initialize constants
  const thousand = 1024
  const sizes = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]

  // Determine expected size
  let i = Math.floor(Math.log(bytes) / Math.log(thousand))
  if (i > sizes.length - 1) {
    i = sizes.length - 1
  }

  // Calculate values
  const amount = bytes / Math.pow(thousand, i)
  const symbol = sizes[i]

  // Round value and cut zeroes on end, faster equivalent of `amount.toFixed(precision).replace(/0+$/, '')`
  const roundedAmount = parseFloat(amount.toFixed(precision))

  return `${roundedAmount} ${symbol}`
}
