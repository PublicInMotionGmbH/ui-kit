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
    <ProgressRing style={{ fontSize: 20 }} />
    <ProgressRing style={{ fontSize: 25 }} />
    <ProgressRing style={{ fontSize: 30 }} />
    <ProgressRing style={{ fontSize: 35 }} />
    <ProgressRing style={{ fontSize: 40 }} />
    <ProgressRing style={{ fontSize: 50 }} />
  </div>
))

addStory.controlled('controlled with children', readme, (setState, state) => (
  <div style={{ fontSize: 30 }}>
    <div>
      <ProgressRing value={state.value / 100}><Icon name='done' /></ProgressRing>
      {' '}<ProgressRing value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing value={state.value / 100} />
    </div>
    <div>
      <ProgressRing type='secondary' value={state.value / 100}><Icon name='done' /></ProgressRing>
      {' '}<ProgressRing type='secondary' value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing type='secondary' value={state.value / 100} />
    </div>
    <div>
      <ProgressRing type='tertiary' value={state.value / 100}><Icon name='done' /></ProgressRing>
      {' '}<ProgressRing type='tertiary' value={state.value / 100}>{Math.floor(state.value)}</ProgressRing>
      {' '}<ProgressRing type='tertiary' value={state.value / 100} />
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
    There is already <ProgressRing value={state.value / 100}>{Math.floor(state.value)}</ProgressRing> percent loaded<br />
    <ProgressRing value={state.value / 100}><Icon name='done' /></ProgressRing> {Math.floor(state.value)}% loaded<br />
    <ProgressRing /> Loading data...<br />

    <div style={{ fontSize: 30 }}>
      <ProgressRing /> Loading data...
    </div>

    <div style={{ fontSize: 40 }}>
      <ProgressRing /> Loading data...
    </div>

    <div style={{ fontSize: 50 }}>
      <ProgressRing /> Loading data...
    </div>

    <div style={{ fontSize: 60 }}>
      <ProgressRing /> Loading data...
    </div>

    <div style={{ fontSize: 30 }}>
      <ProgressRing><Icon name='done' /></ProgressRing> Loading data...
    </div>

    <div style={{ fontSize: 40 }}>
      <ProgressRing><Icon name='done' /></ProgressRing> Loading data...
    </div>

    <div style={{ fontSize: 50 }}>
      <ProgressRing><Icon name='done' /></ProgressRing> Loading data...
    </div>

    <div style={{ fontSize: 60 }}>
      <ProgressRing><Icon name='done' /></ProgressRing> Loading data...
    </div>

    <input type='text' value={state.value} onChange={e => setState({ value: e.target.value })} />
  </div>
), () => ({ value: 30 }))
