import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Legend from './src/Legend'
import Chart from './src/Chart'
import PieChart from './src/PieChart'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Charts', module)

const wrapperStyle = {
  width: '100%',
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
    { label: 'Cats', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds', value: 55, color: ' ', className: '', disabled: true },
    { label: 'Cats1', value: 35, color: ' ', className: '', disabled: true },
    { label: 'Dogs1', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds1', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Cats2', value: 35, color: ' ', className: '', disabled: false },
    { label: 'Dogs2', value: 40, color: ' ', className: '', disabled: false },
    { label: 'Birds2', value: 55, color: ' ', className: '', disabled: false },
    { label: 'Lions2', value: 35, color: ' ', className: '', disabled: true }
  ]
}

const lineData = [
  {
    className: 'className',
    color: null,
    title: 'Line 1',
    id: 0,
    disabled: true,
    dataItems: [{ x: new Date('May 23 2017').getTime(), y: 5 }, { x: new Date('May 29 2017').getTime(), y: 2 }, { x: new Date('May 31 2017').getTime(), y: 2 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
  },
  {
    className: 'className',
    color: null,
    id: 1,
    title: 'Line 2',
    disabled: false,
    dataItems: [{ x: new Date('May 23 2017').getTime(), y: 3 }, { x: new Date('May 29 2017').getTime(), y: 8 }, { x: new Date('May 31 2017').getTime(), y: 1 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
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
    <Chart
      domainPadding={{x: 10}}
      data={barData}
      type='bar'
    />
    <Legend
      dataItems={barData}
    />
  </div>
))

addStory('Line Chart', readme, () => (
  <div style={wrapperStyle}>
    <Chart
      data={lineData}
      xAxisTitle='XAxis'
      yAxisTitle='yAxis'
      timeSeries
      zoomable
    />
    <Legend
      dataItems={lineData}
      direction='horizontal'
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
