import React from 'react'

import Autocomplete from './src/Autocomplete'
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

const filter = (inputValue, state, setState) => {
  let filteredItems = items.filter(i => i.toString().toLowerCase().includes(inputValue.toString().toLowerCase()))
  setState({ items: filteredItems })
}

// simple solution to prevent race conditions
let lazyCounter = 0

const getLazilyFilteredItems = ({ inputValue, requestId }) => {
  const delay = 1000 + Math.random() * 2000

  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`RESOLVING ${requestId}`)
      resolve({
        requestId: requestId,
        items: items.filter(i => i.toString().toLowerCase().includes(inputValue.toString().toLowerCase()))
      })
    }, delay)
    console.log(`WAITING ${delay}ms for ${requestId}`)
  })
}

const lazyFilter = async (inputValue, state, setState) => {
  const requestId = lazyCounter++
  setState({ requestId: requestId, loading: true })

  const response = await getLazilyFilteredItems({ inputValue, requestId })

  if (response.requestId === state.requestId) {
    setState({ items: response.items, loading: false, requestId: null })
  } else {
    console.warn('RACE CONDITION PREVENTED', response.requestId)
  }
}

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

addStory('dropdown separated', readme, () => (
  <Dropdown
    items={items}
    maxHeight='250px'
    onChange={change}
    overflow='truncate'
    placeholder='Select item'
    separated
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

addStory('autocomplete', readme, () => (
  <Autocomplete
    items={items}
    maxHeight='250px'
    onChange={change}
    overflow='break'
    placeholder='Select item'
    style={{ maxWidth: '500px' }}
  />
))

addStory('autocomplete separated', readme, () => (
  <Autocomplete
    items={items}
    maxHeight='250px'
    onChange={change}
    overflow='break'
    placeholder='Select item'
    separated
    style={{ maxWidth: '500px' }}
  />
))

addStory.controlled('autocomplete with filtering', readme, (setState, state) => (
  <Autocomplete
    items={state.items}
    maxHeight='250px'
    onChange={change}
    onInputValueChange={inputValue => filter(inputValue, state, setState)}
    overflow='break'
    placeholder='Select item'
    style={{ maxWidth: '500px' }}
  />
), () => ({
  items: items
}))

addStory.controlled('autocomplete with lazy filtering', readme, (setState, state) => (
  <Autocomplete
    items={state.items}
    loading={state.loading}
    maxHeight='250px'
    onChange={change}
    onInputValueChange={inputValue => lazyFilter(inputValue, state, setState)}
    overflow='break'
    placeholder='Select item'
    style={{ maxWidth: '500px' }}
  />
), () => ({
  items: [],
  loading: false,
  requestId: null
}))
