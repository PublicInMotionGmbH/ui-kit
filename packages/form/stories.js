import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Form from './src/Form'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Form', module, {
  propTables: [ Form ]
})

// Test component

function TestFooter (props) {
  return (
    <div>FOOTER</div>
  )
}

// Stories

addStory('initial', readme, () => (
  <Form footerComponent={<TestFooter />}>
    <input type='text' />
    <input type='button' />
  </Form>
))
