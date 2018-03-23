import React from 'react'
import { createStoriesFactory, getReadmeDescription, styles } from '@talixo/commons/story'

import Masonry from './src/Masonry'
import Group from './src/Group'
import Segment from './src/Segment'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Grid', module)

// Build options to show header of prop types
const options = {
  styles: stylesheet => ({
    ...styles(stylesheet),
    propTableHead: stylesheet.propTableHead
  })
}

// Stories

const style = { background: '#eee', padding: '5px' }

addStory('default', readme, () => (
  <div>
    <Group>
      <Segment style={style} size={12}>12</Segment>
    </Group>
    <Group>
      <Segment style={style} size={6}>6</Segment>
      <Segment style={style} size={6}>6</Segment>
    </Group>
    <Group>
      <Segment style={style} size={4}>4</Segment>
      <Segment style={style} size={4}>4</Segment>
      <Segment style={style} size={4}>4</Segment>
    </Group>
    <Group>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
    </Group>
    <Group>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
    </Group>
    <Group>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
    </Group>
    <Group>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={6}>6</Segment>
      <Segment style={style} size={3}>3</Segment>
    </Group>
  </div>
), options)

addStory('spaced', readme, () => (
  <div>
    <Group spaced>
      <Segment style={style} size={12}>12</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={6}>6</Segment>
      <Segment style={style} size={6}>6</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={4}>4</Segment>
      <Segment style={style} size={4}>4</Segment>
      <Segment style={style} size={4}>4</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={6}>6</Segment>
      <Segment style={style} size={3}>3</Segment>
    </Group>
  </div>
), options)

addStory('masonry', readme, () => (
  <Masonry>
    <Group spaced>
      <Segment style={style} size={12}>12</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={6}>6</Segment>
      <Segment style={style} size={6}>6</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={4}>4</Segment>
      <Segment style={style} size={4}>4</Segment>
      <Segment style={style} size={4}>4</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={3}>3</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
      <Segment style={style} size={2}>2</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
      <Segment style={style} size={1}>1</Segment>
    </Group>
    <Group spaced>
      <Segment style={style} size={3}>3</Segment>
      <Segment style={style} size={6}>6</Segment>
      <Segment style={style} size={3}>3</Segment>
    </Group>
  </Masonry>
), options)

addStory('extended masonry', readme, () => (
  <Masonry>
    <Group spaced>
      <Group spaced size={3}>
        <Masonry>
          <Group spaced>
            <Segment style={style}>3 Ver</Segment>
            <Segment style={style}>3 ti</Segment>
            <Segment style={style}>3 cal</Segment>
          </Group>
        </Masonry>
      </Group>
      <Group spaced size={9}>
        <Segment style={style} size={9}>9 of 9/12</Segment>
        <Segment style={style} size={3}>3 of 9/12</Segment>
      </Group>
    </Group>

    <Group spaced>
      <Group spaced size={9}>
        <Segment style={style} size={9}>9 of 9/12</Segment>
        <Segment style={style} size={3}>3 of 9/12</Segment>
      </Group>
      <Group spaced size={3}>
        <Masonry>
          <Group spaced>
            <Segment style={style}>3 Ver</Segment>
            <Segment style={style}>3 ti</Segment>
            <Segment style={style}>3 cal</Segment>
          </Group>
        </Masonry>
      </Group>
    </Group>

    <Group spaced>
      <Segment style={style} size={3}>3</Segment>
      <Group spaced size={3}>
        <Masonry>
          <Group spaced>
            <Segment style={style}>3 Ver</Segment>
            <Segment style={style}>3 ti</Segment>
            <Segment style={style}>3 cal</Segment>
          </Group>
        </Masonry>
      </Group>
      <Segment style={style} size={6}>6</Segment>
    </Group>
  </Masonry>
), options)
