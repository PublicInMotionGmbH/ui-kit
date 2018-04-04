const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const isBinaryFile = require('isbinaryfile')
const promisify = require('util').promisify

const runLernaCommand = require('./runLernaCommand')

// Build promisified functions
const mkdir = promisify(fs.mkdirp)
const writeFile = promisify(fs.writeFile)

// Build regular expressions for validation
const titleRegex = /^[-a-zA-Z0-9\s]+$/
const nameRegex = /^[-a-zA-Z0-9]+$/
const idRegex = /^[-a-z0-9]+$/
const versionRegex = /^([0-9]|[1-9][0-9]+)\.([0-9]|[1-9][0-9]+)\.([0-9]|[1-9][0-9]+)$/

// Set up basic paths
const packages = path.resolve(path.join(__dirname, '..', 'packages'))
const template = path.resolve(path.join(__dirname, '..', 'templates', 'component'))

/**
 * Truncate spaces on beginning and end of string
 *
 * @param {string} input
 * @returns {string}
 */
function truncate (input) {
  return input.replace(/^\s+/, '').replace(/\s+$/, '')
}

/**
 * Copy file from one place to another
 *
 * @param {string} from
 * @param {string} to
 * @returns {Promise<void, string|Error>}
 */
function copyFile (from, to) {
  let done = false

  const read = fs.createReadStream(from)
  const write = fs.createWriteStream(to)

  return new Promise((resolve, reject) => {
    function finish (err) {
      if (done) {
        return
      }

      done = true

      if (err) {
        reject(err)
      } else {
        resolve()
      }
    }

    read.on('error', finish)
    write.on('error', finish)
    write.on('close', () => finish())
  })
}

/**
 * Validate title
 *
 * @param {string} title
 * @returns {string|boolean}
 */
function validateTitle (title) {
  if (title.length === 0) {
    return 'Title can\'t be empty'
  }

  if (titleRegex.test(title)) {
    return true
  }

  return 'Title can contain only letters, dashes, spaces and numbers'
}

/**
 * Validate name
 *
 * @param {string} name
 * @returns {string|boolean}
 */
function validateName (name) {
  if (name.length === 0) {
    return 'Name can\'t be empty'
  }

  if (nameRegex.test(name)) {
    return true
  }

  return 'Name can contain only letters, dashes and numbers'
}

/**
 * Validate ID
 *
 * @param {string} id
 * @returns {string|boolean}
 */
function validateId (id) {
  if (id.length === 0) {
    return 'ID can\'t be empty'
  }

  if (idRegex.test(id)) {
    return true
  }

  return 'ID can contain only lower case letters, dashes and numbers'
}

/**
 * Validate version (semantic)
 *
 * @param {string} version
 * @returns {string|boolean}
 */
function validateVersion (version) {
  if (versionRegex.test(version)) {
    return true
  }

  return 'Version should be in 0.0.0 format'
}

// Set up basic questions
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Package title (i.e. "Switcher")',
    filter: truncate,
    validate: validateTitle
  },
  {
    type: 'input',
    name: 'name',
    message: 'Package name',
    default: ({ title }) => title.replace(/(?:^|\s+)(.)/g, ($0, $1) => $1.toUpperCase()),
    filter: input => truncate(input).replace(/^./, $0 => $0.toUpperCase()),
    validate: validateName
  },
  {
    type: 'input',
    name: 'id',
    message: 'Package ID',
    default: ({ name }) => name.replace(/.[A-Z]/g, x => x.charAt(0) + '-' + x.charAt(1).toLowerCase()).toLowerCase(),
    filter: truncate,
    validate: validateId
  },
  {
    type: 'input',
    name: 'version',
    message: 'Package version',
    default: '1.0.0',
    validate: validateVersion
  },
  {
    type: 'input',
    name: 'description',
    message: 'Package description',
    default: ({ title }) => `UI Component which represents ${title}`
  },
  {
    type: 'confirm',
    name: 'accept',
    message: 'Continue creating package?'
  }
]

/**
 * Include data into template in __KEY__ places
 *
 * @param {string} input
 * @param {object} data
 * @returns {string}
 */
function passTemplate (input, data = {}) {
  return input.replace(/__([^_]+)__/g, ($0, key) => {
    if (key in data) {
      return data[key]
    }

    return $0
  })
}

/**
 * Procedure to generate packages
 *
 * @returns {Promise}
 */
async function main () {
  // Gather information about package
  const data = await inquirer.prompt(questions)

  // Close script if it's cancelled
  if (!data.accept) {
    process.exit(0)
  }

  // Build package directory path
  const dir = path.join(packages, data.id)

  // Throw error if package already exists
  if (fs.existsSync(dir)) {
    console.log(`Package "${data.id}" already exists.`)
    process.exit(1)
  }

  // Find all files in template which should be put into package
  const templateFiles = glob.sync('**/*', { cwd: template, nodir: true })

  // Iterate over files
  for (const filePath of templateFiles) {
    // Calculate path to source file
    const sourcePath = path.join(template, filePath)

    // Calculate destination path (using variables as well)
    const destinationPath = path.join(dir, passTemplate(filePath, data))

    // Create directory in which file exists
    await mkdir(path.dirname(destinationPath))

    // If file is binary, just copy it - ignore replacing template variables
    if (isBinaryFile.sync(sourcePath)) {
      await copyFile(sourcePath, destinationPath)
      continue
    }

    // Replace contents of file
    const contents = passTemplate(fs.readFileSync(sourcePath, 'utf8'), data)

    // Save file into package directory
    await writeFile(destinationPath, contents)
  }

  // Inform Lerna that it has new package available
  await runLernaCommand('bootstrap', '--hoist')

  // Link all packages as symbolic links instead of copies
  await runLernaCommand('link')
}

// Run generation procedure
main()
