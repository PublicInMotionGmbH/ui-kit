const fs = require('fs-extra')
const path = require('path')
const utils = require('./utils')

// Load custom icons
const customIcons = require('@talixo/icon-pack').icons

// Set up configuration paths
const metaPath = path.join(__dirname, '../meta')
const codepointsMetaPath = path.join(metaPath, 'codepoints.json')
const overviewMetaPath = path.join(metaPath, 'overview.json')

// Set up cache paths
const cachePath = path.join(__dirname, '../cache')
const iconsPath = path.join(cachePath, 'material.zip')
const codepointsPath = path.join(cachePath, 'codepoints.txt')

// Set up URLs
const iconsUrl = 'http://github.com/google/material-design-icons/archive/master.zip'
const codepointsUrl = 'https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/codepoints'

function readCodepoints (codepointsPath) {
  const file = fs.readFileSync(codepointsPath, 'utf8')
  const entries = file.split('\n').filter(x => x).map(x => x.split(' '))

  return entries.map(entry => ({
    name: entry[0],
    character: JSON.parse('"\\u' + entry[1] + '"')
  }))
}

function buildCodepointsMap (iconsList) {
  const map = {}

  for (const icon of iconsList) {
    map[icon.name] = icon.character
  }

  return map
}

function buildOverview (iconsMap) {
  const overview = {
    custom: customIcons
  }

  for (const name of Object.keys(iconsMap)) {
    const icon = iconsMap[name]

    for (const type of icon.types) {
      if (!overview[type]) {
        overview[type] = []
      }

      overview[type].push(icon.name)
    }
  }

  return overview
}

async function main () {
  // Download icon code points
  await utils.download('codepoints', codepointsUrl, codepointsPath)

  // Gather icons list by codepoints
  const iconsList = readCodepoints(codepointsPath)
  const iconsAmount = iconsList.length

  // Create map for icons with additional metadata
  const icons = {}

  // Download all icons
  await utils.download('icons     ', iconsUrl, iconsPath)

  // Create progress bar for analyzing icons
  const progress = utils.createProgressBar('Finding icons         ', iconsAmount)

  // Initialize number of ignored icons from repository
  const ignored = {}

  // Analyze icons in archive
  await utils.analyzeArchiveEntries(iconsPath, entry => {
    // Get icon details about current entry
    const icon = utils.getIconInfo(entry.path)

    // Ignore file if it's not icon or it's already analyzed
    if (icon === null) {
      return
    }

    if (icons[icon.name]) {
      // Add missing types for icon
      const newTypes = icon.types.filter(type => icons[icon.name].types.indexOf(type) === -1)
      icons[icon.name].types = icons[icon.name].types.concat(newTypes)

      return
    }

    if (!iconsList.find(x => x.name === icon.name)) {
      ignored[icon.name] = icon
      return
    }

    // Save information about icon
    icons[icon.name] = icon

    // Create progress bar for icons analysis
    progress.update(Object.keys(icons).length / iconsAmount)
  })

  const ignoredAmount = Object.keys(ignored).length

  // Write information about icons found
  console.log(`Found icons            ${iconsAmount} icons (+ ${ignoredAmount} ignored)`)

  // Build code points for material icons
  await utils.saveJson(codepointsMetaPath, buildCodepointsMap(iconsList))

  // Build information for Storybook about grouped icons
  await utils.saveJson(overviewMetaPath, buildOverview(icons))

  // Show information to user about success
  console.log('\nSuccessfully loaded Material Design icons!')
}

main()

function cleanUp () {
  utils.removeFile(iconsPath)
  utils.removeFile(codepointsPath)
}

// Clean up cache files when process is finished
process.on('exit', cleanUp)
