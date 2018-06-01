import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Tree from './src/Tree'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tree', module, {
  propTables: [ Tree ]
})

// Stories

addStory('initial', readme, () => (
  <Tree data={[{id: 1, name: 'animal', children: [{id: 2, name: 'tiger'}, {id: 3, name: 'cow'}]}, {id: 4, name: 'people'}]} />
))

addStory('more nesting', readme, () => (
  <Tree data={[{id: 1,
    name: 'animal',
    children:
    [{id: 5, name: 'mammals', children: [{id: 2, name: 'tiger'}, {id: 3, name: 'cow'}]}]}, {id: 4, name: 'people'}]} />
))

addStory('initialOpen', readme, () => (
  <Tree initialOpen data={[{id: 1,
    name: 'animal',
    children:
    [{id: 5, name: 'mammals', children: [{id: 2, name: 'tiger'}, {id: 3, name: 'cow'}]}]}, {id: 4, name: 'people'}]} />
))

addStory('selectEnabled', readme, () => (
  <Tree selectEnabled data={[{id: 1,
    name: 'animal',
    children:
    [{id: 5, name: 'mammals', children: [{id: 2, name: 'tiger'}, {id: 3, name: 'cow'}]}]}, {id: 4, name: 'people'}]} />
))
