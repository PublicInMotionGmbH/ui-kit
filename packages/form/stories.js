import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Button } from '@talixo/button'
import { ControlGroup } from '@talixo/control-group'
import { TextInput } from '@talixo/text-input'
import { Icon } from '@talixo/icon'

import Form from './src/Form'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Form', module, {
  propTables: [ Form ],
  propTablesExclude: [ TextInput ]
})

// Test component

function TestFooter (props) {
  return (
    <ControlGroup position='center'>
      <Button>Clear</Button>
      <Button>Submit</Button>
    </ControlGroup>
  )
}

// Stories

addStory('default', readme, () => (
  <Form onSubmit={e => e.preventDefault()}>
    <h2>This is a default form wrapper</h2>
    <TextInput placeholder='Name' left={<Icon name='person' />} /><br />
    <TextInput placeholder='Telephone number' left={<Icon name='phone' />} /><br />
    <TextInput placeholder='Email address' left={<Icon name='mail' />} /><br />
  </Form>
))

addStory('with footer component', readme, () => (
  <Form footerComponent={<TestFooter />} onSubmit={e => e.preventDefault()}>
    <h2>This is a default form wrapper</h2>
    <TextInput placeholder='Name' left={<Icon name='person' />} /><br />
    <TextInput placeholder='Telephone number' left={<Icon name='phone' />} /><br />
    <TextInput placeholder='Email address' left={<Icon name='mail' />} /><br />
  </Form>
))
