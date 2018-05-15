import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { AutoComplete, ComboBox } from '@talixo/combo-box'
import { Calendar } from '@talixo/calendar'
import { CountryFlag } from '@talixo/country-flag'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'

import MaskedInput from './src/MaskedInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Masked Input', module, {
  propTables: [ MaskedInput ]
})

// Enhanced components
// const MaskedCalendar = MaskedInputHOC(Calendar)
// const MaskedCombobox = MaskedInputHOC(ComboBox)
// const MaskedTextInput = MaskedInputHOC(TextInput)

// Mock data
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

// Input mask renderer
const renderDate = v => (
  <div>
    <Icon name='date_range' />
    {v && v.format('DD MMMM, ddd')}
  </div>
)
const renderCountry = v => (
  <div>
    {/*<CountryFlag code={v.id} />*/}
    {/*{v.name}*/}
    partially working
  </div>
)

// Stories
addStory('calendar', readme, () => (
  <MaskedInput
    renderInput={<Calendar render={renderDate} />}
    renderMask={(v) => <div>{v.toString()}</div>}
  />
))

addStory.controlled('autocomplete', readme, (setState, state) => (
  <MaskedInput
    renderInput={
      <AutoComplete
        options={options}
        renderItem={(x) => (<div>{x.name}</div>)}
        value={state.value}
        onChange={value => setState({ value })}
      >
        <TextInput render={renderCountry} />
      </AutoComplete>
    }
    renderMask={(v) => <div>{v.toString()}</div>}
  />
), () => ({ value: null }))
