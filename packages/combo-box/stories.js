import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'
import { CountryFlag } from '@talixo/country-flag'
import { ProgressRing } from '@talixo/progress-ring'

import SelectBox from './src/SelectBox'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Combo box', module, {
  propTables: [ SelectBox ]
})

// Build options to use in stories

const optionsSimple = [
  'Skipper',
  'Private',
  'Kowalski',
  'Rico'
]

const options = [
  { id: 'pl', name: 'Poland', language: 'Polish' },
  { id: 'gb', name: 'Great Britain', language: 'English' },
  { id: 'de', name: 'Germany', language: 'Deutsch' },
  { id: 'ru', name: 'Russia', language: 'Russian' },
  { id: 'be', name: 'Belgium', language: 'Deutsch' },
  { id: 'ca', name: 'Canada', language: 'English, French' },
  { id: 'fr', name: 'France', language: 'French' },
  { id: 'cz', name: 'Czech Republic', language: 'Czech' },
  { id: 'au', name: 'Australia', language: 'English' },
  { id: 'cn', name: 'China', language: 'Chinese' },
  { id: 'it', name: 'Italy', language: 'Italian' },
  { id: 'sk', name: 'Slovakia', language: 'Slovak' }
]

// Stories

addStory.controlled('simple select box', readme, (setState, state) => (
  <div>
    <div>Selected value: {state.value}</div>
    <SelectBox
      placeholder='Select item...'
      value={state.value}
      onChange={value => setState({ value })}
      options={optionsSimple}
    />
  </div>
), () => ({ value: null }))

addStory.controlled('multi select box', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      multi
      placeholder='Select items...'
      value={state.value}
      onChange={value => setState({ value })}
      options={optionsSimple}
    />
  </div>
), () => ({ value: [] }))

function renderCountry (x) {
  return (
    <div style={{ display: 'flex', lineHeight: '1em' }}>
      <CountryFlag code={x.id} style={{ marginRight: 10, marginLeft: 10 }} />
      <div>
        <strong>{x.name}</strong><br />
        <div style={{ color: '#999', fontSize: '0.8em' }}>{x.language}</div>
      </div>
    </div>
  )
}

function renderSimpleCountry (x) {
  return (
    <div style={{ display: 'flex', lineHeight: '1em' }}>
      <CountryFlag code={x.id} style={{ marginRight: 10, marginLeft: 10, boxShadow: '0 0 10px 2px rgba(0, 0, 0, .1)' }} />
      {x.name}
    </div>
  )
}

addStory.controlled('special select box', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      placeholder='Select item...'
      value={state.value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
), () => ({ value: null }))

addStory.controlled('warning select box', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      placeholder='Select item...'
      icon={<Icon name='warning' style={{ fontSize: 15, color: 'gold' }} />}
      value={state.value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
), () => ({ value: null }))

addStory.controlled('loading select box', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      placeholder='Select item...'
      icon={<ProgressRing type='error' />}
      value={state.value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
), () => ({ value: null }))

addStory.controlled('special multi select box', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      multi
      placeholder='Select items...'
      value={state.value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
), () => ({ value: [] }))

addStory.controlled('RTL: multi select box', readme, (setState, state) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      multi
      placeholder='בחר פריטים'
      value={state.value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
), () => ({ value: [] }))

addStory.controlled('RTL: select box', readme, (setState, state) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      placeholder='בחר פריט'
      icon={<ProgressRing type='error' />}
      value={state.value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
), () => ({ value: [] }))
