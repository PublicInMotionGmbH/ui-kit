// https://github.com/IamPitchou/console.table/blob/master/ietable.js
function showTable (data, columns) {
  if (data.constructor === Object) {
    if (!columns) {
      columns = []

      for (const prop in data[0]) {
        if (columns.indexOf(prop) === -1) {
          columns.push(prop)
        }
      }

      let header = '(index)'

      for (const p in columns) {
        header += ' | '
        header += columns[p]
      }

      console.log(header)
    } else if (typeof columns !== 'object') {
      columns = []

      for (const index in data) {
        for (const prop in data[index]) {
          if (columns.indexOf(prop) === -1) {
            columns.push(prop)
          }
        }
      }
    } else {
      let header = '(index)'

      for (const p in columns) {
        header += ' | '
        header += columns[p]
      }

      console.log(header)
    }

    for (var obj in data) {
      const entry = data[obj]
      let entryStr = obj + ''

      for (let j = 0; j < columns.length; j++) {
        entryStr += ' | '
        entryStr += entry[columns[j]]
      }

      console.log(entryStr)
    }
  } else if (data.constructor === Array) {
    if (!columns) {
      columns = []

      for (const prop in data[0]) {
        if (columns.indexOf(prop) === -1) {
          columns.push(prop)
        }
      }

      let header = '(index)'
      for (const p in columns) {
        header += ' | '
        header += columns[p]
      }

      console.log(header)
    } else if (typeof columns !== 'object') {
      columns = []

      for (const index in data) {
        for (const prop in data[index]) {
          if (columns.indexOf(prop) === -1) {
            columns.push(prop)
          }
        }
      }
    } else {
      let header = '(index)'
      for (const p in columns) {
        header += ' | '
        header += columns[p]
      }

      console.log(header)
    }

    for (let i = 0; i < data.length; i++) {
      const entry = data[i]
      let entryStr = i + ''
      for (var j = 0; j < columns.length; j++) {
        entryStr += ' | '
        entryStr += entry[columns[j]]
      }
      console.log(entryStr)
    }
  }
}

module.exports = showTable
