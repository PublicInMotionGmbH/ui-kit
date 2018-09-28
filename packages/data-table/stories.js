import React from 'react'
import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Icon } from '@talixo/icon'
import { Notification } from '@talixo/notification'
import { Footer, Cell } from '@talixo/table'

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

const tableDataCollapse = [
  { id: 0, opened: '17th Jan 2018', date_of_ride: '19th Feb 2018', assignee: 'Donald Truck', pickup: 'Krakow', info: { name: 'Josh Smith', value: '0.00', rank: 'Private', abb: 'PVT', phone: '987 654 13232' } },
  { id: 1, opened: '16th Jan 2018', date_of_ride: '18th Feb 2018', assignee: 'John Smith', pickup: 'Berlin', info: { name: 'Josh Smith I', value: '1.00', rank: 'Private Second Class', abb: 'PV2', phone: '987 654 13232' } },
  { id: 2, opened: '18th Jan 2018', date_of_ride: '20th Feb 2018', assignee: 'Matthew McMouse', pickup: 'Warszawa', info: { name: 'Josh Smith II', value: '11.00', rank: 'Private First Class', abb: 'PFC', phone: '987 654 13232' } },
  { id: 3, opened: '19th Jan 2018', date_of_ride: '21th Feb 2018', assignee: 'Andrew Planet', pickup: 'Frankfurt', info: { name: 'Josh Smith III', value: '22.00', rank: 'Specialist', abb: 'SPC', phone: '987 654 13232' } },
  { id: 4, opened: '20th Jan 2018', date_of_ride: '22th Feb 2018', assignee: 'Drew Drew', pickup: 'Dortmund', info: { name: 'Josh Smith IV', value: '33.00', rank: 'Corporal', abb: 'CPL', phone: '987 654 13232' } },
  { id: 5, opened: '21th Jan 2018', date_of_ride: '23th Feb 2018', assignee: 'John Bull', pickup: 'Paris', info: { name: 'Josh Smith V', value: '44.00', rank: 'Sergeant', abb: 'SGT', phone: '987 654 13232' } },
  { id: 6, opened: '22th Jan 2018', date_of_ride: '24th Feb 2018', assignee: 'Josh Josh', pickup: 'Barcelona', info: { name: 'Josh Smith VI', value: '55.00', rank: 'Staff Sergeant', abb: 'SSG', phone: '987 654 13232' } }
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

// Mock expand render
function expandRender (item) {
  const { info } = item
  return (
    <div className='storybook-data-table'>
      <div className='storybook-data-table__item'>Passenger details:</div>
      <div className='storybook-data-table__item'><Icon name='avatar' /> {info.name}</div>
      <div className='storybook-data-table__item'><Icon name='attach_money' /> {info.value}</div>
      <div className='storybook-data-table__item'><Icon name='assessment' /> {info.rank} ({info.abb})</div>
      <div className='storybook-data-table__item'><Icon name='phone' /> {info.phone}</div>
    </div>
  )
}

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

addStory('with footer', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomCells}
    data={tableData}
    footer={'Some footer content over there'}
  />
))

addStory('custom footer', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomCells}
    data={tableData}
  >
    <Footer>
      <Cell colSpan={4}>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
    </Footer>
  </DataTable>
))

addStory('custom headers', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomHeaders}
    data={tableData}
  />
))

addStory.controlled('clickable row', readme, (setState, state) => (
  <div>
    <DataTable
      actions={actions}
      columns={columnsCustomHeaders}
      data={tableData}
      onClick={(item) => setState({ notify: item })}
    />
    {
      state.notify &&
      <Notification className='storybook-data-table__notification' handleRemove={() => setState({notify: null})}>
        <h2>Details</h2>
        <div className='storybook-data-table__details'>
          <Icon name='avatar' /> Assignee: {state.notify.assignee}
        </div>
        <div className='storybook-data-table__details'>
          <Icon name='date_range' /> Opened: {state.notify.opened}
        </div>
        <div className='storybook-data-table__details'>
          <Icon name='date_range' /> Date of ride: {state.notify.date_of_ride}
        </div>
        <div className='storybook-data-table__details'>
          <Icon name='flight_takeoff' /> Pickup / Dropoff: {state.notify.pickup}
        </div>
      </Notification>
    }
  </div>
), () => ({ notify: null }))

addStory('sortable', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomHeaders}
    data={tableData}
    onSort={action('onSort')}
    sortable
  />
))

addStory('expandable rows', readme, () => (
  <DataTable
    actions={actions}
    columns={columnsCustomHeaders}
    data={tableDataCollapse}
    expandRender={expandRender}
    onClick={action('onClick')}
    onSort={action('onSort')}
    sortable
  />
))
