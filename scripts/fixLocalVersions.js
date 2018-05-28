const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')
const runCommand = require('./runCommand')

const getPackages = require('../utils/getPackages')

// TODO: Clean up this script file

async function getNewestPackageVersion (name) {
  try {
    const versions = JSON.parse(await runCommand.silent('npm', 'view', name, 'versions', '--json'))

    return versions.slice(-1)[0]
  } catch (e) {
    return '0.0.0'
  }
}

async function main () {
  // Get array of packages to build (if passed through CLI)
  const { only, fix, all } = yargs.array('only').boolean('fix').boolean('all').argv

  let needsFixes = false

  // Get packages which should be updated
  const packages = getPackages(only)

  const maxLength = packages.reduce((a, b) => Math.max(a, b.name.length), 0)

  packages.forEach(async pkg => {
    const name = pkg.name
    const version = pkg.config.version
    const visibleName = ' '.repeat(maxLength - name.length) + name

    const newest = await getNewestPackageVersion(name)

    if (newest === version) {
      if (all) {
        console.log(chalk.bold(visibleName), ' ', version)
      }
      return
    }

    console.log(chalk.bold(visibleName), ' ', chalk.red(version), chalk.green(newest))

    needsFixes = true

    if (!fix) {
      return
    }

    const json = JSON.parse(fs.readFileSync(pkg.configPath, 'utf8'))
    json.version = newest
    fs.writeFileSync(pkg.configPath, JSON.stringify(json, null, 2) + '\n')
  })

  if (needsFixes) {
    process.exit(1)
  }
}

// Run procedure
main().catch(err => setTimeout(() => { throw err }))
