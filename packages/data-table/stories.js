import React from 'react'
import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Icon } from '@talixo/icon'

import DataTable from './src/DataTable'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('DataTable', module, {
  propTables: [ DataTable ]
})

// Mock data
const tableData = [
  { id: 0, opened: '16th Jan 2018', date_of_ride: '18th Feb 2018', assignee: 'John Smith', pickup: 'Berlin SXF Alexanderplatz' },
  { id: 1, opened: '17th Jan 2018', date_of_ride: '19th Feb 2018', assignee: 'Donald Duck', pickup: 'Krakow' },
  { id: 2, opened: '18th Jan 2018', date_of_ride: '20th Feb 2018', assignee: 'Mickey Mouse', pickup: 'Warszawa' },
  { id: 3, opened: '19th Jan 2018', date_of_ride: '21th Feb 2018', assignee: 'Captain Planet', pickup: 'Frankfurt' },
  { id: 4, opened: '20th Jan 2018', date_of_ride: '22th Feb 2018', assignee: 'Doctor Queen', pickup: 'Dortmund' },
  { id: 5, opened: '21th Jan 2018', date_of_ride: '23th Feb 2018', assignee: 'John Bull', pickup: 'Paris' },
  { id: 6, opened: '22th Jan 2018', date_of_ride: '24th Feb 2018', assignee: '', pickup: 'Barcelona' },
  { id: 7, opened: '23th Jan 2018', date_of_ride: '25th Feb 2018', assignee: 'John Smith', pickup: 'London' }
]

const columns = [
  { id: 'id', name: 'ID', render: cell => cell },
  { id: 'opened', name: 'Date opened', render: cell => cell },
  { id: 'assignee', name: 'Assignee' },
  { id: 'date_of_ride', name: 'Date of ride', render: cell => cell },
  { id: 'pickup', name: 'Pickup / Dropoff', renderHeader: name => <span><Icon name='directions_car' style={{ fontSize: 20 }} />{name}</span> },
  { id: 'actions', name: 'Actions' }
]

const actions = [
  { label: 'Duplicate', onClick: action('Duplicate'), icon: 'control_point_duplicate' },
  { label: 'Remove', onClick: action('Remove'), icon: 'clear' },
  { label: 'Assign', onClick: action('Assign'), icon: 'done', condition: row => !row.assignee }
]

// Stories
addStory('initial', readme, () => (
  <DataTable
    actions={actions}
    columns={columns}
    data={tableData}
    onSort={action('onSort')}
    verticalActionCell
    sortable
  />
))
