import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { TextInput } from '@talixo/text-input'
import { Checkbox } from '@talixo/checkbox'

import Fieldset from './src/Fieldset'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Fieldset', module, {
  propTables: [ Fieldset ]
})

// Stories
const additionalStyling = {
  display: 'block',
  marginTop: '15px',
  marginBottom: '15px'
}

addStory('default', readme, () => (
  <Fieldset legend='Personal details'>
    <TextInput placeholder='Your name' style={additionalStyling} />
    <TextInput placeholder='Your surname' style={additionalStyling} />
    <Checkbox>
      I'm not a robot
    </Checkbox>
  </Fieldset>
))

addStory('two fieldsets', readme, () => (
  <div>
    <Fieldset legend='Personal details'>
      <TextInput placeholder='Your name' style={additionalStyling} />
      <TextInput placeholder='Your surname' style={additionalStyling} />
      <Checkbox>
      I'm a robot
      </Checkbox>
    </Fieldset>
    <Fieldset legend='Payments details'>
      <TextInput placeholder='Your bank name' style={additionalStyling} />
      <Checkbox>
      Card payment
      </Checkbox>
    </Fieldset>
  </div>
))
