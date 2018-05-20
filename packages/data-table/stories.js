import React from 'react'
import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import DataTable from './src/DataTable'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('DataTable', module, {
  propTables: [ DataTable ]
})

// Mock data
const tableData = [
  { id: 0, opened: '16th Jan 2018', date_of_ride: '18th Feb 2018', pickup: 'Berlin SXF Alexanderplatz' },
  { id: 1, opened: '17th Jan 2018', date_of_ride: '19th Feb 2018', pickup: 'Krakow' },
  { id: 2, opened: '18th Jan 2018', date_of_ride: '20th Feb 2018', pickup: 'Warszawa' },
  { id: 3, opened: '19th Jan 2018', date_of_ride: '21th Feb 2018', pickup: 'Frankfurt' },
  { id: 4, opened: '20th Jan 2018', date_of_ride: '22th Feb 2018', pickup: 'Dortmund' },
  { id: 5, opened: '21th Jan 2018', date_of_ride: '23th Feb 2018', pickup: 'Paris' },
  { id: 6, opened: '22th Jan 2018', date_of_ride: '24th Feb 2018', pickup: 'Barcelona' },
  { id: 7, opened: '23th Jan 2018', date_of_ride: '25th Feb 2018', pickup: 'London' }
]

const headers = {
  id: 'ID',
  opened: 'Date opened',
  date_of_ride: 'Date of ride',
  pickup: 'Pickup / Dropoff',
  actions: 'Actions'
}

const actions = [
  { label: 'Assign', onClick: action('Assign'), icon: 'done' },
  { label: 'Duplicate', onClick: action('Duplicate'), icon: 'control_point_duplicate' },
  { label: 'Remove', onClick: action('Remove'), icon: 'clear' }
]

// Stories

addStory('initial', readme, () => (
  <DataTable
    actions={actions}
    headers={headers}
    data={tableData}
    onSort={action('onSort')}
    sortable
  />
))
