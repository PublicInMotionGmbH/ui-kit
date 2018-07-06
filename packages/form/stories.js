import React from 'react'

import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Button } from '@talixo/button'
import { Checkbox } from '@talixo/checkbox'
import { ControlGroup } from '@talixo/control-group'
import { Fieldset } from '@talixo/fieldset'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'
import { PhoneInput } from '@talixo/phone-input'

import { Calendar } from '@talixo/calendar'
import { NumberInput } from '@talixo/number-input'
import { SelectBox } from '@talixo/combo-box'
import yup from 'yup'

import Form from './src/Form'
import FormHandler from './src/FormHandler'
import FormField from './src/FormField'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Form', module, {
  propTables: [ Form, FormHandler ],
  propTablesExclude: [
    Button, Calendar, ControlGroup, Checkbox, Fieldset,
    Icon, NumberInput, PhoneInput, TextInput, SelectBox
  ]
})

// Events
const blur = action('blur')
const change = action('change')
const focus = action('focus')
const submit = action('submit')
const commonProps = { onChange: change, onBlur: blur, onFocus: focus }

// Helpers

function renderCountry (x) {
  return (
    <div style={{ display: 'flex', lineHeight: '1em' }}>
      <div>
        <strong>{x.name}</strong><br />
        <div style={{ color: '#999', fontSize: '0.8em' }}>{x.country}</div>
      </div>
    </div>
  )
}

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
        <Checkbox>Include VAT invoice</Checkbox>
      </FormField>
    </Fieldset>
  </Form>
))

addStory('FormHandler', readme, () => (
  <FormHandler onSubmit={submit}>
    <FormField label='Name' name='name' {...commonProps}>
      <TextInput />
    </FormField>
    <br />
    <FormField label='Email' name='email' {...commonProps}>
      <TextInput />
    </FormField>
    <br />
    <ControlGroup position='center'>
      <Button type='submit'>Send</Button>
    </ControlGroup>
  </FormHandler>
))

// Stories
addStory.controlled('FormHandler: custom error', readme, (setState, state) => (
  <div>
    <FormHandler
      onSubmit={submit}
      errors={{ name: state.name, email: state.email }}
    >
      <FormField label='Name' name='name' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <FormField label='Email' name='email' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <ControlGroup position='center'>
        <Button type='submit'>Send</Button>
      </ControlGroup>
    </FormHandler>
    <br />
    <br />
    <br />
    <FormField
      label='Custom name error'
      hint='It will be added after corresponding field is blurred'
      onChange={value => { setState({ name: value }) }}
    >
      <TextInput />
    </FormField>
    <br />
    <FormField
      label='Custom email error'
      hint='It will be added after corresponding field is blurred'
      onChange={value => { setState({ email: value }) }}
    >
      <TextInput />
    </FormField>
  </div>
), () => ({
  name: ''
}))

const loginSchema = yup.object().shape({
  name: yup.mixed().required('This field is required'),
  password: yup.mixed().required('Password is required')
})

addStory('FormHandler: login with yup validation', readme, () => (
  <FormHandler onSubmit={submit} validationSchema={loginSchema}>
    <FormField
      name='name'
      label='Username / Email address'
      hint='Your super fancy username or email address'
      {...commonProps}>
      <TextInput />
    </FormField>
    <br />
    <FormField name='password' label='Password' {...commonProps}>
      <TextInput type='password' />
    </FormField>
    <br />
    <ControlGroup position='center'>
      <Button type='submit'>Login</Button>
    </ControlGroup>
  </FormHandler>
))

addStory('FormHandler: order', readme, () => (
  <FormHandler onSubmit={submit}>
    <Fieldset legend='Order details'>
      <FormField name='apple_juice' label='Apple juice' {...commonProps}>
        <NumberInput left={<Icon name='local_bar' />} suffix='bottle' style={{ width: '30%' }} />
      </FormField>
      <br />
      <FormField name='pizza' label='Pizza' {...commonProps}>
        <NumberInput left={<Icon name='restaurant' />} suffix='slice' style={{ width: '30%' }} />
      </FormField>
      <br />
      <FormField name='fuel' label='Fuel' {...commonProps}>
        <NumberInput left={<Icon name='ev_station' />} suffix='gallon' style={{ width: '30%' }} />
      </FormField>
    </Fieldset>
    <Fieldset legend='Personal Details'>
      <FormField name='name' label='Name' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <FormField name='surname' label='Surname' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <FormField name='email' label='Email' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <FormField name='phone' label='Phone number' {...commonProps}>
        <PhoneInput />
      </FormField>
    </Fieldset>

    <Fieldset legend='Address Information'>
      <FormField name='street' label='Street' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <FormField name='house_number' label='Number' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <FormField name='city' label='City' {...commonProps}>
        <TextInput />
      </FormField>
      <br />
      <FormField name='zip' label='ZIP code' {...commonProps}>
        <TextInput />
      </FormField>
    </Fieldset>
    <Fieldset>
      <FormField name='terms' label='Terms'>
        <Checkbox onChange={({ taget: { checked } }) => checked}>I have read and accept Terms and Conditions</Checkbox>
      </FormField>
    </Fieldset>
    <ControlGroup position='center'>
      <Button type='submit'>Order</Button>
    </ControlGroup>
  </FormHandler>
))

const options = [
  { name: 'Warsaw', country: 'Polish' },
  { name: 'Berlin', country: 'Germany' },
  { name: 'London', country: 'Great Britain' },
  { name: 'Madrid', country: 'Spain' },
  { name: 'Rome', country: 'Italy' },
  { name: 'Prague', country: 'Czech Republic' },
  { name: 'Kiev', country: 'Ukraine' },
  { name: 'Paris', country: 'France' }
]
addStory.controlled('FormHandler: booking', readme, (setState, state) => (
  <FormHandler onSubmit={submit}>
    <Fieldset legend='Journey details'>
      <FormField name='start_point' label='From' {...commonProps}>
        <SelectBox
          placeholder='Choose city'
          renderItem={renderCountry}
          renderValue={renderCountry}
          onInputValueChange={inputValue => setState({ from: inputValue })}
          options={options}
          value={state.from}
        />
      </FormField>
      <br />
      <FormField name='destination' label='to' {...commonProps}>
        <SelectBox
          placeholder='Choose city'
          renderItem={renderCountry}
          renderValue={renderCountry}
          onInputValueChange={inputValue => setState({ to: inputValue })}
          options={options}
          value={state.to}
        />
      </FormField>
      <br />
      <FormField name='date' label='Date' {...commonProps}>
        <Calendar />
      </FormField>
      <br />
      <FormField name='passengers' label='Passengers' {...commonProps}>
        <NumberInput min={0} max={4} style={{ width: '30%' }} />
      </FormField>
    </Fieldset>
    <ControlGroup position='center'>
      <Button type='submit'>Book</Button>
    </ControlGroup>
  </FormHandler>
), () => ({ from: null, to: null }))

addStory.controlled('FormField: text-input', readme, (setState, state) => (
  <div>
    <h2>Default</h2>
    <FormField>
      <TextInput />
    </FormField>
    <h2>With label</h2>
    <FormField label='Name' id='name'>
      <TextInput />
    </FormField>
    <h2>Error</h2>
    <FormField error='Your password is too weak'>
      <TextInput />
    </FormField>
    <h2>Warning</h2>
    <FormField warning='Your password is still weak'>
      <TextInput />
    </FormField>
    <h2>Hint</h2>
    <FormField hint='You will receive booking confirmation'>
      <TextInput />
    </FormField>
    <h2>With label, error, warning and hint</h2>
    <FormField
      label='Name'
      id='name2'
      error='Your name is too short'
      warning='Type your real name'
      hint='You will receive booking confirmation'
    >
      <TextInput />
    </FormField>
    <h2>With passed value</h2>
    <FormField value='some value'>
      <TextInput />
    </FormField>
    <h2>Focus state</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      Focus status: {state.focus ? 'Focus' : 'No focus'}
    </span>
    <FormField
      label='Name*'
      onBlur={() => { setState({ focus: false }) }}
      onFocus={() => { setState({ focus: true }) }}
    >
      <TextInput />
    </FormField>
    <h2>Controlled</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      You typed: {state.value}
    </span>
    <FormField
      label='Name*'
      error={state.value.length < 5 ? 'Your name is too short' : undefined}
      warning={state.value.length > 8 ? 'Your name is getting too long' : undefined}
      hint='Type your name'
      onChange={(value) => { setState({value}) }}
    >
      <TextInput />
    </FormField>
  </div>
), () => {
  return {
    value: '',
    focus: false
  }
})

addStory.controlled('FormField: number-input', readme, (setState, state) => (
  <div>
    <h2>Default</h2>
    <FormField>
      <NumberInput />
    </FormField>
    <h2>With label</h2>
    <FormField label='Cars' id='cars'>
      <NumberInput />
    </FormField>
    <h2>Error</h2>
    <FormField error='You have to pick at least one car'>
      <NumberInput />
    </FormField>
    <h2>Warning</h2>
    <FormField warning='You picked a lot of cars'>
      <NumberInput />
    </FormField>
    <h2>Hint</h2>
    <FormField hint='Pick as many cars as you wish'>
      <NumberInput />
    </FormField>
    <h2>With label, error, warning and hint</h2>
    <FormField
      label='Cars'
      id='cars2'
      error='You have to pick at least one car'
      warning='You picked a lot of cars'
      hint='Pick as many cars as you wish'
    >
      <NumberInput />
    </FormField>
    <h2>Focus state</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      Focus status: {state.focus ? 'Focus' : 'No focus'}
    </span>
    <FormField
      label='Age*'
      onBlur={() => { setState({ focus: false }) }}
      onFocus={() => { setState({ focus: true }) }}
    >
      <NumberInput />
    </FormField>
    <h2>With passed value</h2>
    <FormField value={23}>
      <NumberInput />
    </FormField>
    <h2>Controlled</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      You chose: {state.value} cars
    </span>
    <FormField
      label='Cars'
      error={state.value < 1 ? 'You chose no cars' : undefined}
      hint='Pick some cars'
      warning={state.value > 8 ? 'Your chose a lot of cars' : undefined}
      onChange={(value) => { setState({value}) }}
    >
      <NumberInput value={state.value} />
    </FormField>
  </div>
), () => {
  return {
    value: 0
  }
})

addStory.controlled('FormField: checkbox', readme, (setState, state) => (
  <div>
    <h2>Default</h2>
    <FormField>
      <Checkbox>Agree</Checkbox>
    </FormField>
    <h2>With label</h2>
    <FormField label='Terms' id='cars'>
      <Checkbox>Agree</Checkbox>
    </FormField>
    <h2>Error</h2>
    <FormField error='You have to agree'>
      <Checkbox>Agree</Checkbox>
    </FormField>
    <h2>Warning</h2>
    <FormField warning='Remember to agree'>
      <Checkbox>Agree</Checkbox>
    </FormField>
    <h2>Hint</h2>
    <FormField hint='Agree to terms'>
      <Checkbox>Agree</Checkbox>
    </FormField>
    <h2>With label, error, warning and hint</h2>
    <FormField
      label='Terms'
      id='cars2'
      error='You have to agree'
      warning='Remember to agree'
      hint='Agree to terms'
    >
      <Checkbox>Agree</Checkbox>
    </FormField>
    <h2>Focus state</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      Focus status: {state.focus ? 'Focus' : 'No focus'}
    </span>
    <FormField
      label='Agree*'
      onBlur={() => { setState({ focus: false }) }}
      onFocus={() => { setState({ focus: true }) }}
    >
      <Checkbox>Agree</Checkbox>
    </FormField>
    <h2>Controlled</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      You { state.checked ? 'agree' : 'disagree' }
    </span>
    <FormField onChange={checked => { setState({ checked }) }}>
      <Checkbox>Agree</Checkbox>
    </FormField>
  </div>
), () => {
  return {
    checked: false
  }
})

function formatErrorMessage (message) {
  return message.toLowerCase().replace(
    /..?/g,
    x => x[0].toUpperCase() + (x[1] || '').toLowerCase()
  )
}

addStory('FormField: messages with formatter', readme, () => (
  <div>
    <strong>Formatter:</strong> <code style={{ display: 'block', whiteSpace: 'pre' }}>{formatErrorMessage.toString()}</code>

    <br />

    <FormField
      formatErrorMessage={formatErrorMessage}
      label='Element label'
      error='Error message'
      warning='Warning message'
      hint='Hint message'
    >
      <TextInput />
    </FormField>
  </div>
))
