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

const imagesStyle = {
  display: 'inline-block',
  height: '200px',
  width: '200px',
  backgroundColor: 'green',
  border: '5px solid black',
  textAlign: 'center',
  fontSize: '30px',
  boxSizing: 'border-box'
}

// Stories

addStory('initial', readme, () => (
  <Carousel>
    <div style={imagesStyle}>TEXT 1</div>
    <div style={imagesStyle}>TEXT 2</div>
    <div style={imagesStyle}>TEXT 3</div>
  </Carousel>
))

addStory('with dots', readme, () => (
  <Carousel dots arrows>
    <div style={imagesStyle}>TEXT 1</div>
    <div style={imagesStyle}>TEXT 2</div>
    <div style={imagesStyle}>TEXT 3</div>
  </Carousel>
))
