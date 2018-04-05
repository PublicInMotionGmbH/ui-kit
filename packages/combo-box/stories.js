import React from 'react'

import ItemAddress from './src/ItemAddress'
import Dropdown from './src/Dropdown'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('ComboBox', module)
const change = action('change')

const items = [
  0,
  1,
  'apple',
  'orange',
  'carrot',
  'pineapple',
  'veeeeeeeeeeeeeeeeeeeeeery loooooooooooooooooooooooong banananananannananananannananananana',
  'onion',
  'watermelon',
  'strawberry',
  'raspberry'
]

const itemsCustom = [
  {
    icon: 'credit_card',
    place: 'Motel One Berlin-Upper West',
    address: 'Kantstraße 163-165, 10623 Berlin'
  },
  {
    icon: 'card_travel',
    place: 'Park Inn Berlin',
    address: 'Alexanderpl. 7, 10178 Berlin'
  },
  {
    icon: 'credit_card',
    place: 'The Westin Grand Berlin',
    address: 'Friedrichstraße 158-164, 10117 Berlin'
  }
]

addStory('dropdown', readme, () => (
  <Dropdown
    items={items}
    maxHeight='250px'
    onChange={change}
    overflow='truncate'
    placeholder='Select item'
    style={{ maxWidth: '500px' }}
  />
))

addStory('dropdown with custom item component', readme, () => (
  <Dropdown
    itemComponent={ItemAddress}
    items={itemsCustom}
    maxHeight='250px'
    onChange={change}
    overflow='break'
    placeholder='Select accomodation'
    style={{ maxWidth: '500px' }}
  />
))
