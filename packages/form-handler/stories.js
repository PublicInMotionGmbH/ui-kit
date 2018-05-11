import React from 'react'
import yup from 'yup'

import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Button } from '@talixo/button'
import { Calendar } from '@talixo/calendar'
import { Checkbox } from '@talixo/checkbox'
import { ControlGroup } from '@talixo/control-group'
import { Fieldset } from '@talixo/fieldset'
import { FormField } from '@talixo/form-field'
import { Icon } from '@talixo/icon'
import { NumberInput } from '@talixo/number-input'
import { PhoneInput } from '@talixo/phone-input'
import { SelectBox } from '@talixo/combo-box'
import { TextInput } from '@talixo/text-input'

import FormHandler from './src/FormHandler'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Form Handler', module, {
  propTables: [ FormHandler ],
  propTablesExclude: [
    Button, Calendar, ControlGroup, Checkbox, Fieldset,
    Icon, NumberInput, PhoneInput, TextInput, FormField, SelectBox
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

addStory('default', readme, () => (
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
addStory.controlled('custom error', readme, (setState, state) => (
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

addStory('login with yup validation', readme, () => (
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

addStory('order', readme, () => (
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
addStory.controlled('booking', readme, (setState, state) => (
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
      <FormField label='Passengers' {...commonProps}>
        <NumberInput min={0} max={4} style={{ width: '30%' }} />
      </FormField>
    </Fieldset>
    <ControlGroup position='center'>
      <Button type='submit'>Book</Button>
    </ControlGroup>
  </FormHandler>
), () => ({ from: null, to: null }))
