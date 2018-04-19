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

const wrapperStyle = {
  width: '50%',
  height: '500px',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  justifyContent: 'center'
}
const wrapperLegend = {
  width: '25%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'center'
}

const pieData = {
  className: 'className',
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: ' ', className: '', id: 0, disabled: false },
    { label: 'Dogs', value: 40, color: ' ', className: '', id: 1, disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', id: 2, disabled: false },
    { label: 'Cats1', value: 35, color: ' ', className: '', id: 3, disabled: false },
    { label: 'Dogs1', value: 40, color: ' ', className: '', id: 4, disabled: false },
    { label: 'Birds1', value: 55, color: ' ', className: '', id: 5, disabled: false },
    { label: 'Cats2', value: 35, color: ' ', className: '', id: 6, disabled: false },
    { label: 'Dogs2', value: 40, color: ' ', className: '', id: 7, disabled: false },
    { label: 'Birds2', value: 55, color: ' ', className: '', id: 8, disabled: false },
    { label: 'Lions2', value: 35, color: ' ', className: '', id: 9, disabled: false }
  ]
}

const lineData = [
  {
    className: 'className',
    color: null,
    title: 'Line 1',
    id: 0,
    disabled: false,
    dataItems: [{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 5 }]
  },
  {
    className: 'className',
    color: null,
    id: 1,
    title: 'Line 2',
    disabled: false,
    dataItems: [{ x: 1, y: 2 }, { x: 2, y: 8 }, { x: 3, y: 0 }, { x: 4, y: 4 }, { x: 5, y: 5 }]
  }
]

const barData = [
  {
    className: 'className',
    color: null,
    id: 0,
    title: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    id: 1,
    title: 'BarGroup 2',
    disabled: false,
    dataItems: [{ x: 'January', y: 2 }, { x: 'February', y: 8 }, { x: 'March', y: 0 }, { x: 'April', y: 4 }, { x: 'May', y: 7 }]
  }]

// Stories

const labelProps = {
  value: 10
}

addStory('Bar Chart', readme, () => (
  <div style={wrapperStyle}>
    <BarChart
      domainPadding={{x: 10}}
      data={barData}
    />
    <Legend
      dataItems={barData}
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
    <Legend
      dataItems={lineData}
    />
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
    <Legend
      dataItems={pieData.dataItems}
      style={{ position: 'absolute', right: 0 }}

    />
  </div>
))

addStory('Legend', readme, () => (
  <div style={wrapperLegend}>
    <Legend
      dataItems={pieData.dataItems}
      onClick={(item, e) => console.log('console.log: ', item, e)}
      style={{ height: '200px', position: 'static' }}
    />
    <Legend
      dataItems={pieData.dataItems}
      style={{ position: 'static' }}
    />
    <Legend
      dataItems={pieData.dataItems}
      onClick={(item, e) => console.log('console.log: ', item, e)}
      direction='horizontal'
      style={{ position: 'static' }}
    />
    <Legend
      dataItems={pieData.dataItems}
      direction='horizontal'
      style={{ position: 'static' }}
    />
  </div>
))
