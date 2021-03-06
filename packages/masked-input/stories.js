import React from 'react'
import moment from 'moment'
import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { AutoComplete } from '@talixo/combo-box'
import { Calendar } from '@talixo/calendar'
import { CountryFlag, CountryFlagsProvider } from '@talixo/country-flag'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'

import MaskedInput from './src/MaskedInput'

const spriteUrl = require('@talixo/country-flag/sprites/sprite.svg')

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Masked Input', module, {
  propTables: [ MaskedInput ]
})

// Helpers
const onChange = action('change')
const onBlur = action('blur')
const onFocus = action('focus')
const commonProps = { onChange, onBlur, onFocus }

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

// Mock data
const options = [
  { id: 'pl', name: 'Poland', language: 'Polish' },
  { id: 'gb', name: 'Great Britain', language: 'English' },
  { id: 'de', name: 'Germany', language: 'Deutsch' },
  { id: 'ru', name: 'Russia', language: 'Russian' },
  { id: 'be', name: 'Belgium', language: 'Deutsch' },
  { id: 'ca', name: 'Canada', language: 'English, French' },
  { id: 'fr', name: 'France', language: 'French' },
  { id: 'cz', name: 'Czechia', language: 'Czech' },
  { id: 'au', name: 'Australia', language: 'English' },
  { id: 'cn', name: 'China', language: 'Chinese' },
  { id: 'it', name: 'Italy', language: 'Italian' },
  { id: 'sk', name: 'Slovakia', language: 'Slovak' }
]

// Input mask renderer
const renderDate = ({ value }) => (
  <div className='storybook-mask-example'>
    <Icon className='storybook-mask-input__mask-icon' name='date_range' />
    {value && moment(value).format('DD MMMM, ddd')}
  </div>
)
const renderCountry = ({ value }) => (
  <div className='storybook-mask-example'>
    <CountryFlag code={value.id} style={{ marginRight: 10 }} />
    {value.name} <small>({value.language})</small>
  </div>
)

// Stories
addStory.controlled('default', readme, (setState, state) => (
  <MaskedInput
    renderMask={({ value }) => (
      <div className='storybook-mask-example'>
        <Icon name='check_sign' className='storybook-mask-input__mask-icon storybook-mask-input__mask-icon--checked' />
        {value}
      </div>
    )}
    onChange={value => { setState({ value }) }}
    value={state.value}
    style={{ display: 'block' }}
    {...commonProps}
  >
    <TextInput
      placeholder='Type something and click out of this box...'
    />
  </MaskedInput>
), () => ({ value: null }))

// Styles for calendar
const styles = {
  left: '100px',
  width: '1000px',
  paddingLeft: '30px'
}

addStory('calendar', readme, () => (
  <div style={styles}>
    <MaskedInput renderMask={renderDate} {...commonProps}>
      <Calendar placeholder='Choose date...' />
    </MaskedInput>
  </div>
))

addStory.controlled('autocomplete', readme, (setState, state) => (
  <CountryFlagsProvider url={spriteUrl}>
    <div>State: {state.value && JSON.stringify(state.value)}</div>
    <MaskedInput
      renderMask={renderCountry}
      value={state.value}
      style={{ display: 'block' }}
      {...commonProps}
    >
      <AutoComplete
        options={filterOptions(state.filterValue, options, 'name')}
        renderItem={x => x.name}
        onChoose={item => setState({ value: item })}
        itemToString={v => v == null ? '' : v.name}
      >
        <TextInput
          onChange={(v) => setState({ value: null, filterValue: v })}
          placeholder='Start typing name of a country and select it from the list...'
        />
      </AutoComplete>
    </MaskedInput>
  </CountryFlagsProvider>

), () => ({ value: null }))
