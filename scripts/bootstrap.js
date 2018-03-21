const path = require('path')
const spawn = require('child_process').spawn

const nodePath = process.argv[0]
const lernaCliPath = path.join(__dirname, '..', 'node_modules', '.bin', 'lerna')

/**
 * Run bootstrapping command in Lerna
 *
 * @returns {Promise<int, int>}
 */
function bootstrap () {
  // Spawn Node.js process
  const bt = spawn(nodePath, [ lernaCliPath, 'bootstrap', '--hoist' ])

  // Redirect all streams from Lerna into current process
  bt.stdout.pipe(process.stdout)
  bt.stderr.pipe(process.stderr)

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

module.exports = bootstrap
