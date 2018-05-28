export function formatKey (key) {
  return key
    .replace(/[_-](.)/g, ($0, $1) => ' ' + $1.toUpperCase())
    .replace(/([a-z])([A-Z])/g, ($0, $1, $2) => $1 + ' ' + $2)
    .toLowerCase()
    .replace(/^./g, $0 => $0.toUpperCase())
}

export function displayObjectProperties (object) {
  // const keys = Object.keys(object)
}
