import React from 'react'
import yup from 'yup'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { TextInput } from '@talixo/text-input'
import { FormField } from '@talixo/form-field'
import { Button } from '@talixo/button'

import FormHandler from './src/FormHandler'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Form Handler', module, {
  propTables: [ FormHandler ]
})

// Stories
const schema = yup.object().shape({
  // name: yup.mixed().required('Type in your name.')
})
addStory.controlled('initial', readme, (setState, state) => (
  <div>
    <FormHandler
      onSubmit={v => console.log(v)}
      errors={{ name: state.name }}
      validationSchema={schema}
    >
      <FormField label='Name' name='name'>
        <TextInput />
      </FormField>
      <Button type='submit'>Send</Button>
    </FormHandler>
    <input type='text' onChange={({ target: { value } }) => setState({ name: value })} />
  </div>
), () => ({
  name: ''
}))
