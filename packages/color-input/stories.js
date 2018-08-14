import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ColorInput from './src/ColorInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('ColorInput', module, {
  propTables: [ ColorInput ]
})

const palette = [
  {
    id: 'red1',
    name: 'awesome-red',
    color: '#f00'
  },
  {
    id: 'blue2',
    name: 'fantastic-blue',
    color: '#0004d0'
  },
  {
    id: 'green3',
    name: 'fresh-green',
    color: '#00c41c'
  },
  {
    id: 'gold4',
    name: 'luxury-gold',
    color: '#d7b10c'
  },
  {
    id: 'violet5',
    name: 'elegant-violet',
    color: 'hsl(278,100%,50%)'
  },
  {
    id: 'cyan6',
    name: 'future-cyan',
    color: 'rgb(1, 217, 200)'
  },
  {
    id: 'orange7',
    name: 'fruity-yellow',
    color: 'rgb(224, 223, 0)'
  },
  {
    id: 'black8',
    name: 'dark-black',
    color: 'rgb(2, 0, 5)'
  }
]

// Stories

addStory('initial', readme, () => (
  <ColorInput />
))

addStory('with set default color', readme, () => (
  <ColorInput defaultColor='#ff0000' />
))

addStory('with alpha channel', readme, () => (
  <ColorInput alpha />
))

addStory('with HSL manipulation', readme, () => (
  <ColorInput hsl />
))

addStory('with palette of colors', readme, () => (
  <ColorInput palette={palette} />
))

addStory('full version', readme, () => (
  <ColorInput alpha hsl palette={palette} />
))

addStory('rgb as output format', readme, () => (
  <ColorInput outputFormat='rgb' alpha hsl palette={palette} />
))

addStory('hex as output format', readme, () => (
  <ColorInput outputFormat='hex' alpha hsl palette={palette} />
))

addStory('hsl as output format', readme, () => (
  <ColorInput outputFormat='hsl' alpha hsl palette={palette} defaultColor='hsl(0, 100%, 50%)' />
))
