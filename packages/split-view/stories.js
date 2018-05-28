import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import SplitView from './src/SplitView'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Split View', module, {
  propTables: [ SplitView ]
})

// Mock data
const data = [
  { name: 'Josh Smith I', value: 0, title: 'Title 1', subtitle: 'Subtitle 1' },
  { name: 'Josh Smith II', value: 11, title: 'Title 2', subtitle: 'Subtitle 2' },
  { name: 'Josh Smith III', value: 22, title: 'Title 3', subtitle: 'Subtitle 3' },
  { name: 'Josh Smith IV', value: 33, title: 'Title 4', subtitle: 'Subtitle 4' },
  { name: 'Josh Smith V', value: 44, title: 'Title 5', subtitle: 'Subtitle 5' },
  { name: 'Josh Smith VI', value: 55, title: 'Title 6', subtitle: 'Subtitle 6' },
  { name: 'Josh Smith VII', value: 66, title: 'Title 7', subtitle: 'Subtitle 7' },
  { name: 'Josh Smith VIII', value: 88, title: 'Title 8', subtitle: 'Subtitle 8' },
  { name: 'Josh Smith IX', value: 99, title: 'Title 9', subtitle: 'Subtitle 9' },
  { name: 'Josh Smith X', value: 111, title: 'Title 10', subtitle: 'Subtitle 10' }
]

// Render functions
function itemRender (item) {
  return (
    <span>{item.name}</span>
  )
}

function detailsRender (item) {
  return (
    <div>
      <div>Name: {item.name}</div>
      <div>Value: {item.value}</div>
      <div>Title: {item.title}</div>
      <div>Subtitle: {item.subtitle}</div>
    </div>
  )
}

// Stories

addStory('initial', readme, () => (
  <SplitView
    data={data}
    detailsRender={detailsRender}
    itemRender={itemRender}
  />
))
