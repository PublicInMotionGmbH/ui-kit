import React from 'react'
import { orderBy } from 'lodash'

export const tableData = [
  { id: 0, opened: '16th Jan 2018', date_of_ride: '18th Feb 2018', assignee: 'John Smith', pickup: 'Berlin SXF Alexanderplatz' },
  { id: 1, opened: '17th Jan 2018', date_of_ride: '19th Feb 2018', assignee: '', pickup: 'Krakow' },
  { id: 2, opened: '18th Jan 2018', date_of_ride: '20th Feb 2018', assignee: 'Mickey Mouse', pickup: 'Warszawa' }
]

export const tableDataSort = (col, dir = 'asc') => orderBy(tableData, col, dir)

export const columns = [
  { id: 'id', name: 'ID' },
  { id: 'opened', name: 'Date opened' },
  { id: 'assignee', name: 'Assignee', render: cell => <span className='test-span'>{cell}</span> },
  { id: 'date_of_ride', name: 'Date of ride', render: cell => cell },
  {
    id: 'pickup',
    name: 'Pickup / Dropoff',
    renderHeader: name => <span className='test-span'>{name}</span>
  },
  { id: 'actions', name: 'Actions', renderHeader: name => <span className='test-span'>{name}</span> }

]
export const columnsWithActions = [
  { id: 'id', name: 'ID' },
  { id: 'opened', name: 'Date opened' },
  { id: 'assignee', name: 'Assignee' },
  { id: 'date_of_ride', name: 'Date of ride' },
  {
    id: 'pickup',
    name: 'Pickup / Dropoff',
    renderHeader: name => <span className='test-span'>{name}</span>
  },
  { id: 'actions', name: 'Actions' }
]

export const actions = [
  { label: 'Duplicate', onClick: jest.fn(), icon: 'control_point_duplicate' },
  { label: 'Remove', onClick: jest.fn(), icon: 'clear' },
  { label: 'Assign', onClick: jest.fn(), icon: 'done', condition: row => !!row.assignee }
]
