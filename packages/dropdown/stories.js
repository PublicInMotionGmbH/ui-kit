import React from 'react'

// import AddressItem from '../src/AddressItem'
import Dropdown from './src/Dropdown'
import DropdownButtonRenderer from './src/DropdownButtonRenderer'
import DropdownMenu from './src/DropdownMenu'
// import Tooltip from './components/Tooltip/Tooltip'
// import TooltipDropdownMenu from './src/TooltipDropdownMenu'

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

addStory('default', readme, () => (
  <Dropdown
    items={items}
    maxHeight='250px'
    menuComponent={DropdownMenu}
    // onChange={selectedItem => alert(selectedItem)}
    overflow='truncate'
    placeholder='Select item'
    style={{ maxWidth: '500px' }}
    toggleComponent={DropdownButtonRenderer}
  />
))
