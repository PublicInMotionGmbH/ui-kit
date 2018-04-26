import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Form } from '@talixo/form'
import Wizard from './src/Wizard'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Wizard', module, {
  propTables: [ Wizard ]
})

// Test component

function TestFooter (props) {
  return (
    <div>FOOTER</div>
  )
}

// Stories

addStory('initial', readme, () => (
  <Wizard footerComponent={<TestFooter />}>
    <Form>
      <input type='text' />
      <input type='button' />
    </Form>
  </Wizard>
))
