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
  { x: 'Cats', y: 35 },
  { x: 'Dogs', y: 40 },
  { x: 'Birds', y: 55 }
]

const lineData = [
  [{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 5 }],
  [{ x: 1, y: 2 }, { x: 2, y: 8 }, { x: 3, y: 0 }, { x: 4, y: 4 }, { x: 5, y: 5 }]
]

// Stories
const wrapperStyle = {
  width: '50%',
  display: 'flex'
}

addStory('Pie Chart', readme, () => (
  <div style={wrapperStyle}>
    <PieChart
      data={pieData}
    />
  </div>
))
addStory('Line Chart', readme, () => (
  <div style={wrapperStyle}>
    <LineChart data={lineData} />
  </div>
))
addStory('Bar Chart', readme, () => (
  <div style={wrapperStyle}>
    <BarChart
      domainPadding={{x: 30}}
      data={pieData}
    />
  </div>
))
