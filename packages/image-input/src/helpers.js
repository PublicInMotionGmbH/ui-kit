/**
 * Creates image URL which can e used to display image.
 *
 * @param {string|object} file
 * @param {string} type
 * @returns {string}
 */
export function getImageUrl (file, type) {
  // Handle URL type.
  if (type === 'url') {
    return file
  }

  // Generate Blob and create preview URL
  if (type === 'binary') {
    const blob = new window.Blob([file])
    const newUrl = window.URL.createObjectURL(blob)
    return newUrl
  }

  // Create preview URL of file
  if (type === 'file') {
    const newUrl = window.URL.createObjectURL(file)
    return newUrl
  }

  return null
}

/**
 *
 * @param {Event|SyntheticEvent} event
 * @returns {*}
 */
export function getDataTransferFile (event) {
  if (event.dataTransfer && event.dataTransfer.files) {
    return event.dataTransfer.files[0] || null
  } else if (event.target && event.target.files) {
    return event.target.files[0] || null
  } else {
    return null
  }
}

export const events = {
  end: 'onDragEnd',
  enter: 'onDragEnter',
  exit: 'onDragExit',
  leave: 'onDragLeave',
  over: 'onDragOver',
  start: 'onDragStart'
}
