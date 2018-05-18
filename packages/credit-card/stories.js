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

// Stories

addStory('credit card input', readme, () => (
  <CreditCardInput onChange={action('change')} />
))

addStory('credit card number input', readme, () => (
  <CreditCardNumberInput onChange={action('change')} />
))

addStory('expiration date input', readme, () => (
  <ExpirationDateInput onChange={action('change')} />
))

addStory('expiration date input with passed value', readme, () => (
  <ExpirationDateInput value={{ month: 1, year: 2012 }} onChange={action('change')} />
))
