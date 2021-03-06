import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { action } from '@storybook/addon-actions'

import { Form, FormHandler, Field } from '@talixo/form'
import { TextInput } from '@talixo/text-input'
import { Checkbox } from '@talixo/checkbox'
import { RadioGroup } from '@talixo/radio-group'
import Wizard from './src/Wizard'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Wizard', module, {
  propTables: [ Wizard ]
})

// Components for Wizard's steps
function Step1 (props) {
  return (
    <Form>
      <h3>Step 1</h3>
      <TextInput placeholder='First Step' />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

function Step2 (props) {
  return (
    <Form>
      <h3>Step 2</h3>
      <TextInput placeholder='Second Step' />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

function Step3 (props) {
  return (
    <Form>
      <h3>Step 3</h3>
      <TextInput placeholder='Third Step' />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

function Step4 (props) {
  return (
    <Form>
      <h3>Step 4</h3>
      <TextInput placeholder='Fourth Step' />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

const change = action('change')

// Stories

addStory('default', readme, () => (
  <Wizard>
    <Step1 />
    <Step2 />
    <Step3 />
  </Wizard>
))

addStory('custom wizard', readme, () => (
  <Wizard nextLabel='Next step' previousLabel='Previous step' displayedLimit={2}>
    <Step1 />
    <Step2 />
    <Step3 />
    <Step4 />
  </Wizard>
))

addStory('with set starting step', readme, () => (
  <Wizard step={3}>
    <Step1 />
    <Step2 />
    <Step3 />
    <Step4 />
  </Wizard>
))

addStory('with formHandler', readme, () => (
  <FormHandler>
    <Wizard>
      <Field name='name-one'>
        <RadioGroup
          name='RadioName1'
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      </Field>
      <Field name='name-two'>
        <RadioGroup
          name='RadioName1'
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
            { value: 3, label: 'three' }
          ]}
        />
      </Field>
    </Wizard>
  </FormHandler>
))
