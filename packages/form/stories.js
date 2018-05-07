import React from 'react'
import { Formik } from 'formik'

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
      <Button onClick={props.handleReset}>Clear</Button>
      <Button type='submit'>Submit</Button>
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

const renderForm = props => (
  <Form footerComponent={<TestFooter />} onSubmit={props.handleSubmit}>
    <h2>This is a default form wrapper</h2>
    <TextInput
      onChange={value => props.setFieldValue('name', value)}
      value={props.values['name']}
      name='name'
      placeholder='Name'
      left={<Icon name='person' />}
    />
    <br />
  </Form>
)
const submit = value => {
  console.log('Submitted: ', value)
}
addStory('with formik library', readme, () => (
  <Formik
    render={renderForm}
    onSubmit={submit}
  />
))
