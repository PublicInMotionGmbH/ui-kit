import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Carousel from './src/Carousel'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Carousel', module, {
  propTables: [ Carousel ]
})

// Styles for stories
const wrapperStyle = {
  height: '200px'
}

const imagesStyle = {
  display: 'inline-block',
  height: '100%',
  width: '100%',
  backgroundColor: 'green',
  border: '5px solid black',
  textAlign: 'center',
  fontSize: '30px',
  boxSizing: 'border-box'
}

// Stories

addStory('initial', readme, () => (
  <div style={wrapperStyle}>
    <Carousel>
      <div style={imagesStyle}>TEXT 1</div>
      <div style={imagesStyle}>TEXT 2</div>
      <div style={imagesStyle}>TEXT 3</div>
    </Carousel>
  </div>

))

addStory('with arrows', readme, () => (
  <div style={wrapperStyle}>
    <Carousel arrows dots>
      <div style={imagesStyle}>TEXT 1</div>
      <div style={imagesStyle}>TEXT 2</div>
      <div style={imagesStyle}>TEXT 3</div>
    </Carousel>
  </div>
))
