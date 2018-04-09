import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ProgressBar from './src/ProgressBar'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Progress Bar', module, {
  propTypes: [ ProgressBar ]
})

// Stories

const margin = { marginTop: 10, marginBottom: 10 }

addStory('basic', readme, () => (
  <div>
    <h2>30% progress</h2>

    <ProgressBar style={margin} value={0.3} />
    <ProgressBar style={margin} value={0.3} type='error' />
    <ProgressBar style={margin} value={0.3} type='warning' />
    <ProgressBar style={margin} value={0.3} type='success' />
    <ProgressBar style={margin} value={0.3} type='info' />

    <h2>Progress with stripes</h2>

    <ProgressBar style={margin} value={0.5} striped />
    <ProgressBar style={margin} value={0.5} type='error' striped />
    <ProgressBar style={margin} value={0.5} type='warning' striped />
    <ProgressBar style={margin} value={0.5} type='success' striped />
    <ProgressBar style={margin} value={0.5} type='info' striped />

    <h2>Full progress</h2>

    <ProgressBar style={margin} value={1} />
    <ProgressBar style={margin} value={1} type='error' />
    <ProgressBar style={margin} value={1} type='warning' />
    <ProgressBar style={margin} value={1} type='success' />
    <ProgressBar style={margin} value={1} type='info' />

    <h2>Unknown progress</h2>

    <ProgressBar style={margin} />
    <ProgressBar style={margin} type='error' />
    <ProgressBar style={margin} type='warning' />
    <ProgressBar style={margin} type='success' />
    <ProgressBar style={margin} type='info' />
  </div>
))

addStory('small', readme, () => (
  <div>
    <h2>30% progress</h2>

    <ProgressBar style={margin} value={0.3} size='small' />
    <ProgressBar style={margin} value={0.3} type='error' size='small' />
    <ProgressBar style={margin} value={0.3} type='warning' size='small' />
    <ProgressBar style={margin} value={0.3} type='success' size='small' />
    <ProgressBar style={margin} value={0.3} type='info' size='small' />

    <h2>Progress with stripes</h2>

    <ProgressBar style={margin} value={0.5} striped size='small' />
    <ProgressBar style={margin} value={0.5} type='error' striped size='small' />
    <ProgressBar style={margin} value={0.5} type='warning' striped size='small' />
    <ProgressBar style={margin} value={0.5} type='success' striped size='small' />
    <ProgressBar style={margin} value={0.5} type='info' striped size='small' />

    <h2>Full progress</h2>

    <ProgressBar style={margin} value={1} size='small' />
    <ProgressBar style={margin} value={1} type='error' size='small' />
    <ProgressBar style={margin} value={1} type='warning' size='small' />
    <ProgressBar style={margin} value={1} type='success' size='small' />
    <ProgressBar style={margin} value={1} type='info' size='small' />

    <h2>Unknown progress</h2>

    <ProgressBar style={margin} size='small' />
    <ProgressBar style={margin} type='error' size='small' />
    <ProgressBar style={margin} type='warning' size='small' />
    <ProgressBar style={margin} type='success' size='small' />
    <ProgressBar style={margin} type='info' size='small' />
  </div>
))

function getInitialState () {
  return {
    value: 0.1
  }
}

const style = { width: 150, marginLeft: 1, marginRight: 1 }
const divider = { display: 'inline-block', width: 20 }

addStory.controlled('controlled', readme, (setState, state) => {
  const change = delta => () => setState({ value: Math.max(0, Math.min(1, state.value + delta)) })

  return (
    <div>
      <ProgressBar style={margin} value={state.value} />
      <ProgressBar style={margin} value={state.value} type='error' />

      <div style={{ textAlign: 'center' }}>
        <button type='button' style={style} onClick={change(-1)}>Restart</button>
        <button type='button' style={style} onClick={change(-0.5)}>Decrease 50%</button>
        <button type='button' style={style} onClick={change(-0.2)}>Decrease 20%</button>
        <button type='button' style={style} onClick={change(-0.05)}>Decrease 5%</button>
        <span style={divider} />
        <button type='button' style={style} onClick={change(0.05)}>Increase 5%</button>
        <button type='button' style={style} onClick={change(0.2)}>Increase 20%</button>
        <button type='button' style={style} onClick={change(0.5)}>Increase 50%</button>
        <button type='button' style={style} onClick={change(1)}>Finish</button>
      </div>
    </div>
  )
}, getInitialState)
