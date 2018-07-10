const fs = require('fs')
const path = require('path')
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
  const props = yargs.array('only').string('tag').string('release').string('identifier').argv
  const { only, tag, identifier, release } = props
  const list = []

  if (!release) {
    throw new Error('\'Release\' parameter is required!')
  }

  const builtVersion = release + '-' + (tag ? tag + (identifier ? '.' + identifier : '') : '')

  // Get packages which should be updated
  const packages = getPackages(only)

  const maxLength = packages.reduce((a, b) => Math.max(a, b.name.length), 0)

  await Promise.all(packages.map(async pkg => {
    const name = pkg.name
    const pkgVersion = pkg.config.version
    const visibleName = ' '.repeat(maxLength - name.length) + name

    const newest = await getNewestPackageVersion(name)

    if (newest === pkgVersion) {
      console.log(chalk.bold(visibleName), ' ', pkgVersion)
      return
    }

    console.log(chalk.bold(visibleName), ' ', chalk.red(pkgVersion), chalk.green(newest))

    if (builtVersion !== pkgVersion) {
      throw new Error('Package "' + name + '" expects version "' + pkgVersion + '" but get "' + builtVersion + '"!')
    }

    list.push(name)
  }))

  let file = '#!/bin/bash\n\nset -e\n\n'

  file += list
    .map(name => `lerna publish --force-publish=${name} --skip-git --scope=${name} --repo-version=${builtVersion} --preid=${tag} --npm-tag=${tag}`)
    .join('\n')

  file += '\n'

  fs.writeFileSync(path.join(__dirname, '../publish.sh'), file)
}

// Run procedure
main().catch(err => setTimeout(() => { throw err }))
