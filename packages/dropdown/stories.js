import React from 'react'

import ItemAddress from './src/ItemAddress'
import Dropdown from './src/Dropdown'
import DropdownButton from './src/DropdownButton'
import DropdownMenu from './src/DropdownMenu'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Dropdown', module)

const items = [
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

addStory('default', readme, () => (
  <Dropdown
    items={items}
    maxHeight='250px'
    overflow='truncate'
    placeholder='Select item'
    style={{ maxWidth: '500px' }}
  />
))
addStory('custom item component', readme, () => (
  <Dropdown
    itemComponent={ItemAddress}
    items={itemsCustom}
    maxHeight='250px'
    overflow='break'
    placeholder='Select accomodation'
    style={{ maxWidth: '500px' }}
  />
))
addStory('button', readme, () => (
  <DropdownButton
    placeholder='Select item'
  />
))
addStory('menu', readme, () => (
  <DropdownMenu
    highlightedIndex={0}
    itemComponent={ItemAddress}
    items={itemsCustom}
    overflow='break'
    style={{ maxWidth: '500px', position: 'relative' }}
  />
))
