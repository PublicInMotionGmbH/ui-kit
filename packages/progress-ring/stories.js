import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import ProgressRing from './src/ProgressRing'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Progress ring', module, {
  propTables: [ ProgressRing, Icon ]
})

// Stories
addStory('initial', readme, () => (
  <div>
    <ProgressRing />
    <ProgressRing style={{fontSize: 20}} />
    <ProgressRing style={{fontSize: 25}} />
    <ProgressRing style={{fontSize: 30}} />
    <ProgressRing style={{fontSize: 35}} />
    <ProgressRing style={{fontSize: 40}} />
    <ProgressRing style={{fontSize: 50}} />
  </div>
))

addStory.controlled('controlled with children', readme, (setState, state) => (
  <div style={{ fontSize: 32 }}>
    <div>
      <ProgressRing value={state.value / 100}><Icon name='done' /></ProgressRing>
      {' '}<ProgressRing value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing value={state.value / 100} />
    </div>
    <div>
      <ProgressRing type='success' value={state.value / 100}><Icon name='done' /></ProgressRing>
      {' '}<ProgressRing type='success' value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing type='success' value={state.value / 100} />
    </div>
    <div>
      <ProgressRing type='info' value={state.value / 100}><Icon name='cloud' /></ProgressRing>
      {' '}<ProgressRing type='info' value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing type='info' value={state.value / 100} />
    </div>
    <div>
      <ProgressRing type='warning' value={state.value / 100}><Icon name='priority_high' /></ProgressRing>
      {' '}<ProgressRing type='warning' value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing type='warning' value={state.value / 100} />
    </div>
    <div>
      <ProgressRing type='error' value={state.value / 100}><Icon name='clear' /></ProgressRing>
      {' '}<ProgressRing type='error' value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing type='error' value={state.value / 100} />
    </div>

    <input type='text' value={state.value} onChange={e => setState({ value: e.target.value })} />
  </div>
), () => ({ value: 30 }))

addStory.controlled('inside text', readme, (setState, state) => (
  <div>
    There is already <ProgressRing type='success' value={state.value / 100}>{Math.floor(state.value)}</ProgressRing> percent loaded<br />
    <ProgressRing type='success' value={state.value / 100}><Icon name='done' /></ProgressRing> {Math.floor(state.value)}% loaded<br />
    <ProgressRing type='success' /> Loading data...<br />

    <div style={{ fontSize: 30 }}>
      <ProgressRing type='success' /> Loading data...
    </div>

    <div style={{ fontSize: 40 }}>
      <ProgressRing type='success' /> Loading data...
    </div>

    <div style={{ fontSize: 50 }}>
      <ProgressRing type='success' /> Loading data...
    </div>

    <div style={{ fontSize: 60 }}>
      <ProgressRing type='success' /> Loading data...
    </div>

    <input type='text' value={state.value} onChange={e => setState({ value: e.target.value })} />
  </div>
), () => ({ value: 30 }))
