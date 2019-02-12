import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Icon } from '@talixo/icon'

import AddressPath from './src/AddressPath'
import Address from './src/Address'
import AddressIconsProvider from './src/AddressIconsProvider'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Address', module, {
  propTables: [ Address, AddressPath, AddressIconsProvider ]
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

const formatDetails = x => <div><Icon name='streetview' /> {x}</div>

addStory('address', readme, () => (
  <Address
    type='garden'
    details='Look at this garden!'
    address='Hokkaido Garden Airport'
  />
))

addStory('address with details formatter', readme, () => (
  <Address
    type='place'
    details='Oh my garden!'
    formatDetails={formatDetails}
    address='Hokkaido Garden Airport'
  />
))

addStory('custom address icons', readme, () => (
  <AddressIconsProvider types={{
    default: 'star',
    place: 'local_hospital',
    'food-is-amazing': 'local_dining'
  }}>
    <Address
      type='place'
      details='Look at this garden!'
      address='Hokkaido Garden Airport'
    />
    <div style={{ padding: 20 }}>
      <Address
        type='food-is-amazing'
        details='Delicious Street, Some city, Some country'
        address='The best restaurant'
      />
    </div>
  </AddressIconsProvider>
))

addStory('address path', readme, () => (
  <AddressPath>
    {locations.map((location, index) => (
      <Address key={index} {...location} />
    ))}
  </AddressPath>
))

addStory('RTL: address path', readme, () => (
  <div dir='rtl'>
    <AddressPath>
      {locations.map((location, index) => (
        <Address key={index} {...location} />
      ))}
    </AddressPath>
  </div>
))
