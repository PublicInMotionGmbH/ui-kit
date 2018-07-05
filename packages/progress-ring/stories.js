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

// Render value in constrolled story
const renderValue = (value) => {
  if (isNaN(value) || value < 0) {
    return <Icon name='warning' style={{fontSize: '30px'}} />
  } else if (value >= 1) {
    return <Icon name='done' style={{fontSize: '38px', color: '#fff'}} />
  }
  return `${Math.floor(value * 100)}%`
}

// Stories
addStory('initial', readme, () => (
  <div>
    <ProgressRing value={0.3} styles={{width: '14px', height: '14px'}} />
    <ProgressRing value={0.4} styles={{width: '20px', height: '20px'}} />
    <ProgressRing value={0.5} styles={{width: '25px', height: '25px'}} />
    <ProgressRing value={0.6} styles={{width: '30px', height: '30px'}} />
    <ProgressRing value={0.7} styles={{width: '35px', height: '35px'}} />
    <ProgressRing value={0.8} styles={{width: '40px', height: '40px'}} />
    <ProgressRing value={0.9} styles={{width: '50px', height: '50px'}} />
  </div>
))

addStory('indeterminate', readme, () => (
  <div>
    <ProgressRing styles={{width: '14px', height: '14px'}} />
    <ProgressRing styles={{width: '20px', height: '20px'}} />
    <ProgressRing styles={{width: '25px', height: '25px'}} />
    <ProgressRing styles={{width: '30px', height: '30px'}} />
    <ProgressRing styles={{width: '35px', height: '35px'}} />
    <ProgressRing styles={{width: '40px', height: '40px'}} />
    <ProgressRing styles={{width: '50px', height: '50px'}} />
  </div>
))

addStory('with children and text', readme, () => (
  <div>
    <div style={{fontSize: '17px'}}>
      <ProgressRing value={0.3} styles={{width: '20px', height: '20px', fontSize: '6px'}}>
        30%
      </ProgressRing> Loading data...
    </div>
    <div style={{fontSize: '24px'}}>
      <ProgressRing value={0.3} styles={{fontSize: '10px'}}>
        30%
      </ProgressRing> Loading data...
    </div>
    <div style={{fontSize: '38px'}}>
      <ProgressRing value={0.3} styles={{width: '40px', height: '40px', fontSize: '13px'}}>
        30%
      </ProgressRing> Loading data...
    </div>
    <div style={{fontSize: '48px'}}>
      <ProgressRing value={0.3} styles={{width: '60px', height: '60px', fontSize: '17px'}}>
        30%
      </ProgressRing> Loading data...
    </div>
    <div style={{fontSize: '61px'}}>
      <ProgressRing value={100} styles={{width: '70px', height: '70px', fontSize: '21px'}}>
        {renderValue(100)}
      </ProgressRing> Completed
    </div>
  </div>
))

addStory.controlled('controlled', readme, (setState, state) => (
  <div>
    <h4>Choose value from 0 to 1 or non-digital character</h4>
    <input
      type='text'
      onChange={e => setState({ value: e.target.value })}
      value={state.value}
      style={{
        width: '50px',
        marginRight: '10px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '4px',
        padding: '5px'}}
    />
    <ProgressRing
      value={state.value}
      styles={{width: '70px', height: '70px', fontSize: '21px'}}
    >
      {renderValue(state.value)}
    </ProgressRing>
  </div>
), () => ({ value: 0.4 }))

addStory('different types', readme, () => (
  <div>
    <ProgressRing value={0.4} type='secondary' styles={{width: '60px', height: '60px'}}>40%</ProgressRing>
    <ProgressRing value={0.4} type='tertiary' styles={{width: '60px', height: '60px'}}>40%</ProgressRing>
    <ProgressRing value={0.4} type='success' styles={{width: '60px', height: '60px'}}>40%</ProgressRing>
    <ProgressRing value={0.4} type='error' styles={{width: '60px', height: '60px'}}>40%</ProgressRing>
    <ProgressRing value={0.4} type='info' styles={{width: '60px', height: '60px'}}>40%</ProgressRing>
    <ProgressRing value={0.4} type='warning' styles={{width: '60px', height: '60px'}}>40%</ProgressRing>
  </div>
))
