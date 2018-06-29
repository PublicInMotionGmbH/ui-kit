export function getDataTransferFiles (event) {
  if (event.dataTransfer) {
    return event.dataTransfer.files || []
  } else if (event.target) {
    return event.target.files || []
  } else {
    return []
  }
}

export function formatBytes (bytes) {
  if (isNaN(bytes)) return 'n/a'
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = 2
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const sizesLength = sizes.length - 1

  let i = Math.floor(Math.log(bytes) / Math.log(k))
  if (i > sizesLength) i = sizesLength

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
