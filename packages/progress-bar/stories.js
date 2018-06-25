import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import ProgressBar from './src/ProgressBar'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Progress Bar', module, {
  propTables: [ ProgressBar ]
})

// Stories

const margin = { marginTop: 10, marginBottom: 10 }

addStory('basic', readme, () => (
  <div>
    <h2>30% progress</h2>

    <ProgressBar style={margin} value={0.3} />
    <ProgressBar style={margin} value={0.3} type='secondary' />
    <ProgressBar style={margin} value={0.3} type='tertiary' />
    <ProgressBar style={margin} value={0.3} type='error' />
    <ProgressBar style={margin} value={0.3} type='warning' />
    <ProgressBar style={margin} value={0.3} type='success' />
    <ProgressBar style={margin} value={0.3} type='info' />

    <h2>Progress with stripes</h2>

    <ProgressBar style={margin} value={0.5} striped />
    <ProgressBar style={margin} value={0.5} type='secondary' striped />
    <ProgressBar style={margin} value={0.5} type='tertiary' striped />
    <ProgressBar style={margin} value={0.5} type='error' striped />
    <ProgressBar style={margin} value={0.5} type='warning' striped />
    <ProgressBar style={margin} value={0.5} type='success' striped />
    <ProgressBar style={margin} value={0.5} type='info' striped />

    <h2>Full progress</h2>

    <ProgressBar style={margin} value={1} />
    <ProgressBar style={margin} value={1} type='secondary' />
    <ProgressBar style={margin} value={1} type='tertiary' />
    <ProgressBar style={margin} value={1} type='error' />
    <ProgressBar style={margin} value={1} type='warning' />
    <ProgressBar style={margin} value={1} type='success' />
    <ProgressBar style={margin} value={1} type='info' />

    <h2>Unknown progress</h2>

    <ProgressBar style={margin} />
    <ProgressBar style={margin} type='secondary' />
    <ProgressBar style={margin} type='tertiary' />
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

addStory('with label', readme, () => (
  <div>
    <h2>2.5% progress</h2>

    <ProgressBar style={margin} value={0.025}>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.025} type='secondary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.025} type='tertiary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.025} type='error'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.025} type='warning'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.025} type='success'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.025} type='info'>Loading books...</ProgressBar>

    <h2>30% progress</h2>

    <ProgressBar style={margin} value={0.3}>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='secondary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='tertiary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='error'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='warning'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='success'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='info'>Loading books...</ProgressBar>

    <h2>Label with icons</h2>

    <ProgressBar style={margin} value={0.3}><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='secondary'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='tertiary'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='error'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='warning'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='success'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} type='info'><Icon name='settings' /> Loading books...</ProgressBar>

    <h2>Small progress bars</h2>

    <ProgressBar style={margin} value={0.3} size='small'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} size='small' type='secondary'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} size='small' type='tertiary'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} size='small' type='error'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} size='small' type='warning'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} size='small' type='success'><Icon name='settings' /> Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.3} size='small' type='info'><Icon name='settings' /> Loading books...</ProgressBar>

    <h2>Progress with stripes</h2>

    <ProgressBar style={margin} value={0.5} striped>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.5} type='secondary' striped>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.5} type='tertiary' striped>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.5} type='error' striped>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.5} type='warning' striped>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.5} type='success' striped>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={0.5} type='info' striped>Loading books...</ProgressBar>

    <h2>Full progress</h2>

    <ProgressBar style={margin} value={1}>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={1} type='secondary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={1} type='tertiary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={1} type='error'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={1} type='warning'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={1} type='success'>Loading books...</ProgressBar>
    <ProgressBar style={margin} value={1} type='info'>Loading books...</ProgressBar>

    <h2>Unknown progress</h2>

    <ProgressBar style={margin}>Loading books...</ProgressBar>
    <ProgressBar style={margin} type='secondary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} type='tertiary'>Loading books...</ProgressBar>
    <ProgressBar style={margin} type='error'>Loading books...</ProgressBar>
    <ProgressBar style={margin} type='warning'>Loading books...</ProgressBar>
    <ProgressBar style={margin} type='success'>Loading books...</ProgressBar>
    <ProgressBar style={margin} type='info'>Loading books...</ProgressBar>
  </div>
))

function getInitialState () {
  return {
    value: 0.1
  }
}

const style = { width: 130, marginLeft: 1, marginRight: 1 }
const divider = { display: 'inline-block', width: 20 }

addStory.controlled('controlled', readme, (setState, state) => {
  const change = delta => () => setState({ value: Math.max(0, Math.min(1, state.value + delta)) })

  return (
    <div>
      <ProgressBar style={margin} value={state.value} />
      <ProgressBar style={margin} value={state.value}>
        Loading books, {Math.round(state.value * 100)}%...
      </ProgressBar>
      <ProgressBar style={margin} value={state.value} type='error'>
        Loading books, {Math.round(state.value * 100)}%...
      </ProgressBar>

      <div style={{ textAlign: 'center' }}>
        <button type='button' style={style} onClick={change(-1)}>Restart</button>
        <button type='button' style={style} onClick={change(-0.25)}>Decrease 25%</button>
        <button type='button' style={style} onClick={change(-0.05)}>Decrease 5%</button>
        <button type='button' style={style} onClick={change(-0.01)}>Decrease 1%</button>
        <button type='button' style={style} onClick={change(-0.005)}>Decrease 0.5%</button>
        <span style={divider} />
        <button type='button' style={style} onClick={change(0.005)}>Increase 0.5%</button>
        <button type='button' style={style} onClick={change(0.01)}>Increase 1%</button>
        <button type='button' style={style} onClick={change(0.05)}>Increase 5%</button>
        <button type='button' style={style} onClick={change(0.25)}>Increase 25%</button>
        <button type='button' style={style} onClick={change(1)}>Finish</button>
      </div>
    </div>
  )
}, getInitialState)
