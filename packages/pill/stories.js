import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Pill from './src/Pill'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Pill', module, {
  propTables: [ Pill ]
})

addStory('all pills', readme, () => (
  <div>
    <h2>Standard Pills</h2>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Pill>Default Pill</Pill>
      <Pill color='blue'>Blue Pill</Pill>
      <Pill color='gray'>Gray Pill</Pill>
      <Pill color='green'>Green Pill</Pill>
      <Pill color='red'>Red Pill</Pill>
      <Pill color='yellow'>Yellow Pill</Pill>
    </div>

    <h2>Ghost Pills</h2>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Pill variant='ghost'>Default Ghost Pill</Pill>
      <Pill color='blue' variant='ghost'>Blue Ghost Pill</Pill>
      <Pill color='gray' variant='ghost'>Gray Ghost Pill</Pill>
      <Pill color='green' variant='ghost'>Green Ghost Pill</Pill>
      <Pill variant='ghost' color='red'>Red Ghost Pill</Pill>
      <Pill color='yellow' variant='ghost'>Yellow Ghost Pill</Pill>
    </div>
  </div>
))
