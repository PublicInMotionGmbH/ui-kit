import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import CreditCardInput from './src/CreditCardInput'
import CreditCardNumberInput from './src/CreditCardNumberInput'
import ExpirationDateInput from './src/ExpirationDateInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Credit Card', module, {
  propTables: [ ExpirationDateInput ]
})

const blur = action('blur')
const change = action('change')
const focus = action('focus')
const submit = action('submit')

// Stories

addStory('credit card input', readme, () => (
  <CreditCardInput
    onChange={change}
    onBlur={blur}
    onFocus={focus}
    onSubmit={submit}
  />
))

addStory('custom credit card input', readme, () => (
  <CreditCardInput
    onChange={change}
    onBlur={blur}
    onFocus={focus}
    onSubmit={submit}
    cardHolderNameLabel='Nombre en la tarjeta*'
    cardNumberLabel='Número de tarjeta*'
    cardExpirationDateLabel='Fecha de caducidad*'
    cvcLabel='CVC*'
    header='Pago'
  />
))

addStory.controlled('controlled credit card input', readme, (setState, state) => (
  <div>
    <span>
      <strong>Name: </strong>
      {state.cardHolderName}
    </span>
    <br />
    <span>
      <strong>Card number: </strong>
      {state.cardNumber}
    </span>
    <br />
    <span>
      <strong>Expiration date: </strong>
      {state.cardExpirationDate &&
        <span>{state.cardExpirationDate.month}/{state.cardExpirationDate.year}</span>
      }
    </span>
    <br />
    <span>
      <strong>CVC: </strong>
      {state.cvc}
    </span>
    <br />
    <CreditCardInput
      onChange={(value, name) => setState({ [name]: value })}
      onBlur={blur}
      onFocus={focus}
      onSubmit={submit}
      values={state.values}
    />
  </div>
), () => ({
  values: {
    cardHolderName: '',
    cardNumber: '',
    cardExpirationDate: null,
    cvc: ''
  }
}))

addStory('credit card number input', readme, () => (
  <CreditCardNumberInput onChange={action('change')} />
))

addStory('expiration date input', readme, () => (
  <ExpirationDateInput onChange={action('change')} />
))

addStory('expiration date input with passed value', readme, () => (
  <ExpirationDateInput value={{ month: 1, year: 2012 }} onChange={action('change')} />
))
