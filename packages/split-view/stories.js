import React from 'react'
import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Badge } from '@talixo/badge'
import { Button } from '@talixo/button'
import { Checkbox } from '@talixo/checkbox'
import { Icon } from '@talixo/icon'

import SplitView from './src/SplitView'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Split View', module, {
  propTables: [ SplitView ]
})

// Actions
const approve = action('Approve')
const change = action('Change')
const delAction = action('Delete')

// Mock data
const data = [
  { name: 'Josh Smith', value: 0, rank: 'Private', abb: 'PVT', phone: '987 654 13232' },
  { name: 'Josh Smith I', value: 1, rank: 'Private Second Class', abb: 'PV2', phone: '987 654 13232' },
  { name: 'Josh Smith II', value: 11, rank: 'Private First Class', abb: 'PFC', phone: '987 654 13232' },
  { name: 'Josh Smith III', value: 22, rank: 'Specialist', abb: 'SPC', phone: '987 654 13232' },
  { name: 'Josh Smith IV', value: 33, rank: 'Corporal', abb: 'CPL', phone: '987 654 13232' },
  { name: 'Josh Smith V', value: 44, rank: 'Sergeant', abb: 'SGT', phone: '987 654 13232' },
  { name: 'Josh Smith VI', value: 55, rank: 'Staff Sergeant', abb: 'SSG', phone: '987 654 13232' }
]

const dataLong = [
  { name: 'Josh Smith', value: 0, rank: 'Private', abb: 'PVT', phone: '987 654 13232' },
  { name: 'Josh Smith I', value: 1, rank: 'Private Second Class', abb: 'PV2', phone: '987 654 13232' },
  { name: 'Josh Smith II', value: 11, rank: 'Private First Class', abb: 'PFC', phone: '987 654 13232' },
  { name: 'Josh Smith III', value: 22, rank: 'Specialist', abb: 'SPC', phone: '987 654 13232' },
  { name: 'Josh Smith IV', value: 33, rank: 'Corporal', abb: 'CPL', phone: '987 654 13232' },
  { name: 'Josh Smith V', value: 44, rank: 'Sergeant', abb: 'SGT', phone: '987 654 13232' },
  { name: 'Josh Smith VI', value: 55, rank: 'Staff Sergeant', abb: 'SSG', phone: '987 654 13232' },
  { name: 'Josh Smith VII', value: 66, rank: 'Sergeant First Class', abb: 'SFC', phone: '987 654 13232' },
  { name: 'Josh Smith VIII', value: 88, rank: 'Master Sergeant', abb: 'MSG', phone: '987 654 13232' },
  { name: 'Josh Smith IX', value: 99, rank: 'First Sergeant', abb: '1SG', phone: '987 654 13232' },
  { name: 'Josh Smith XI', value: 222, rank: 'Sergeant Major', abb: 'SGM', phone: '987 654 13232' },
  { name: 'Josh Smith XII', value: 333, rank: 'Command Sergeant Major', abb: 'CSM', phone: '987 654 13232' },
  { name: 'Josh Smith XIII', value: 444, rank: 'Sergeant Major of the Army', abb: 'SMA', phone: '987 654 13232' },
  { name: 'Josh Smith XIV', value: 555, rank: 'Warrant Officer 1', abb: 'WO1', phone: '987 654 13232' },
  { name: 'Josh Smith XV', value: 666, rank: 'Chief Warrant Officer 2', abb: 'CW2', phone: '987 654 13232' },
  { name: 'Josh Smith XVI', value: 777, rank: 'Chief Warrant Officer 3', abb: 'CW3', phone: '987 654 13232' },
  { name: 'Josh Smith XVII', value: 888, rank: 'Chief Warrant Officer 4', abb: 'CW4', phone: '987 654 13232' },
  { name: 'Josh Smith XVIII', value: 999, rank: 'Chief Warrant Officer 5', abb: 'CW5', phone: '987 654 13232' },
  { name: 'Josh Smith XIX', value: 1111, rank: 'Second Lieutenant', abb: '2LT', phone: '987 654 13232' },
  { name: 'Josh Smith XX', value: 2222, rank: 'First Lieutenant', abb: '1LT', phone: '987 654 13232' },
  { name: 'Josh Smith XXI', value: 3333, rank: 'Captain', abb: 'CPT', phone: '987 654 13232' },
  { name: 'Josh Smith XXII', value: 4444, rank: 'Major', abb: 'MAJ', phone: '987 654 13232' },
  { name: 'Josh Smith XXIII', value: 5555, rank: 'Lieutenant Colonel', abb: 'LTC', phone: '987 654 13232' },
  { name: 'Josh Smith XXIV', value: 6666, rank: 'Colonel', abb: 'COL', phone: '987 654 13232' },
  { name: 'Josh Smith XXV', value: 7777, rank: 'Brigadier General', abb: 'BG', phone: '987 654 13232' },
  { name: 'Josh Smith XXVI', value: 8888, rank: 'Major General', abb: 'MG', phone: '987 654 13232' },
  { name: 'Josh Smith XXVII', value: 9999, rank: 'Lieutenant General', abb: 'LTG', phone: '987 654 13232' },
  { name: 'Josh Smith XXVIII', value: 11111, rank: 'General', abb: 'GEN', phone: '987 654 13232' },
  { name: 'Josh Smith XXIX', value: 22222, rank: 'General of the Army', abb: 'GA', phone: '987 654 13232' }
]

// Render functions
function itemRender (item) {
  return (
    <div className='storybook__split-view__list-item'>
      <div>
        {item.name} <Badge>{item.value}</Badge>
      </div>
    </div>
  )
}
function itemRenderHeader (item) {
  return (
    <div className='storybook__split-view__list-item'>
      <div>
        <Checkbox onChange={change}>{item.name} <Badge>{item.value}</Badge></Checkbox>
      </div>
    </div>
  )
}

function detailsRender (item) {
  return (
    <div className='storybook__split-view__details'>
      <div className='storybook__split-view__details__item'>
        <Icon name='avatar' />
        <span>{item.name}</span>
      </div>
      <div className='storybook__split-view__details__item'>
        <Icon name='stars' />
        <span>
          {item.rank}
          <span className='storybook__split-view__details__subtitle'> ({item.abb})</span>
        </span>
      </div>
      <div className='storybook__split-view__details__item'>
        <Icon name='phone' /><span>{item.phone}</span>
      </div>
    </div>
  )
}

function ListHeader (props) {
  return (
    <div {...props}>
      <div>Soldiers Information Cards</div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={delAction}>Delete</Button> <Button onClick={approve}>Approve</Button>
      </div>
    </div>
  )
}

// Stories
addStory('initial', readme, () => (
  <SplitView
    data={data}
  />
))

addStory('customized', readme, () => (
  <SplitView
    data={data}
    detailsRender={detailsRender}
    itemRender={itemRender}
  />
))

addStory('with header', readme, () => (
  <SplitView
    data={data}
    detailsRender={detailsRender}
    itemRender={itemRenderHeader}
    listHeader={<ListHeader className='storybook__split-view__header' />}
  />
))

addStory('scrollable', readme, () => (
  <div style={{ height: '500px' }}>
    <SplitView
      data={dataLong}
      detailsRender={detailsRender}
      itemRender={itemRender}
      listHeader={<ListHeader className='storybook__split-view__header' />}
    />
  </div>
))

addStory.controlled('external control', readme, (setState, state) => (
  <div style={{ height: '500px' }}>
    <SplitView
      data={dataLong}
      detailsRender={detailsRender}
      itemRender={itemRender}
      listHeader={<ListHeader className='storybook__split-view__header' />}
      openItem={state.openItem}
      onSelect={(item) => setState({ openItem: item })}
    />
  </div>
), () => ({ openItem: { name: 'Adam Gist', value: 3, rank: 'Not on the list', abb: 'NN', phone: '123 321 321123' } }))
