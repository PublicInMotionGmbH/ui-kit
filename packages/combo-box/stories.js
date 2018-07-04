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
  'Rico',
  'Alonso',
  'Smith',
  'Santosh',
  'Medelina',
  'Kyoksanto'
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

// Styles for autocomplete footer
const footerStyles = {
  textAlign: 'right',
  color: '#e40909'
}

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

addStory.controlled('select box with footer', readme, (setState, state) => (
  <div>
    <div>Selected value: {state.value}</div>
    <SelectBox
      placeholder='Select item...'
      value={state.value}
      onChange={value => setState({ value })}
      options={optionsSimple}
      footer={<div style={footerStyles}>Powered by Talixo</div>}
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

addStory.controlled('placeholder with icon', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <SelectBox
      multi
      placeholder={<span><Icon name='my_location' /> Select penguins...</span>}
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

addStory.controlled('filtered combo box', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <ComboBox
      placeholder='Select item...'
      value={state.value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      options={filterOptions(state.inputValue, optionsSimple)}
    />
  </div>
), () => ({ value: null, inputValue: '' }))

addStory.controlled('combo box with footer', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <ComboBox
      placeholder='Select item...'
      value={state.value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      options={filterOptions(state.inputValue, optionsSimple)}
      footer={<div style={footerStyles}>Powered by Talixo</div>}
    />
  </div>
), () => ({ value: null, inputValue: '' }))

addStory.controlled('filtered multi combo box', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <ComboBox
      multi
      placeholder='Select items...'
      value={state.value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={filterOptions(state.inputValue, options, 'name')}
      onFocus={action('focus')}
      onBlur={action('blur')}
    />
  </div>
), () => ({ value: [], inputValue: '' }))

addStory.controlled('multi combo box with adding value', readme, (setState, state) => (
  <div>
    <div>Use either <strong>Tab</strong> or <strong>Comma</strong> key.</div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <ComboBox
      multi
      placeholder='Select items...'
      value={state.value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      onNewValue={inputValue => setState({ value: state.value.concat(inputValue) })}
      options={filterOptions(state.inputValue, optionsSimple)}
    />
  </div>
), () => ({ value: [], inputValue: '' }))

addStory.controlled('auto complete', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <AutoComplete
      onChoose={value => setState({ value: 'Penguin ' + value })}
      options={filterOptions(state.value, optionsSimple)}
      onFocus={action('focus')}
      onBlur={action('blur')}
    >
      <TextInput value={state.value} onChange={value => setState({ value })} />
    </AutoComplete>
  </div>
), () => ({ value: '' }))

addStory.controlled('auto complete with footer', readme, (setState, state) => (
  <div>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <AutoComplete
      onChoose={value => setState({ value: 'Penguin ' + value })}
      options={filterOptions(state.value, optionsSimple)}
      onFocus={action('focus')}
      onBlur={action('blur')}
      footer={<div style={footerStyles}>Powered by Talixo</div>}
    >
      <TextInput value={state.value} onChange={value => setState({ value })} />
    </AutoComplete>
  </div>
), () => ({ value: '' }))

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

addStory.controlled('RTL: filtered combo box', readme, (setState, state) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <ComboBox
      placeholder='Select item...'
      value={state.value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      options={filterOptions(state.inputValue, optionsSimple)}
    />
  </div>
), () => ({ value: null, inputValue: '' }))

addStory.controlled('RTL: filtered multi combo box', readme, (setState, state) => (
  <div dir='rtl'>
    <div>Selected value: {JSON.stringify(state.value)}</div>
    <ComboBox
      multi
      placeholder='Select items...'
      value={state.value}
      onChange={value => setState({ value, inputValue: '' })}
      onInputValueChange={inputValue => setState({ inputValue })}
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={filterOptions(state.inputValue, options, 'name')}
    />
  </div>
), () => ({ value: [], inputValue: '' }))

addStory('with label', readme, () => (
  <div>
    <label htmlFor='combo-box'>Click me (combo box)</label>
    <ComboBox
      id='combo-box'
      placeholder='Select items...'
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
    <label htmlFor='combo-box-multi'>Click me (multi combo box)</label>
    <ComboBox
      multi
      id='combo-box-multi'
      placeholder='Select item...'
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
    <label htmlFor='select-box'>Click me (select box)</label>
    <SelectBox
      multi
      id='select-box'
      placeholder='Select item...'
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
    <label htmlFor='select-box-multi'>Click me (multi select box)</label>
    <SelectBox
      multi
      id='select-box-multi'
      placeholder='Select item...'
      renderItem={renderCountry}
      renderValue={renderSimpleCountry}
      options={options}
    />
    <label htmlFor='autocomplete'>Click me (autocomplete)</label>
    <AutoComplete
      id='autocomplete'
      options={optionsSimple}
      onFocus={action('focus')}
      onBlur={action('blur')}
      footer={<div style={footerStyles}>Powered by Talixo</div>}
    >
      <TextInput />
    </AutoComplete>
  </div>
))
