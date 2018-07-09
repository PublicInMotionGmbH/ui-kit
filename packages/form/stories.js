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
import FormFooter from './src/FormFooter'
import Field from './src/Field'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Form', module, {
  propTables: [ Form, FormHandler, FormFooter, Field ],
  propTablesExclude: [
    Button, Calendar, ControlGroup, Checkbox, Fieldset,
    Icon, NumberInput, PhoneInput, TextInput, SelectBox
  ]
})

// Events
const blur = action('blur')
const change = action('change')
const changeForm = action('changeForm')
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

addStory('Form: default', readme, () => (
  <Form onSubmit={e => e.preventDefault()}>
    <h2>This is a default form wrapper</h2>
    <TextInput placeholder='Name' left={<Icon name='person' />} /><br />
    <TextInput placeholder='Telephone number' left={<Icon name='phone' />} /><br />
    <TextInput placeholder='Email address' left={<Icon name='mail' />} /><br />
  </Form>
))

addStory('Form: with footer', readme, () => (
  <Form onSubmit={e => e.preventDefault()}>
    <h2>This is a default form wrapper</h2>
    <TextInput placeholder='Name' left={<Icon name='person' />} /><br />
    <TextInput placeholder='Telephone number' left={<Icon name='phone' />} /><br />
    <TextInput placeholder='Email address' left={<Icon name='mail' />} /><br />
    <FormFooter>
      <TestFooter />
    </FormFooter>
  </Form>
))

addStory('Form: horizontal login', readme, () => (
  <Form horizontal>
    <Field label='Username / Email' hint='Type in your email address' >
      <TextInput />
    </Field>
    <Field
      label='Password'
      hint='Type in your super strong password'
    >
      <TextInput type='password' />
    </Field>
    <FormFooter>
      {createButton('Login')}
    </FormFooter>
  </Form>
))

addStory('Form: horizontal register', readme, () => (
  <Form
    horizontal
    className='storybook__form'
    onSubmit={e => e.preventDefault()}
  >
    <Field label='Username / Email' hint='Type in your email address' >
      <TextInput />
    </Field>
    <Field label='Password' hint='Type in your super strong password'>
      <TextInput type='password' />
    </Field>
    <Field spread>
      <Checkbox>By clicking Register, you agree to our Terms and Conditions</Checkbox>
    </Field>
    <FormFooter>
      {createButton('Register')}
    </FormFooter>
  </Form>
))

addStory('Form: spread order form', readme, () => (
  <Form
    horizontal
    spread
    className='storybook__form'
    onSubmit={e => e.preventDefault()}>
    <Fieldset legend='Personal details'>
      <Field label='Name'>
        <TextInput />
      </Field>
      <Field label='Surname'>
        <TextInput />
      </Field>
      <Field label='Email address'>
        <TextInput />
      </Field>
      <Field label='Phone number'>
        <PhoneInput />
      </Field>
    </Fieldset>
    <Fieldset legend='Address'>
      <Field label='Street'>
        <TextInput />
      </Field>
      <Field label='House number'>
        <TextInput />
      </Field>
      <Field label='City'>
        <TextInput />
      </Field>
      <Field label='ZIP code'>
        <TextInput />
      </Field>
    </Fieldset>
    <Fieldset legend='Company details'>
      <Field label='Name'>
        <TextInput />
      </Field>
      <Field label='TIN'>
        <TextInput />
      </Field>
      <Field label='Address'>
        <TextInput />
      </Field>
      <Field label='City'>
        <TextInput />
      </Field>
      <Field>
        <Checkbox>Include VAT invoice</Checkbox>
      </Field>
    </Fieldset>
    <FormFooter>
      {createButton('Confirm')}
    </FormFooter>
  </Form>
))

addStory('FormHandler', readme, () => (
  <FormHandler onChange={changeForm} onSubmit={submit}>
    <Field label='Name' name='name' {...commonProps}>
      <TextInput />
    </Field>
    <Field label='Email' name='email' {...commonProps}>
      <TextInput />
    </Field>
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
      <Field label='Name' name='name' {...commonProps}>
        <TextInput />
      </Field>
      <Field label='Email' name='email' {...commonProps}>
        <TextInput />
      </Field>
      <ControlGroup position='center'>
        <Button type='submit'>Send</Button>
      </ControlGroup>
    </FormHandler>
    <br />
    <br />
    <br />
    <Field
      label='Custom name error'
      hint='It will be added after corresponding field is blurred'
      onChange={value => { setState({ name: value }) }}
    >
      <TextInput />
    </Field>
    <Field
      label='Custom email error'
      hint='It will be added after corresponding field is blurred'
      onChange={value => { setState({ email: value }) }}
    >
      <TextInput />
    </Field>
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
    <Field
      name='name'
      label='Username / Email address'
      hint='Your super fancy username or email address'
      {...commonProps}>
      <TextInput />
    </Field>
    <Field name='password' label='Password' {...commonProps}>
      <TextInput type='password' />
    </Field>
    <ControlGroup position='center'>
      <Button type='submit'>Login</Button>
    </ControlGroup>
  </FormHandler>
))

addStory('FormHandler: order', readme, () => (
  <FormHandler onSubmit={submit}>
    <Fieldset legend='Order details'>
      <Field name='apple_juice' label='Apple juice' {...commonProps}>
        <NumberInput left={<Icon name='local_bar' />} suffix='bottle' />
      </Field>
      <Field name='pizza' label='Pizza' {...commonProps}>
        <NumberInput left={<Icon name='restaurant' />} suffix='slices' />
      </Field>
      <Field name='fuel' label='Fuel' {...commonProps}>
        <NumberInput left={<Icon name='ev_station' />} suffix='gallon' />
      </Field>
    </Fieldset>
    <Fieldset legend='Personal Details'>
      <Field name='name' label='Name' {...commonProps}>
        <TextInput />
      </Field>
      <Field name='surname' label='Surname' {...commonProps}>
        <TextInput />
      </Field>
      <Field name='email' label='Email' {...commonProps}>
        <TextInput />
      </Field>
      <Field name='phone' label='Phone number' {...commonProps}>
        <PhoneInput />
      </Field>
    </Fieldset>

    <Fieldset legend='Address Information'>
      <Field name='street' label='Street' {...commonProps}>
        <TextInput />
      </Field>
      <Field name='house_number' label='Number' {...commonProps}>
        <TextInput />
      </Field>
      <Field name='city' label='City' {...commonProps}>
        <TextInput />
      </Field>
      <Field name='zip' label='ZIP code' {...commonProps}>
        <TextInput />
      </Field>
    </Fieldset>
    <Fieldset>
      <Field name='terms' label='Terms'>
        <Checkbox onChange={({ taget: { checked } }) => checked}>I have read and accept Terms and Conditions</Checkbox>
      </Field>
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
  <FormHandler horizontal spread onSubmit={submit}>
    <Fieldset legend='Journey details'>
      <Field name='start_point' label='From' {...commonProps}>
        <SelectBox
          placeholder='Choose city'
          renderItem={renderCountry}
          renderValue={renderCountry}
          onInputValueChange={inputValue => setState({ from: inputValue })}
          options={options}
          value={state.from}
        />
      </Field>
      <Field name='destination' label='to' {...commonProps}>
        <SelectBox
          placeholder='Choose city'
          renderItem={renderCountry}
          renderValue={renderCountry}
          onInputValueChange={inputValue => setState({ to: inputValue })}
          options={options}
          value={state.to}
        />
      </Field>
      <Field name='date' label='Date' {...commonProps}>
        <Calendar />
      </Field>
      <Field name='passengers' label='Passengers' {...commonProps}>
        <NumberInput min={0} max={4} style={{ width: '40%', minWidth: '200px' }} />
      </Field>
    </Fieldset>
    <ControlGroup position='center'>
      <Button type='submit'>Book</Button>
    </ControlGroup>
  </FormHandler>
), () => ({ from: null, to: null }))

addStory.controlled('Field: text-input', readme, (setState, state) => (
  <div>
    <h2>Default</h2>
    <Field>
      <TextInput />
    </Field>
    <h2>With label</h2>
    <Field label='Name' id='name'>
      <TextInput />
    </Field>
    <h2>Error</h2>
    <Field error='Your password is too weak'>
      <TextInput />
    </Field>
    <h2>Warning</h2>
    <Field warning='Your password is still weak'>
      <TextInput />
    </Field>
    <h2>Hint</h2>
    <Field hint='You will receive booking confirmation'>
      <TextInput />
    </Field>
    <h2>With label, error, warning and hint</h2>
    <Field
      label='Name'
      id='name2'
      error='Your name is too short'
      warning='Type your real name'
      hint='You will receive booking confirmation'
    >
      <TextInput />
    </Field>
    <h2>With passed value</h2>
    <Field value='some value'>
      <TextInput />
    </Field>
    <h2>Focus state</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      Focus status: {state.focus ? 'Focus' : 'No focus'}
    </span>
    <Field
      label='Name*'
      onBlur={() => { setState({ focus: false }) }}
      onFocus={() => { setState({ focus: true }) }}
    >
      <TextInput />
    </Field>
    <h2>Controlled</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      You typed: {state.value}
    </span>
    <Field
      label='Name*'
      error={state.value.length < 5 ? 'Your name is too short' : undefined}
      warning={state.value.length > 8 ? 'Your name is getting too long' : undefined}
      hint='Type your name'
      onChange={(value) => { setState({value}) }}
    >
      <TextInput />
    </Field>
  </div>
), () => {
  return {
    value: '',
    focus: false
  }
})

addStory.controlled('Field: number-input', readme, (setState, state) => (
  <div>
    <h2>Default</h2>
    <Field>
      <NumberInput />
    </Field>
    <h2>With label</h2>
    <Field label='Cars' id='cars'>
      <NumberInput />
    </Field>
    <h2>Error</h2>
    <Field error='You have to pick at least one car'>
      <NumberInput />
    </Field>
    <h2>Warning</h2>
    <Field warning='You picked a lot of cars'>
      <NumberInput />
    </Field>
    <h2>Hint</h2>
    <Field hint='Pick as many cars as you wish'>
      <NumberInput />
    </Field>
    <h2>With label, error, warning and hint</h2>
    <Field
      label='Cars'
      id='cars2'
      error='You have to pick at least one car'
      warning='You picked a lot of cars'
      hint='Pick as many cars as you wish'
    >
      <NumberInput />
    </Field>
    <h2>Focus state</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      Focus status: {state.focus ? 'Focus' : 'No focus'}
    </span>
    <Field
      label='Age*'
      onBlur={() => { setState({ focus: false }) }}
      onFocus={() => { setState({ focus: true }) }}
    >
      <NumberInput />
    </Field>
    <h2>With passed value</h2>
    <Field value={23}>
      <NumberInput />
    </Field>
    <h2>Controlled</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      You chose: {state.value} cars
    </span>
    <Field
      label='Cars'
      error={state.value < 1 ? 'You chose no cars' : undefined}
      hint='Pick some cars'
      warning={state.value > 8 ? 'Your chose a lot of cars' : undefined}
      onChange={(value) => { setState({value}) }}
    >
      <NumberInput value={state.value} />
    </Field>
  </div>
), () => {
  return {
    value: 0
  }
})

addStory.controlled('Field: checkbox', readme, (setState, state) => (
  <div>
    <h2>Default</h2>
    <Field>
      <Checkbox>Agree</Checkbox>
    </Field>
    <h2>With label</h2>
    <Field label='Terms' id='cars'>
      <Checkbox>Agree</Checkbox>
    </Field>
    <h2>Error</h2>
    <Field error='You have to agree'>
      <Checkbox>Agree</Checkbox>
    </Field>
    <h2>Warning</h2>
    <Field warning='Remember to agree'>
      <Checkbox>Agree</Checkbox>
    </Field>
    <h2>Hint</h2>
    <Field hint='Agree to terms'>
      <Checkbox>Agree</Checkbox>
    </Field>
    <h2>With label, error, warning and hint</h2>
    <Field
      label='Terms'
      id='cars2'
      error='You have to agree'
      warning='Remember to agree'
      hint='Agree to terms'
    >
      <Checkbox>Agree</Checkbox>
    </Field>
    <h2>Focus state</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      Focus status: {state.focus ? 'Focus' : 'No focus'}
    </span>
    <Field
      label='Agree*'
      onBlur={() => { setState({ focus: false }) }}
      onFocus={() => { setState({ focus: true }) }}
    >
      <Checkbox>Agree</Checkbox>
    </Field>
    <h2>Controlled</h2>
    <span style={{ display: 'inline-block', marginBottom: '16px', fontWeight: '700' }}>
      You { state.checked ? 'agree' : 'disagree' }
    </span>
    <Field onChange={checked => { setState({ checked }) }}>
      <Checkbox>Agree</Checkbox>
    </Field>
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

addStory('Field: message formatter', readme, () => (
  <div>
    <strong>Formatter:</strong> <code style={{ display: 'block', whiteSpace: 'pre' }}>{formatErrorMessage.toString()}</code>

    <br />

    <Field
      formatErrorMessage={formatErrorMessage}
      label='Element label'
      error='Error message'
      warning='Warning message'
      hint='Hint message'
    >
      <TextInput />
    </Field>
  </div>
))

addStory('Field: compositions', readme, () => (
  <div>
    <h2>Basic</h2>
    <Field
      label='Element label'
      error='Error message'
      warning='Warning message'
      hint='Hint message'
    >
      <TextInput />
    </Field>

    <h2>Horizontal</h2>
    <Field
      horizontal
      label='Element label'
      error='Error message'
      warning='Warning message'
      hint='Hint message'
    >
      <TextInput />
    </Field>

    <h2>Horizontal & spread</h2>
    <Field
      horizontal
      spread
      label='Element label'
      error='Error message'
      warning='Warning message'
      hint='Hint message'
    >
      <TextInput />
    </Field>
  </div>
))

addStory('RTL Field: compositions', readme, () => (
  <div dir='rtl'>
    <h2>Basic</h2>
    <Field
      label='תווית רכיב'
      error='הודעת שגיאה'
      warning='הודעת אזהרה'
      hint='רמז שדה נוסף'
    >
      <TextInput />
    </Field>

    <h2>Horizontal</h2>
    <Field
      horizontal
      label='תווית רכיב'
      error='הודעת שגיאה'
      warning='הודעת אזהרה'
      hint='רמז שדה נוסף'
    >
      <TextInput />
    </Field>

    <h2>Horizontal without hint</h2>
    <Field
      horizontal
      label='תווית רכיב'
      error='הודעת שגיאה'
      warning='הודעת אזהרה'
    >
      <TextInput />
    </Field>

    <h2>Horizontal & spread</h2>
    <Field
      horizontal
      spread
      label='תווית רכיב'
      error='הודעת שגיאה'
      warning='הודעת אזהרה'
      hint='רמז שדה נוסף'
    >
      <TextInput />
    </Field>

    <h2>Horizontal & spread without hint</h2>
    <Field
      horizontal
      spread
      label='תווית רכיב'
      error='הודעת שגיאה'
      warning='הודעת אזהרה'
    >
      <TextInput />
    </Field>
  </div>
))
