import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import { Icon } from '@talixo/icon'
import { CountryFlag } from '@talixo/country-flag'
import { ProgressRing } from '@talixo/progress-ring'
import { TextInput } from '@talixo/text-input'

import SelectBox from './src/SelectBox'
import ComboBox from './src/ComboBox'
import AutoComplete from './src/AutoComplete'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Combo box', module, {
  propTables: [ ComboBox, SelectBox ]
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

addStory('simple select box', readme, ({ value = null }, setState) => (
  <div>
    <div>Selected value: {value}</div>
    <SelectBox
      placeholder='Select item...'
      value={value}
      onChange={value => setState({ value })}
      options={optionsSimple}
    />
  </div>
))

addStory('multi select box', readme, ({ value = [] }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      multi
      placeholder='Select items...'
      value={value}
      onChange={value => setState({ value })}
      options={optionsSimple}
    />
  </div>
))

addStory('placeholder with icon', readme, ({ value = [] }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      multi
      placeholder={<span><Icon name='my_location' /> Select penguins...</span>}
      value={value}
      onChange={value => setState({ value })}
      options={optionsSimple}
    />
  </div>
))

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

function filterOptions (value, options, field) {
  if (value == null) {
    return options
  }

  // Right now it is on selecting element (through keyboard)
  value = typeof value === 'object' ? value[field].toLowerCase() : value.toLowerCase()

  return options.filter(x => {
    const v = field ? x[field] : x

    return v.toLowerCase().indexOf(value) !== -1
  })
}

addStory('special select box', readme, ({ value = null }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      placeholder='Select item...'
      value={value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
))

addStory('warning select box', readme, ({ value = null }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      placeholder='Select item...'
      icon={<Icon name='warning' style={{ fontSize: 15, color: 'gold' }} />}
      value={value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
))

addStory('loading select box', readme, ({ value = null }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      placeholder='Select item...'
      icon={<ProgressRing type='error' />}
      value={value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
))

addStory('special multi select box', readme, ({ value = [] }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      multi
      placeholder='Select items...'
      value={value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
))

addStory('filtered combo box', readme, ({ value = null, inputValue = '' }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <ComboBox
      placeholder='Select item...'
      value={value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      options={filterOptions(inputValue, optionsSimple)}
    />
  </div>
))

addStory('filtered multi combo box', readme, ({ value = [], inputValue = '' }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <ComboBox
      multi
      placeholder='Select items...'
      value={value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={filterOptions(inputValue, options, 'name')}
      onFocus={action('focus')}
      onBlur={action('blur')}
    />
  </div>
))

addStory('multi combo box with adding value', readme, ({ value = [], inputValue = '' }, setState) => (
  <div>
    <div>Use either <strong>Tab</strong> or <strong>Comma</strong> key.</div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <ComboBox
      multi
      placeholder='Select items...'
      value={value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      onNewValue={inputValue => setState({ value: value.concat(inputValue) })}
      options={filterOptions(inputValue, optionsSimple)}
    />
  </div>
))

addStory('auto complete', readme, ({ value = null }, setState) => (
  <div>
    <div>Selected value: {JSON.stringify(value)}</div>
    <AutoComplete
      onChoose={value => setState({ value: 'Penguin ' + value })}
      options={filterOptions(value, optionsSimple)}
      onFocus={action('focus')}
      onBlur={action('blur')}
    >
      <TextInput value={value} onChange={value => setState({ value })} />
    </AutoComplete>
  </div>
))

addStory('RTL: multi select box', readme, ({ value = [] }, setState) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      multi
      placeholder='בחר פריטים'
      value={value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
))

addStory('RTL: select box', readme, ({ value = [] }, setState) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(value)}</div>
    <SelectBox
      placeholder='בחר פריט'
      icon={<ProgressRing type='error' />}
      value={value}
      onChange={value => setState({ value })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
  </div>
))

addStory('RTL: filtered combo box', readme, ({ value = null, inputValue = '' }, setState) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(value)}</div>
    <ComboBox
      placeholder='Select item...'
      value={value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      options={filterOptions(inputValue, optionsSimple)}
    />
  </div>
))

addStory('RTL: filtered multi combo box', readme, ({ value = [], inputValue = '' }, setState) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(value)}</div>
    <ComboBox
      multi
      placeholder='Select items...'
      value={value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={filterOptions(inputValue, options, 'name')}
    />
  </div>
))
