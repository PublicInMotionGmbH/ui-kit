import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import SplitView from './src/SplitView'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Split View', module, {
  propTables: [ SplitView ]
})

// Mock data
const data = [
  { name: 'Josh Smith', value: 0, rank: 'Private', abb: 'PVT' },
  { name: 'Josh Smith I', value: 1, rank: 'Private Second Class', abb: 'PV2' },
  { name: 'Josh Smith II', value: 11, rank: 'Private First Class', abb: 'PFC' },
  { name: 'Josh Smith III', value: 22, rank: 'Specialist', abb: 'SPC' },
  { name: 'Josh Smith IV', value: 33, rank: 'Corporal', abb: 'CPL' },
  { name: 'Josh Smith V', value: 44, rank: 'Sergeant', abb: 'SGT' },
  { name: 'Josh Smith VI', value: 55, rank: 'Staff Sergeant', abb: 'SSG' },
  { name: 'Josh Smith VII', value: 66, rank: 'Sergeant First Class', abb: 'SFC' },
  { name: 'Josh Smith VIII', value: 88, rank: 'Master Sergeant', abb: 'MSG' },
  { name: 'Josh Smith IX', value: 99, rank: 'First Sergeant', abb: '1SG' },
  { name: 'Josh Smith XI', value: 222, rank: 'Sergeant Major', abb: 'SGM' },
  { name: 'Josh Smith XII', value: 333, rank: 'Command Sergeant Major', abb: 'CSM' },
  { name: 'Josh Smith XIII', value: 444, rank: 'Sergeant Major of the Army', abb: 'SMA' },
  { name: 'Josh Smith XIV', value: 555, rank: 'Warrant Officer 1', abb: 'WO1' },
  { name: 'Josh Smith XV', value: 666, rank: 'Chief Warrant Officer 2', abb: 'CW2' },
  { name: 'Josh Smith XVI', value: 777, rank: 'Chief Warrant Officer 3', abb: 'CW3' },
  { name: 'Josh Smith XVII', value: 888, rank: 'Chief Warrant Officer 4', abb: 'CW4' },
  { name: 'Josh Smith XVIII', value: 999, rank: 'Chief Warrant Officer 5', abb: 'CW5' },
  { name: 'Josh Smith XIX', value: 1111, rank: 'Second Lieutenant', abb: '2LT' },
  { name: 'Josh Smith XX', value: 2222, rank: 'First Lieutenant', abb: '1LT' },
  { name: 'Josh Smith XXI', value: 3333, rank: 'Captain', abb: 'CPT' },
  { name: 'Josh Smith XXII', value: 4444, rank: 'Major', abb: 'MAJ' },
  { name: 'Josh Smith XXIII', value: 5555, rank: 'Lieutenant Colonel', abb: 'LTC' },
  { name: 'Josh Smith XXIV', value: 6666, rank: 'Colonel', abb: 'COL' },
  { name: 'Josh Smith XXV', value: 7777, rank: 'Brigadier General', abb: 'BG' },
  { name: 'Josh Smith XXVI', value: 8888, rank: 'Major General', abb: 'MG' },
  { name: 'Josh Smith XXVII', value: 9999, rank: 'Lieutenant General', abb: 'LTG' },
  { name: 'Josh Smith XXVIII', value: 11111, rank: 'General', abb: 'GEN' },
  { name: 'Josh Smith XXIX', value: 22222, rank: 'General of the Army', abb: 'GA' }
]

// Render functions
function itemRender (item) {
  return (
    <span>{item.name}</span>
  )
}

function detailsRender (item) {
  return (
    <div>
      <div>Name: {item.name}</div>
      <div>Value: {item.value}</div>
      <div>Rank: {item.rank}</div>
      <div>Subtitle: {item.abb}</div>
    </div>
  )
}

function ListHeader (props) {
  return (
    <div {...props}>
      List Header
    </div>
  )
}

// Stories

addStory('initial', readme, () => (
  <SplitView
    data={data}
    detailsRender={detailsRender}
    itemRender={itemRender}
    listHeader={<ListHeader />}
  />
))
