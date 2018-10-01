import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Address, AddressPath } from '@talixo/address'

import AddressInput from './src/AddressInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('AddressInput', module, {
  propTables: [ AddressInput, Address, AddressPath ]
})

// Helpers
const locations = [
  {
    type: 'airport',
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
    type: 'airport',
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
    type: 'airport',
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
    type: 'airport',
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
    type: 'airport',
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
    type: 'airport',
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

function onLoadRequest (value) {
  return new Promise(resolve => {
    const _locations = locations.filter(location => {
      const query = value.toLowerCase()
      const address = location.address.toLowerCase()
      return address.indexOf(query) !== -1
    })

    setTimeout(() => resolve(_locations), 500)
  })
}

// Stories
addStory.controlled('address input', readme, (setState, state) => (
  <AddressInput
    loading={state.loading}
    value={state.value}
    locations={state.locations}
    onChange={(value) => setState({ value })}
    onLoadRequest={(value) => {
      setState({ loading: true })
      return onLoadRequest(value).then((locations) => setState({ loading: false, locations }))
    }}
    onStopRequest={() => setState({ loading: false, locations: [] })}
    placeholder='Start typing "ber"'
  />
), () => ({
  value: null,
  loading: false,
  locations: []
}))
