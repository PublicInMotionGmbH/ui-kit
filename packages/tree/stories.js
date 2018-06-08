import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import { Icon } from '@talixo/icon'
import Tree from './src/Tree'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tree', module, {
  propTables: [ Tree ]
})

const click = action('click')

const data = [{id: 1,
  name: 'animal',
  children:
  [{id: 2,
    name: 'mammals',
    children:
    [{id: 3, name: 'tiger'},
      {id: 4, name: 'cow'}]}]},
{id: 5, name: 'people'}]

// Stories

addStory('initial', readme, () => (
  <Tree data={[{id: 1,
    name: 'animal',
    children:
    [{id: 2, name: 'tiger'},
      {id: 3, name: 'cow'}]},
  {id: 4, name: 'people'}]} />
))

addStory('more nested', readme, () => (
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
  <Tree initiallyOpen data={data} />
))

addStory('select enabled', readme, () => (
  <Tree onClick={() => {}} data={data} />
))

addStory('not smooth animation', readme, () => (
  <Tree smooth={false} data={data} />
))

addStory('onclick', readme, () => (
  <Tree onClick={click} data={data} />
))

addStory('with custom nodes', readme, () => (
  <Tree data={[{id: 1,
    render: node => <span><Icon name='pets' /> {node}</span>,
    name: 'animal',
    children:
    [{id: 2, name: 'tiger'},
      {id: 3, name: 'cow'}]},
  {id: 4,
    render: node => <span><Icon name='person' /> {node}</span>,
    name: 'people'}]} />
))
