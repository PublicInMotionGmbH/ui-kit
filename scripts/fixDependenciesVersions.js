const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')
const uniq = require('lodash/uniq')
const compareVersion = require('semver-compare-range')

const getPackages = require('../utils/getPackages')

// TODO: Clean up this script file

function isSorted (object) {
  if (!object) {
    return true
  }

  const keys = Object.keys(object).sort()

  let i = 0
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue
    }

    if (key !== keys[i]) {
      return false
    }

    i++
  }

  return true
}

function sortObject (object) {
  if (!object) {
    return object
  }

  const keys = Object.keys(object).sort()
  const result = {}

  for (const key of keys) {
    result[key] = object[key]
  }

  return result
}

async function main () {
  // Get array of packages to build (if passed through CLI)
  const { only, fix, all, update } = yargs.array('only').boolean('fix').boolean('update').boolean('all').argv

  let needsFixes = false

  // Get all available packages
  const availablePackages = getPackages()

  // Get packages which should be updated
  const packages = getPackages(only)

  // Get list of available versions
  const own = {}
  const map = {}
  const meta = {}

  for (const pkg of availablePackages) {
    own[pkg.name] = pkg.config.version
  }

  const allDependenciesEverywhere = [].concat.apply([], packages.map(pkg => {
    const { dependencies, devDependencies, peerDependencies, optionalDependencies } = pkg.config

    return Object.keys({
      ...dependencies,
      ...devDependencies,
      ...peerDependencies,
      ...optionalDependencies
    })
  }))

  function registerDependency (name, version, owner) {
    if (!map[name]) {
      map[name] = version
      meta[name] = owner
    }

    if (map[name] && compareVersion(map[name], version) === -1) {
      map[name] = version
      meta[name] = owner
    }
  }

  for (const pkg of packages) {
    for (const key in pkg.config.dependencies) {
      registerDependency(key, pkg.config.dependencies[key], pkg.name)
    }

    for (const key in pkg.config.devDependencies) {
      registerDependency(key, pkg.config.devDependencies[key], pkg.name)
    }

    for (const key in pkg.config.optionalDependencies) {
      registerDependency(key, pkg.config.optionalDependencies[key], pkg.name)
    }

    for (const key in pkg.config.peerDependencies) {
      registerDependency(key, pkg.config.peerDependencies[key], pkg.name)
    }
  }

  const maxLength = allDependenciesEverywhere.reduce((a, b) => Math.max(a, b.length), 0) + 3

  for (const pkg of packages) {
    const name = pkg.name
    let hasChanges = false

    const { dependencies, devDependencies, peerDependencies, optionalDependencies } = pkg.config

    const allDependencies = uniq(Object.keys({
      ...dependencies,
      ...devDependencies,
      ...peerDependencies,
      ...optionalDependencies
    }))

    const _ = (name, size, special) => (special ? chalk.bold(name) : name) + ' '.repeat(size - name.length)
    const v = name => _(name == null ? '-' : name, 15)

    let hadHeader = false
    let hadSubheader = false

    const header = () => {
      if (hadHeader) {
        return
      }

      hadHeader = true
      console.log('')
      console.log(chalk.bold(chalk.underline(name)))
    }

    const subheader = () => {
      if (hadSubheader) {
        return
      }

      hadSubheader = true
      console.log(chalk.gray('  ' + chalk.underline(`${_('Name', maxLength)} ${v('Dev')} ${v('Peer')} ${v('Optional')} ${v('Dep')}`)))
    }

    for (const dependency of allDependencies) {
      const dName = dependency
      const dDep = dependencies && dependencies[dName]
      const dDev = devDependencies && devDependencies[dName]
      const dPeer = peerDependencies && peerDependencies[dName]
      const dOptional = optionalDependencies && optionalDependencies[dName]
      const warnings = []

      const versions = uniq([ dDep, dDev, dPeer, dOptional ].filter(Boolean))
      const expectedVersion = own[dName]

      if (expectedVersion) {
        if (versions.length > 1) {
          warnings.push('expected ' + chalk.bold(expectedVersion))
        } else {
          const ver = versions[0].match(/^(\^|~|>=)?(.+)$/)

          if (!ver) {
            warnings.push('invalid version')
          } else {
            if (ver[2] !== expectedVersion) {
              if (ver[1] === '^' && fix) {
                hasChanges = true

                warnings.push('expected ' + chalk.bold(expectedVersion) + chalk.green(' (fixed)'))

                if (dDep) {
                  dependencies[dName] = `^${expectedVersion}`
                }

                if (dDev) {
                  devDependencies[dName] = `^${expectedVersion}`
                }

                if (dPeer) {
                  peerDependencies[dName] = `^${expectedVersion}`
                }

                if (dOptional) {
                  optionalDependencies[dName] = `^${expectedVersion}`
                }
              } else {
                warnings.push('expected ' + chalk.bold(expectedVersion))
              }
            }

            if (ver[1] !== '^') {
              warnings.push('expected ^')
            }
          }
        }
      }

      if (versions.length > 1) {
        warnings.push('versions mismatch')
      } else if (compareVersion(versions[0], map[dName]) === -1) {
        const description = 'newer used (' + chalk.bold(map[dName]) + ' in ' + chalk.bold(meta[dName]) + ')'

        if (update) {
          warnings.push(description + chalk.green(' (fixed)'))

          hasChanges = true
          if (dDep) {
            dependencies[dName] = `${map[dName]}`
          }

          if (dDev) {
            devDependencies[dName] = `${map[dName]}`
          }

          if (dPeer) {
            peerDependencies[dName] = `${map[dName]}`
          }

          if (dOptional) {
            optionalDependencies[dName] = `${map[dName]}`
          }
        } else {
          warnings.push(description)
        }
      }

      if (dDep) {
        if (fix) {
          warnings.push('regular dependency' + chalk.green(' (fixed)'))
          hasChanges = true
          devDependencies[dName] = dependencies[dName]
          peerDependencies[dName] = dependencies[dName]
          delete dependencies[dName]
        } else {
          warnings.push('regular dependency')
        }
      }

      if (dPeer && !dDev) {
        if (fix) {
          warnings.push('peer missing in dev' + chalk.green(' (fixed)'))
          hasChanges = true
          devDependencies[dName] = peerDependencies[dName]
        } else {
          warnings.push('peer missing in dev')
        }
      }

      if (hasChanges) {
        needsFixes = true
      }

      if (!all && !warnings.length) {
        continue
      }

      header()
      subheader()

      if (warnings.length) {
        console.log(`  ${chalk.yellow(_(dName, maxLength, own[dName]))} ${v(dDev)} ${v(dPeer)} ${v(dOptional)} ${v(dDep)}${chalk.yellow(warnings.join(', '))}`)
      } else {
        console.log(`  ${_(dName, maxLength, own[dName])} ${v(dDev)} ${v(dPeer)} ${v(dOptional)} ${v(dDep)}`)
      }
    }

    // Try to sort dependencies
    const sorted = (
      isSorted(pkg.config.dependencies) &&
      isSorted(pkg.config.devDependencies) &&
      isSorted(pkg.config.peerDependencies) &&
      isSorted(pkg.config.optionalDependencies)
    )

    if (!sorted) {
      header()

      if (fix) {
        console.log(chalk.green('  Sorted dependencies!'))
        hasChanges = true
        pkg.config.dependencies = sortObject(pkg.config.dependencies)
        pkg.config.devDependencies = sortObject(pkg.config.devDependencies)
        pkg.config.peerDependencies = sortObject(pkg.config.peerDependencies)
        pkg.config.optionalDependencies = sortObject(pkg.config.optionalDependencies)
      } else {
        console.log(chalk.yellow('  Dependencies should be sorted!'))
      }
    }

    if (hasChanges) {
      needsFixes = true

      if (fix) {
        fs.writeFileSync(pkg.configPath, JSON.stringify(pkg.config, null, 2) + '\n')
      }
    }
  }

  if (needsFixes) {
    process.exit(1)
  }
}

// Run procedure
main().catch(err => setTimeout(() => { throw err }))
