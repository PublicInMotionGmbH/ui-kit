import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import Tree from './src/Tree'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tree', module, {
  propTables: [ Tree ]
})

const click = action('click')

// Stories

addStory('initial', readme, () => (
  <Tree data={[{id: 1,
    name: 'animal',
    children:
    [{id: 2, name: 'tiger'},
      {id: 3, name: 'cow'}]},
  {id: 4, name: 'people'}]} />
))

addStory('more nesting', readme, () => (
  <Tree data={[{id: 1,
    name: 'animal',
    children:
    [{id: 2,
      name: 'mammals',
      children:
    [{id: 3,
      name: 'tiger',
      children:
    [{id: 4, name: 'white'},
      {id: 5, name: 'orange'}]},
    {id: 6, name: 'cow'}]}]},
  {id: 7, name: 'people'}]} />
))

addStory('initially open', readme, () => (
  <Tree initialOpen data={[{id: 1,
    name: 'animal',
    children:
    [{id: 2,
      name: 'mammals',
      children:
      [{id: 3, name: 'tiger'},
        {id: 4, name: 'cow'}]}]},
  {id: 5, name: 'people'}]} />
))

addStory('select enabled', readme, () => (
  <Tree selectEnabled data={[{id: 1,
    name: 'animal',
    children:
    [{id: 2,
      name: 'mammals',
      children:
    [{id: 3, name: 'tiger'},
      {id: 4, name: 'cow'}]}]},
  {id: 5, name: 'people'}]} />
))

addStory('not smooth animation', readme, () => (
  <Tree smooth={false} data={[{id: 1,
    name: 'animal',
    children:
    [{id: 2,
      name: 'mammals',
      children:
    [{id: 3, name: 'tiger'},
      {id: 4, name: 'cow'}]}]},
  {id: 5, name: 'people'}]} />
))

addStory('onclick', readme, () => (
  <Tree onClick={click} smooth={false} data={[{id: 1,
    name: 'animal',
    children:
    [{id: 2,
      name: 'mammals',
      children:
    [{id: 3, name: 'tiger'},
      {id: 4, name: 'cow'}]}]},
  {id: 5, name: 'people'}]} />
))
