import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import SpyScroll from './src/SpyScroll'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Spy Scroll', module, {
  propTables: [ SpyScroll ]
})

const boxStyles = {
  display: 'block',
  width: '50%',
  margin: '0 auto',
  textAlign: 'center',
  position: 'relative',
  padding: '2em',
  top: '100vh',
  backgroundColor: 'red',
  color: '#FFFFFF'
}

const Box = ({ style, ...rest }) => (
  <span style={{ ...boxStyles, ...style }} {...rest}>
    Scroll
  </span>
)

const onBeginningAppeared = action('onBeginningAppeared')
const onBeginningVisible = action('onBeginningVisible')
const onEndReached = action('onEndReached')
const onEndLost = action('onEndLost')
const onEndAppeared = action('onEndAppeared')
const onEndVisible = action('onEndVisible')
const onBeginningReached = action('onBeginningReached')
const onBeginningLost = action('onBeginningLost')
const onVisible = action('onVisible')

// Stories

addStory('with all triggers', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onBeginningAppeared={onBeginningAppeared}
      onBeginningVisible={onBeginningVisible}
      onEndReached={onEndReached}
      onEndLost={onEndLost}
      onEndAppeared={onEndAppeared}
      onEndVisible={onEndVisible}
      onBeginningReached={onBeginningReached}
      onBeginningLost={onBeginningLost}
      onVisible={onVisible}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('with container', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <div
      id='spy-container'
      style={{ position: 'relative', backgroundColor: '#ddd', height: '50vh', overflow: 'scroll', top: '50vh' }}
    >
      <SpyScroll
        onVisible={onVisible}
        containerId='spy-container'
      >
        <Box style={{ marginBottom: '50vh' }} />
      </SpyScroll>
    </div>
  </div>
))

addStory('onVisible', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onVisible={onVisible}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onVisible with large element', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onVisible={onVisible}
    >
      <Box style={{ height: '60vh' }} />
    </SpyScroll>
  </div>
))

addStory('onBeginningAppeared', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onBeginningAppeared={onBeginningAppeared}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onBeginningVisible', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onBeginningVisible={onBeginningVisible}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onEndReached', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onEndReached={onEndReached}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onEndLost', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onEndLost={onEndLost}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onEndAppeared', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onEndAppeared={onEndAppeared}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onEndVisible', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onEndVisible={onEndVisible}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onBeginningReached', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onBeginningReached={onBeginningReached}
    >
      <Box />
    </SpyScroll>
  </div>
))

addStory('onBeginningLost', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onBeginningLost={onBeginningLost}
    >
      <Box />
    </SpyScroll>
  </div>
))
