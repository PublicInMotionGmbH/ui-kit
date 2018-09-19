import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import PaneView from './src/PaneView'
import Pane from './src/Pane'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('PaneView', module, {
  propTables: [ PaneView ]
})

// Styles
const paneStyle = {
  height: 100
}

// Stories
addStory('horizontal', readme, () => (
  <PaneView split='horizontal'>
    <Pane>
      <div style={paneStyle}>hello world</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>witaj świecie</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>bonjour du monde</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hola mundo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>ciao mondo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hallo welt</div>
    </Pane>
  </PaneView>
))

addStory('vertical', readme, () => (
  <PaneView split='vertical'>
    <Pane>
      <div style={paneStyle}>hello world</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>witaj świecie</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>bonjour monde</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hola mundo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>ciao mondo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hallo welt</div>
    </Pane>
  </PaneView>
))

addStory('with custom size', readme, () => (
  <PaneView split='horizontal'>
    <Pane defaultSize={30}>
      <div style={paneStyle}>hello world</div>
    </Pane>
    <Pane defaultSize={30}>
      <div style={paneStyle}>witaj świecie</div>
    </Pane>
    <Pane defaultSize={0}>
      <div style={paneStyle}>bonjour du monde</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hola mundo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>ciao mondo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hallo welt</div>
    </Pane>
  </PaneView>
))

addStory.controlled('with mode sent to parent', readme, (setState, state) => (
  <PaneView split='horizontal' onMouseDown={x => setState({ mode: x })}>
    <Pane>
      <div style={paneStyle}>hello world</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>witaj świecie</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>bonjour monde</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hola mundo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>ciao mondo</div>
    </Pane>
    <Pane>
      <div style={paneStyle}>hallo welt</div>
    </Pane>
  </PaneView>
), () => ({ mode: null }))
