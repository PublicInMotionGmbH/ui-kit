import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Button } from '@talixo/button'
import { Checkbox } from '@talixo/checkbox'
import { ControlGroup } from '@talixo/control-group'
import { Fieldset } from '@talixo/fieldset'
import { FormField } from '@talixo/form-field'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'
import { PhoneInput } from '@talixo/phone-input'

import Form from './src/Form'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Form', module, {
  propTables: [ Form ],
  propTablesExclude: [ TextInput, Button, ControlGroup, Icon, FormField ]
})

// Test components

function TestFooter (props) {
  return (
    <ControlGroup position='center'>
      <Button onClick={props.handleReset}>Clear</Button>
      <Button type='submit'>Submit</Button>
    </ControlGroup>
  )
}
function createButton (label) {
  return (
    <ControlGroup position='center'>
      <Button type='submit'>{label}</Button>
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

addStory('login form', readme, () => (
  <Form footerComponent={createButton('Login')}>
    <FormField label='Username / Email' hint='Type in our email address' >
      <TextInput />
    </FormField>
    <br />
    <FormField
      label='Password'
      hint='Type in your super strong password'
    >
      <TextInput type='password' />
    </FormField>
  </Form>
))

addStory('register form', readme, () => (
  <Form footerComponent={createButton('Register')} className='storybook__form' onSubmit={e => e.preventDefault()}>
    <FormField label='Username / Email' hint='Type in our email address' >
      <TextInput />
    </FormField>
    <br />
    <FormField label='Password' hint='Type in your super strong password'>
      <TextInput type='password' />
    </FormField>
    <br />
    <FormField label='Terms'>
      <Checkbox>By clicking Register, you agree to our Terms and Conditions</Checkbox>
    </FormField>
  </Form>
))

addStory('order form', readme, () => (
  <Form footerComponent={createButton('Confirm')} className='storybook__form' onSubmit={e => e.preventDefault()}>
    <Fieldset legend='Personal details'>
      <FormField label='Name'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='Surname'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='Email address'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='Phone number'>
        <PhoneInput />
      </FormField>
    </Fieldset>
    <Fieldset legend='Address'>
      <FormField label='Street'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='House number'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='City'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='ZIP code'>
        <TextInput />
      </FormField>
    </Fieldset>
    <Fieldset legend='Company details'>
      <FormField label='Name'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='TIN'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='Address'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='City'>
        <TextInput />
      </FormField>
      <br />
      <FormField label='Invoice'>
        <Checkbox>Invlude VAT invoice</Checkbox>
      </FormField>
    </Fieldset>
  </Form>
))
