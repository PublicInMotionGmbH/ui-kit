import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import PieChart from './src/PieChart'
import LineChart from './src/LineChart'
import BarChart from './src/BarChart'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Charts', module)

// Datasets
const pieData = [
  { label: 'Cats', angle: 35 },
  { label: 'Dogs', angle: 40 },
  { label: 'Birds', angle: 55 },
  { label: 'Cats', angle: 35 },
  { label: 'Dogs', angle: 40 },
  { label: 'Birds', angle: 55 },
  { label: 'Cats2', angle: 35 },
  { label: 'Dogs2', angle: 40 },
  { label: 'Birds2', angle: 55 },
  { label: 'Lions2', angle: 35 },
  { label: 'Jaguars2', angle: 43 },
  { label: 'Tigers2', angle: 52 }
]

const lineData = [
  [{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 5 }],
  [{ x: 1, y: 2 }, { x: 2, y: 8 }, { x: 3, y: 0 }, { x: 4, y: 4 }, { x: 5, y: 5 }]
]

// Stories
const wrapperStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}

const labelProps = {
  angle: 10
}

addStory('Bar Chart', readme, () => (
  <div style={wrapperStyle}>
    <BarChart
      domainPadding={{x: 10}}
      data={pieData}
    />
  </div>
))

addStory('Line Chart', readme, () => (
  <div style={wrapperStyle}>
    <LineChart
      data={lineData}
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
  </div>
))
