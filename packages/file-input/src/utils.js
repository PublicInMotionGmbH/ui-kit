export function getDataTransferFiles (event) {
  if (event.dataTransfer) {
    return event.dataTransfer.files || null
  } else if (event.target) {
    return event.target.files || null
  }
}

//
// export function displaySize
