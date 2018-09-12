import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import PaneView from './src/PaneView'
// import Pane from './src/Pane'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('PaneView', module, {
  propTables: [ PaneView ]
})

// Styles
const paneStyle = {
  height: 200
}

// Stories
addStory('vertical', readme, () => (
  <PaneView size={100 / 6} split='vertical'>
    <div style={paneStyle}>hello world</div>
    <div style={paneStyle}>witaj świecie</div>
    <div style={paneStyle}>bonjour monde</div>
    <div style={paneStyle}>hola mundo</div>
    <div style={paneStyle}>ciao mondo</div>
    <div style={paneStyle}>hallo welt</div>
  </PaneView>
))

addStory('horizontal', readme, () => (
  <PaneView size={100 / 6} split='horizontal'>
    <div style={paneStyle}>hello world</div>
    <div style={paneStyle}>witaj świecie</div>
    <div style={paneStyle}>bonjour monde</div>
    <div style={paneStyle}>hola mundo</div>
    <div style={paneStyle}>ciao mondo</div>
    <div style={paneStyle}>hallo welt</div>
  </PaneView>
))

// addStory('pane', readme, () => (
//   <Pane size='6em' split='vertical'>hello</Pane>
// ))
