const spawn = require('child_process').spawn

/**
 * Run any command with promise
 *
 * @returns {Promise<int, int>}
 */
function runCommand (bin, ...args) {
  // Spawn Node.js process
  const bt = spawn(bin, args, { stdio: 'inherit' })

  // Resolve
  return new Promise((resolve, reject) => {
    bt.on('close', code => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(code)
      }
    })
  })
}

/**
 * Run any command with promise (silently)
 *
 * @returns {Promise<string, object|{ code: int, error: string }>}
 */
function runCommandSilently (bin, ...args) {
  // Spawn Node.js process
  const bt = spawn(bin, args)

  // Resolve
  return new Promise((resolve, reject) => {
    let result = ''
    let error = ''

    bt.stdout.on('data', data => {
      result += data.toString()
    })

    bt.stderr.on('data', data => {
      error += data.toString()
    })

    bt.on('close', code => {
      if (code === 0) {
        resolve(result)
      } else {
        // eslint-disable-next-line
        reject({ code: code, error })
      }
    })
  })
}

module.exports = runCommand
module.exports.silent = runCommandSilently
