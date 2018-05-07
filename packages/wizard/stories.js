import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { action } from '@storybook/addon-actions'

import { Form } from '@talixo/form'
import { TextInput } from '@talixo/text-input'
import { Checkbox } from '@talixo/checkbox'
import Wizard from './src/Wizard'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Wizard', module, {
  propTables: [ Wizard ]
})

// Components for Wizard
function Step1 (props) {
  return (
    <Form>
      <TextInput placeholder='First Step' />
      <Checkbox onChange={change} size='small'>Default</Checkbox>
      <Checkbox onChange={change} size='small'>Checkbox</Checkbox>
    </Form>
  )
}

function Step2 (props) {
  return (
    <Form>
      <TextInput placeholder='Second Step' />
      <Checkbox onChange={change} size='small'>Default</Checkbox>
      <Checkbox onChange={change} size='small'>Checkbox</Checkbox>
    </Form>
  )
}

function Step3 (props) {
  return (
    <Form>
      <TextInput placeholder='Third Step' />
      <Checkbox onChange={change} size='small'>Default</Checkbox>
      <Checkbox onChange={change} size='small'>Checkbox</Checkbox>
    </Form>
  )
}

const change = action('change')

// Stories

addStory('initial', readme, () => (
  <Wizard>
    <Step1 step={1} />
    <Step2 step={2} />
    <Step3 step={3} />
  </Wizard>
))
