import React from 'react'

import Pill from './src/Pill'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Pill', module)

addStory('blue', readme, () => (
  <div style={{ padding: '3em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Pill color='blue'>Hello Pill</Pill>
  </div>
))
addStory('gray', readme, () => (
  <div style={{ padding: '3em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Pill color='gray'>Hello Pill</Pill>
  </div>
))
addStory('green', readme, () => (
  <div style={{ padding: '3em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Pill color='green'>Hello Pill</Pill>
  </div>
))
addStory('red', readme, () => (
  <div style={{ padding: '3em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Pill color='red'>Hello Pill</Pill>
  </div>
))
addStory('yellow', readme, () => (
  <div style={{ padding: '3em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Pill color='yellow'>Hello Pill</Pill>
  </div>
))
addStory('ghost/red', readme, () => (
  <div style={{ padding: '3em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Pill variant='ghost' color='red'>
      Hello Pill
    </Pill>
  </div>
))
addStory('red with style prop set to padding: 20px', readme, () => (
  <div style={{ padding: '3em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Pill color='red' style={{ padding: '20px' }}>
      Hello Pill
    </Pill>
  </div>
))
