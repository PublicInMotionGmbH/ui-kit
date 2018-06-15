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

const Box = ({className, ...rest}) => (
  <span className='box' {...rest}>
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
const onDisappearing = action('onDisappearing')

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onVisible={() => setState({ visible: true })}
      onDisappearing={() => setState({ visible: false })}
    >
      <Box style={{
        backgroundColor: state.visible ? 'red' : 'blue',
        padding: state.visible ? '2em' : '1em',
        transition: '400ms all ease-in'
      }} />
    </SpyScroll>
  </div>
), () => ({ visible: false }))

addStory.controlled('with trigger', readme, (setState, state) => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <div
      id='trigger'
    />
    <SpyScroll
      triggerId='trigger'
      onTriggerReached={() => setState({ triggered: true })}
      onTriggerRetreats={() => setState({ triggered: false })}
    >
      <Box style={{
        backgroundColor: state.triggered ? 'red' : 'blue',
        padding: state.triggered ? '2em' : '3em',
        transition: '400ms all ease-in'
      }} />
    </SpyScroll>
  </div>
), () => ({ triggered: false }))

addStory.controlled('with container', readme, (setState, state) => (
  <div style={{ position: 'relative' }}>
    <div
      id='spy-container'
      style={{
        position: 'relative',
        backgroundColor: 'rgb(247, 247, 247)',
        height: '50vh',
        overflow: 'scroll'
      }}
    >
      <strong>Scroll down and up</strong>
      <SpyScroll
        onVisible={() => setState({ visible: true })}
        onDisappearing={() => setState({ visible: false })}
        containerId='spy-container'
      >
        <Box style={{
          backgroundColor: state.visible ? 'red' : 'blue',
          transition: '400ms all ease-in',
          marginBottom: '50vh'
        }} />
      </SpyScroll>
    </div>
  </div>
), () => ({ visible: false }))

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

addStory('onDisappearing', readme, () => (
  <div style={{ position: 'relative', height: '200vh' }}>
    <strong>Scroll down and up</strong>
    <SpyScroll
      onDisappearing={onDisappearing}
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
