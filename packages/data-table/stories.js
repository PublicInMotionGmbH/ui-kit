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

// Mocks
// Mock data
const tableData = [
  { id: 0, opened: '17th Jan 2018', date_of_ride: '19th Feb 2018', assignee: 'Donald Truck', pickup: 'Krakow' },
  { id: 1, opened: '16th Jan 2018', date_of_ride: '18th Feb 2018', assignee: 'John Smith', pickup: 'Berlin' },
  { id: 2, opened: '18th Jan 2018', date_of_ride: '20th Feb 2018', assignee: 'Matthew McMouse', pickup: 'Warszawa' },
  { id: 3, opened: '19th Jan 2018', date_of_ride: '21th Feb 2018', assignee: 'Andrew Planet', pickup: 'Frankfurt' },
  { id: 4, opened: '20th Jan 2018', date_of_ride: '22th Feb 2018', assignee: 'Drew Drew', pickup: 'Dortmund' },
  { id: 5, opened: '21th Jan 2018', date_of_ride: '23th Feb 2018', assignee: 'John Bull', pickup: 'Paris' },
  { id: 6, opened: '22th Jan 2018', date_of_ride: '24th Feb 2018', assignee: 'Josh Josh', pickup: 'Barcelona' },
  { id: 7, opened: '23th Jan 2018', date_of_ride: '25th Feb 2018', assignee: 'John Smith', pickup: 'London' }
]
const tableDataNoAssignee = [
  { id: 0, opened: '17th Jan 2018', date_of_ride: '19th Feb 2018', assignee: 'Donald Truck', pickup: 'Krakow' },
  { id: 1, opened: '16th Jan 2018', date_of_ride: '18th Feb 2018', assignee: '', pickup: 'Berlin' },
  { id: 2, opened: '18th Jan 2018', date_of_ride: '20th Feb 2018', assignee: '', pickup: 'Warszawa' },
  { id: 3, opened: '19th Jan 2018', date_of_ride: '21th Feb 2018', assignee: 'Andrew Planet', pickup: 'Frankfurt' },
  { id: 4, opened: '20th Jan 2018', date_of_ride: '22th Feb 2018', assignee: '', pickup: 'Dortmund' },
  { id: 5, opened: '21th Jan 2018', date_of_ride: '23th Feb 2018', assignee: 'John Bull', pickup: 'Paris' },
  { id: 6, opened: '22th Jan 2018', date_of_ride: '24th Feb 2018', assignee: '', pickup: 'Barcelona' },
  { id: 7, opened: '23th Jan 2018', date_of_ride: '25th Feb 2018', assignee: 'John Smith', pickup: 'London' }
]

// Mock columns
const columns = [
  { id: 'id', name: 'ID' },
  { id: 'opened', name: 'Date opened' },
  { id: 'assignee', name: 'Assignee' },
  { id: 'date_of_ride', name: 'Date of ride' },
  { id: 'pickup', name: 'Pickup / Dropoff' }
]
const columnsWithAction = [
  { id: 'id', name: 'ID' },
  { id: 'opened', name: 'Date opened' },
  { id: 'assignee', name: 'Assignee' },
  { id: 'date_of_ride', name: 'Date of ride' },
  { id: 'pickup', name: 'Pickup / Dropoff' },
  { id: 'actions', name: 'Actions' }
]

const columnsCustomCells = [
  { id: 'id', name: 'ID', render: cell => cell },
  { id: 'opened', name: 'Date opened', render: cell => <span><Icon name='date_range' /> {cell}</span> },
  { id: 'assignee', name: 'Assignee', render: cell => <span><Icon name='person' /> {cell}</span> },
  { id: 'date_of_ride', name: 'Date of ride', render: cell => <span><Icon name='date_range' /> {cell}</span> },
  { id: 'pickup', name: 'Pickup / Dropoff', render: cell => <span><Icon name='flight_takeoff' /> {cell}</span> },
  { id: 'actions', name: 'Actions' }
]

const columnsCustomHeaders = [
  { id: 'id', name: 'ID' },
  { id: 'opened', name: 'Date opened', renderHeader: name => <span><Icon name='date_range' /> {name}</span> },
  { id: 'assignee', name: 'Assignee', renderHeader: name => <span><Icon name='person' /> {name}</span> },
  { id: 'date_of_ride', name: 'Date of ride', renderHeader: name => <span><Icon name='date_range' /> {name}</span> },
  { id: 'pickup', name: 'Pickup / Dropoff', renderHeader: name => <span><Icon name='flight_takeoff' /> {name}</span> },
  { id: 'actions', name: 'Actions', renderHeader: name => <span><Icon name='settings' /> {name}</span> }
]

// Mock Actions
const actions = [
  { label: 'Duplicate', onClick: action('Duplicate'), icon: 'control_point_duplicate' },
  { label: 'Remove', onClick: action('Remove'), icon: 'clear' },
  { label: 'Assign', onClick: action('Assign'), icon: 'done' }
]

const actionsConditional = [
  { label: 'Assign', onClick: action('Assign'), icon: 'done', condition: row => !row.assignee },
  { label: 'Duplicate', onClick: action('Duplicate'), icon: 'control_point_duplicate', condition: row => row.assignee },
  { label: 'Remove', onClick: action('Remove'), icon: 'clear' }
]

// Stories
addStory('initial', readme, () => (
  <DataTable
    columns={columns}
    data={tableData}
  />
))

addStory('with actions cell', readme, () => (
  <div>
    <h2>Horizontal actions cell</h2>
    <DataTable
      actions={actions}
      columns={columnsWithAction}
      data={tableData}
    />
    <br />
    <h2>Vertical actions cell</h2>
    <DataTable
      actions={actions}
      columns={columnsWithAction}
      data={tableData}
      verticalActionCell
    />
  </div>
))

addStory('with conditional actions', readme, () => (
  <div>
    <h2>Horizontal actions cell</h2>
    <DataTable
      actions={actionsConditional}
      columns={columnsWithAction}
      data={tableDataNoAssignee}
    />
    <br />
    <h2>Vertical actions cell</h2>
    <DataTable
      actions={actionsConditional}
      columns={columnsWithAction}
      data={tableDataNoAssignee}
      verticalActionCell
    />
  </div>
))

addStory('custom cells', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomCells}
    data={tableData}
  />
))

addStory('custom haders', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomHeaders}
    data={tableData}
  />
))

addStory('sortable', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomHeaders}
    data={tableData}
    onSort={action('onSort')}
    sortable
  />
))
