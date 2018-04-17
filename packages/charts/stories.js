import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import BarChart from './src/BarChart'
import Legend from './src/Legend'
import LineChart from './src/LineChart'
import PieChart from './src/PieChart'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Charts', module)

// Datasets
// const dataStructure = {
//   className: 'className',
//   title: '',
//   show: true,
//   dataItems: []
// }
const pieData = {
  className: 'className',
  title: 'Pie Data',
  show: true,
  dataItems: [
    { label: 'Cats', angle: 35, color: null, className: '', id: 0 },
    { label: 'Dogs', angle: 40, color: null, className: '', id: 1 },
    { label: 'Birds', angle: 55, color: null, className: '', id: 2 },
    { label: 'Cats1', angle: 35, color: null, className: '', id: 3 },
    { label: 'Dogs1', angle: 40, color: null, className: '', id: 4 },
    { label: 'Birds1', angle: 55, color: null, className: '', id: 5 },
    { label: 'Cats2', angle: 35, color: null, className: '', id: 6 },
    { label: 'Dogs2', angle: 40, color: null, className: '', id: 7 },
    { label: 'Birds2', angle: 55, color: null, className: '', id: 8 },
    { label: 'Lions2', angle: 35, color: null, className: '', id: 9 }
  ]
}

const lineData = [
  {
    className: 'className',
    color: null,
    title: 'Line 1',
    id: 0,
    show: true,
    dataItems: [{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 5 }]
  },
  {
    className: 'className',
    color: null,
    id: 1,
    title: 'Line 2',
    show: true,
    dataItems: [{ x: 1, y: 2 }, { x: 2, y: 8 }, { x: 3, y: 0 }, { x: 4, y: 4 }, { x: 5, y: 5 }]
  }
]

const barData = [
  {
    className: 'className',
    color: null,
    id: 0,
    title: 'Bar Group 1',
    show: true,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    id: 1,
    title: 'BarGroup 2',
    show: true,
    dataItems: [{ x: 'January', y: 2 }, { x: 'February', y: 8 }, { x: 'March', y: 0 }, { x: 'April', y: 4 }, { x: 'May', y: 7 }]
  }]

// Stories
const wrapperStyle = {
  width: '100%',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

const labelProps = {
  angle: 10
}

addStory('Bar Chart', readme, () => (
  <div style={wrapperStyle}>
    <BarChart
      domainPadding={{x: 10}}
      data={barData}
    />
  </div>
))

addStory('Line Chart', readme, () => (
  <div style={wrapperStyle}>
    <LineChart
      data={lineData}
      xAxisTitle='XAxis'
      yAxisTitle='yAxis'
    />
    <h2>Linechart</h2>
  </div>
))

addStory('Pie Chart', readme, () => (
  <div style={wrapperStyle}>
    <PieChart
      data={pieData}
      labelProps={labelProps}
      padding={70}
      showLabels
    />
  </div>
))

addStory('Legend', readme, () => (
  <div style={wrapperStyle}>
    <Legend
      dataItems={pieData.dataItems}
      onClick={(e) => console.log('console.log: ', e)}
    />
  </div>
))
