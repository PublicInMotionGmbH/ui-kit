const path = require('path')
const stream = require('stream')
const fs = require('fs-extra')
const readline = require('readline')
const wget = require('wget-improved')
const ProgressBar = require('progress')
const unzip = require('unzip-stream')

const promisify = require('util').promisify

// Build promisified functions
const mkdir = promisify(fs.mkdirp)
const writeFile = promisify(fs.writeFile)

/**
 * Clear line and display new text
 *
 * @param {string} str
 */
function writeLine (str) {
  // Clear line and go to beginning
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)

  // Display new text
  process.stdout.write(str)
}

/**
 * Create progress bar instance
 * @param {string} label
 * @param {number} total
 * @returns {ProgressBar}
 */
function createProgressBar (label, total) {
  const bar = new ProgressBar(`${label} :bar :percent, eta: :etas`, {
    complete: '█',
    width: 50,
    total: total
  })

  const update = bar.update

  // Monkey patch ProgressBar to correctly handle ending status
  bar.update = function (v, ...args) {
    v = Math.min(v, 1)

    // Ignore if it's already finished and should be again
    if (v === 1 && this.curr === this.total) {
      return
    }

    return update.apply(this, [ v, ...args ])
  }

  return bar
}

/**
 * Download file
 *
 * @param {string} label
 * @param {string} url
 * @param {string} destinationPath
 * @returns {Promise<*, string|Error>}
 */
function download (label, url, destinationPath) {
  // Create directory for download
  fs.mkdirpSync(path.dirname(destinationPath))

  // Start downloading
  const download = wget.download(url, destinationPath)

  // Build progress bar to show downloading status
  const bar = createProgressBar(`Downloading ${label}`, 1000)

  // Handle download
  return new Promise((resolve, reject) => {
    download.on('error', reject)
    download.on('progress', status => bar.update(status))
    download.on('end', resolve)
  })
}

/**
 * Analyze archive entries
 *
 * @param {string} filePath
 * @param {function(entry: object)} handler
 * @returns {Promise<any, string|Error>}
 */
function analyzeArchiveEntries (filePath, handler) {
  // Build stream pipe to analyze archive
  const pipe = fs.createReadStream(filePath)
    .pipe(unzip.Parse())
    .pipe(stream.Transform({
      objectMode: true,
      transform: (entry, e, cb) => {
        return Promise.resolve(handler(entry))
          .catch(x => x)
          .then(() => {
            entry.autodrain()
            cb()
          })
      }
    }))

  // Resolve with simple promise
  return new Promise((resolve, reject) => {
    pipe
      .on('error', reject)
      .on('finish', resolve)
  })
}

/**
 * Remove specified file
 *
 * @param {string} filePath
 */
function removeFile (filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

// Prepare regular expression for finding icons in archive
const iconRegex = /\/([^/]*)\/svg\/production\/ic_(.*)_([1-9][0-9]*)px\.svg$/

/**
 * Get information about icon based on file path (inside of archive)
 *
 * @param {string} filePath
 * @returns {null|{ path: string, name: string, size: int, types: string[] }}
 */
function getIconInfo (filePath) {
  // Fail fast when file is not SVG
  if (filePath.substr(-4) !== '.svg') {
    return null
  }

  // Validate path format and gather all possible details
  const match = filePath.match(iconRegex)

  // Fail when can't recover details
  if (!match) {
    return null
  }

  // Result with detailed information about icon
  return {
    path: match[0],
    types: [ match[1] ],
    name: match[2],
    size: +match[3]
  }
}

/**
 * Create new directory
 *
 * @param {string} dirPath
 * @param {object} [options]
 * @returns {Promise}
 */
function createDirectory (dirPath, options) {
  return mkdir(dirPath, options || {})
}

/**
 * Save file with specified contents
 *
 * @param {string} filePath
 * @param {*} data
 * @returns {Promise}
 */
function saveFile (filePath, data) {
  return Promise.resolve()
    .then(() => createDirectory(path.dirname(filePath)))
    .then(() => writeFile(filePath, data))
}

/**
 * Save JSON file with specified contents
 *
 * @param {string} filePath
 * @param {*} data
 * @returns {Promise}
 */
function saveJson (filePath, data) {
  return Promise.resolve()
    .then(() => createDirectory(path.dirname(filePath)))
    .then(() => saveFile(filePath, JSON.stringify(data, null, 2) + '\n'))
}

exports.createProgressBar = createProgressBar
exports.writeLine = writeLine
exports.download = download
exports.removeFile = removeFile
exports.getIconInfo = getIconInfo
exports.analyzeArchiveEntries = analyzeArchiveEntries
exports.saveJson = saveJson
exports.createDirectory = createDirectory
