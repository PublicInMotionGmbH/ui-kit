import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Checkbox } from '@talixo/checkbox'
import { NumberInput } from '@talixo/number-input'
import { TextInput } from '@talixo/text-input'

import FormField from './src/FormField'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('FormField', module, {
  propTables: [ FormField ],
  propTablesExclude: [ Checkbox, NumberInput, TextInput ]
})

// Stories

addStory.controlled('text-input', readme, (setState, state) => (
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

addStory.controlled('number-input', readme, (setState, state) => (
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

addStory.controlled('checkbox', readme, (setState, state) => (
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
      You { state.checked ? 'Agree' : 'Disagree' }
    </span>
    <FormField onChange={(e) => { setState({ checked: e.target.checked }) }}>
      <Checkbox>Agree</Checkbox>
    </FormField>
  </div>
), () => {
  return {
    checked: false
  }
})
