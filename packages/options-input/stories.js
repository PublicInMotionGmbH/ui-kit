import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import OptionsInput from './src/OptionsInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('OptionsInput', module, {
  propTables: [ OptionsInput ]
})

const styles = {
  display: 'inline-block',
  left: '80px',
  width: 'auto'
}

// Stories
addStory('initial', readme, () => (
  <OptionsInput
    style={styles}
    options={[
      { id: 'person', icon: 'person', label: 'Adults', description: 'Older than 15' },
      { id: 'rocket', icon: 'rocket', label: 'Rockets' },
      { id: 'children', icon: 'face', label: 'Children', description: 'Younger than 15' }
    ]}
  />
))

addStory('with default values', readme, () => (
  <OptionsInput
    style={styles}
    options={[
      { id: 'android', icon: 'android', label: 'Androids', description: 'Operation system', default: 5 },
      { id: 'battery', icon: 'battery_charging_full', label: 'Batteries', default: 100 },
      { id: 'phone', icon: 'phone_android', label: 'Phones', default: 999 },
      { id: 'rocket', icon: 'rocket', label: 'Rockets' }
    ]}
  />
))

addStory('with min and max values', readme, () => (
  <OptionsInput
    style={styles}
    options={[
      { id: 'product', icon: 'shopping_cart', label: 'Products', description: 'min: 1, max: 10', min: 1, max: 10, default: 1 },
      { id: 'luggage', icon: 'work', label: 'Luggages', description: 'min: 5, max: 7', min: 5, max: 7, default: 6 },
      { id: 'star', icon: 'star', label: 'Stars', description: 'min: 10, max: 10', min: 10, max: 10, default: 10 }
    ]}
  />
))

addStory('with persisted options', readme, () => (
  <OptionsInput
    style={styles}
    options={[
      { id: 'product', icon: 'shopping_cart', label: 'Products', description: 'min: 1, max: 10', min: 1, max: 10, default: 1 },
      { id: 'luggage', icon: 'work', label: 'Luggages', description: 'min: 0, max: 7', min: 0, max: 7, default: 0 },
      { id: 'star', icon: 'star', label: 'Stars', description: 'min: -10, max: 10', min: -10, max: 10, default: 0 }
    ]}
    persistentOptions={['star']}
  />
))

addStory.controlled('controlled', readme, (setState, state) => (
  <OptionsInput
    style={styles}
    value={state.value}
    onChange={value => setState({ value })}
    options={[
      { id: 'product', icon: 'shopping_cart', label: 'Products', description: 'min: 1, max: 10', min: 1, max: 10, default: 1 },
      { id: 'luggage', icon: 'work', label: 'Luggages', description: 'min: 5, max: 7', min: 5, max: 7, default: 6 },
      { id: 'star', icon: 'star', label: 'Stars', description: 'min: 10, max: 10', min: 10, max: 10, default: 10 },
      { id: 'rocket', icon: 'rocket', label: 'Rockets', description: 'min: 0', min: 0 }
    ]}
  />
), () => ({ value: { product: 3 } }))
