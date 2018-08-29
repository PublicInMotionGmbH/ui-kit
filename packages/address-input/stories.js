import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Icon } from '@talixo/icon'

import AddressInput from './src/AddressInput'
import AddressPath from './src/AddressPath'
import Address from './src/Address'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('AddressInput', module, {
  propTables: [ AddressInput ]
})

// Helpers
const locations = [
  {
    icon: 'airport',
    short: 'BER',
    address: 'Berlin Brandenburg Airport (BER)',
    details: 'Berlin',
    meta: {
      description: 'Berlin Brandenburg Airport (BER)',
      geometry: {
        location: {
          lat: 52.366667,
          lng: 13.503333
        }
      }
    }
  },
  {
    icon: 'airport',
    short: 'BRN',
    address: 'Bern Airport (BRN)',
    details: 'Berne',
    meta: {
      description: 'Bern Airport (BRN)',
      geometry: {
        location: {
          lat: 46.911728,
          lng: 7.50356
        }
      }
    }
  },
  {
    icon: 'airport',
    short: 'PBE',
    address: 'Puerto Berrio Airport (PBE)',
    details: 'Puerto Berrio',
    meta: {
      description: 'Puerto Berrio Airport (PBE)',
      geometry: {
        location: {
          lat: 6.483333,
          lng: -74.483333
        }
      }
    }
  },
  {
    icon: 'airport',
    short: 'UIZ',
    address: 'Berz-Macomb Airport (UIZ)',
    details: 'Utica',
    meta: {
      description: 'Berz-Macomb Airport (UIZ)',
      geometry: {
        location: {
          lat: 42.616667,
          lng: -83.05
        }
      }
    }
  },
  {
    icon: 'airport',
    short: 'EGC',
    address: 'Roumanieres Airport (EGC)',
    details: 'Bergerac',
    meta: {
      description: 'Roumanieres Airport (EGC)',
      geometry: {
        location: {
          lat: 44.85,
          lng: 0.483333
        }
      }
    }
  },
  {
    icon: 'airport',
    short: 'BYU',
    address: 'Bindlacher-Berg Airport (BYU)',
    details: 'Bayreuth',
    meta: {
      description: 'Bindlacher-Berg Airport (BYU)',
      geometry: {
        location: {
          lat: 49.985556,
          lng: 11.64
        }
      }
    }
  }
]

const detailsFormatter = x => (<div><Icon name='streetview' /> {x}</div>)

async function onLoadRequest (value) {
  const filterLocations = new Promise((resolve, reject) => {
    const _locations = locations.filter((location) => {
      const query = value.toLowerCase()
      const address = location.address.toLowerCase()
      return address.indexOf(query) !== -1
    })
    setTimeout(resolve(_locations), 100)
  })
  const result = await filterLocations
  return result
}

// Stories
addStory.controlled('address input', readme, (setState, state) => (
  <AddressInput
    value={state.value}
    locations={state.locations}
    onChange={(value) => setState({ value })}
    onLoadRequest={(value) => onLoadRequest(value).then((locations) => setState({ locations }))}
    onStopRequest={() => setState({ locations: [] })}
    placeholder='Start typing "ber"'
  />
), () => ({
  value: null,
  locations: []
}))

addStory('address', readme, () => (
  <Address
    icon='garden'
    details='Look at this garden!'
    address='Hokkaido Garden Airport'
  />
))

addStory('address with details formatter', readme, () => (
  <Address
    icon='place'
    details='Oh my garden!'
    detailsFormatter={detailsFormatter}
    address='Hokkaido Garden Airport'
  />
))

addStory('address path', readme, () => (
  <AddressPath>
    {
      locations.map((location, index) => (
        <Address key={index} {...location} />
      ))
    }
  </AddressPath>
))
