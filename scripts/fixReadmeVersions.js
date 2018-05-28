const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')

const getPackages = require('../utils/getPackages')

// TODO: Clean up this script file

async function main () {
  // Get array of packages to build (if passed through CLI)
  const { only, fix, all } = yargs.array('only').boolean('fix').boolean('all').argv

  // Get packages which should be updated
  const packages = getPackages(only)

  const maxLength = packages.reduce((a, b) => Math.max(a, b.name.length), 0)

  let needsFixes = false

  for (const pkg of packages) {
    const name = pkg.name
    const visibleName = ' '.repeat(maxLength - name.length) + name
    const header = chalk.bold(visibleName) + '  '
    const space = ' '.repeat(visibleName.length + 2)

    if (!fs.existsSync(pkg.readmePath)) {
      console.log(header, chalk.yellow('README.md file doesn\'t exists'))
      continue
    }

    const readme = fs.readFileSync(pkg.readmePath, 'utf8')
    const regexList = /(?:(\n(.+?)(?:@[a-z0-9-]+\/)?[a-z0-9-.]+)(.+?)([\^~>=]?[0-9]+\.[0-9]+\.[0-9]+)(.+?))+/g
    const regexDependencies = /\n(.+?)((?:@[a-z0-9-]+\/)?[a-z0-9-.]+)(.+?)([\^~>=]?[0-9]+\.[0-9]+\.[0-9]+)(.+?)/g
    const regexDependency = /\n(.+?)((?:@[a-z0-9-]+\/)?[a-z0-9-.]+)(.+?)([\^~>=]?[0-9]+\.[0-9]+\.[0-9]+)(.+?)/

    const match = readme.match(regexList)

    if (!match) {
      console.log(header, chalk.yellow('Dependencies not found in README file'))
    } else if (match.length > 1) {
      console.log(header, chalk.yellow('More than one dependency blocks'))
    } else {
      const _dependencies = match[0].match(regexDependencies)
      const dependencies = _dependencies.map(_ => _.match(regexDependency)).map(_ => ({
        prefix: _[1],
        name: _[2],
        middle: _[3],
        version: _[4],
        suffix: _[5]
      }))

      const expectedDependencies = pkg.config.peerDependencies || {}
      const existingDependencies = dependencies.map(_ => _.name)
      const lines = []

      const maxDependencyLength = dependencies.map(_ => _.name).concat(Object.keys(expectedDependencies)).reduce((max, _) => Math.max(max, _.length), 0)

      for (const dependency of dependencies) {
        const between = ' '.repeat(maxDependencyLength - dependency.name.length)

        if (expectedDependencies[dependency.name] && expectedDependencies[dependency.name] !== dependency.version) {
          needsFixes = true
          lines.push(
            `${chalk.bold(dependency.name)}: ${between} ${chalk.red(dependency.version)} ${chalk.green(expectedDependencies[dependency.name])}`
          )
        } else if (!expectedDependencies[dependency.name]) {
          needsFixes = true
          lines.push(chalk.red(`${chalk.bold(dependency.name)}: ${between} ${dependency.version}`))
        } else if (all) {
          lines.push(`${chalk.bold(dependency.name)}:${between}${dependency.version}`)
        }
      }

      for (const dependency of Object.keys(expectedDependencies).filter(x => existingDependencies.indexOf(x) === -1)) {
        needsFixes = true
        const between = ' '.repeat(maxDependencyLength - dependency.length)
        lines.push(chalk.green(`${chalk.green(chalk.bold(dependency))}: ${between} ${expectedDependencies[dependency]}`))
      }

      if (lines.length) {
        if (fix) {
          console.log(header, chalk.underline('Found ' + _dependencies.length + ' dependencies'), chalk.green(' (fixed)'))
        } else {
          console.log(header, chalk.underline('Found ' + _dependencies.length + ' dependencies'))
        }

        for (const line of lines) {
          console.log(space, line)
        }
      }

      if (!fix) {
        continue
      }

      const prefix = dependencies[0] ? dependencies[0].prefix : '- `'
      const middle = dependencies[0] ? dependencies[0].middle : ': '
      const suffix = dependencies[0] ? dependencies[0].suffix : '`'

      const options = '\n' + Object.keys(expectedDependencies)
        .map(name => `${prefix}${name}${middle}${expectedDependencies[name]}${suffix}`)
        .join('\n')

      fs.writeFileSync(pkg.readmePath, readme.replace(regexList, options))
    }
  }

  if (needsFixes) {
    process.exit(1)
  }
}

// Run procedure
main().catch(err => setTimeout(() => { throw err }))
