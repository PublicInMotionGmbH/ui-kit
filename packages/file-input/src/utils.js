export function getDataTransferFiles (event) {
  if (event.dataTransfer) {
    return event.dataTransfer.files || null
  } else if (event.target) {
    return event.target.files || null
  }
}

export function formatBytes (bytes, decimals) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
