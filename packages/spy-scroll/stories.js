import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'
import { Icon } from '@talixo/icon'

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

const wrapperStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  transition: '400ms all ease-in'
}

const iconStyle = {
  fontSize: '64px',
  lineHeight: '64px'
}

const onVisible = action('onVisible')
const onDisappearing = action('onDisappearing')
const onBeginningAppeared = action('onBeginningAppeared')
const onBeginningVisible = action('onBeginningVisible')
const onEndReached = action('onEndReached')
const onEndLost = action('onEndLost')
const onEndAppeared = action('onEndAppeared')
const onEndVisible = action('onEndVisible')
const onBeginningReached = action('onBeginningReached')
const onBeginningLost = action('onBeginningLost')
const onTriggerReached = action('onTriggerReached')
const onTriggerRetreats = action('onTriggerRetreats')
const onRangeEntered = action('onRangeEntered')
const onRangeLeft = action('onRangeLeft')

// Stories

addStory.controlled('onVisible and onDisappearing', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <SpyScroll
      onVisible={() => {
        onVisible()
        setState({ visible: true })
      }}
      onDisappearing={() => {
        onDisappearing()
        setState({ visible: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('horizontal', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'row',
    width: '300vw',
    height: '50vh',
    backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll right</strong>
      <Icon name='arrow_forward' style={iconStyle} />
    </div>
    <SpyScroll
      horizontal
      onVisible={() => {
        onVisible()
        setState({ visible: true })
      }}
      onDisappearing={() => {
        onDisappearing()
        setState({ visible: false })
      }}
    >
      <Box style={{
        top: 0,
        width: '50vw',
        margin: 'auto 0'
      }} />
    </SpyScroll>
    <div className='scroll-text'>
      <strong>Scroll left</strong>
      <Icon name='arrow_back' style={iconStyle} />
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('with trigger', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.triggered ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <div
      id='trigger'
    />
    <SpyScroll
      triggerId='trigger'
      onTriggerReached={() => {
        onTriggerReached()
        setState({ triggered: true })
      }}
      onTriggerRetreats={() => {
        onTriggerRetreats()
        setState({ triggered: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ triggered: false }))

addStory.controlled('horizontal with trigger', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'row',
    width: '300vw',
    backgroundColor: state.triggered ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll right</strong>
      <Icon name='arrow_forward' style={iconStyle} />
    </div>
    <div
      id='trigger-horizontal'
    />
    <SpyScroll
      horizontal
      triggerId='trigger-horizontal'
      onTriggerReached={() => {
        onTriggerReached()
        setState({ triggered: true })
      }}
      onTriggerRetreats={() => {
        onTriggerRetreats()
        setState({ triggered: false })
      }}
    >
      <Box style={{
        top: 0,
        margin: '0',
        width: '50vw'
      }} />
    </SpyScroll>
    <div className='scroll-text'>
      <strong>Scroll left</strong>
      <Icon name='arrow_back' style={iconStyle} />
    </div>
  </div>
), () => ({ triggered: false }))

addStory.controlled('with trigger and offset', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.triggered ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <div
      id='trigger'
    />
    <div
      className='trigger-offset'
    />
    <SpyScroll
      offset={100}
      triggerId='trigger'
      onTriggerReached={() => {
        onTriggerReached()
        setState({ triggered: true })
      }}
      onTriggerRetreats={() => {
        onTriggerRetreats()
        setState({ triggered: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ triggered: false }))

addStory.controlled('with range', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.range ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <div
      id='range-start'
    />
    <SpyScroll
      range={['range-start', 'range-stop']}
      onRangeEntered={() => {
        onRangeEntered()
        setState({ range: true })
      }}
      onRangeLeft={() => {
        onRangeLeft()
        setState({ range: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div
      id='range-stop'
    />
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ range: false }))

addStory.controlled('with container', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle, position: 'relative' }}>
    <div
      id='spy-container'
      style={{
        ...wrapperStyle,
        flexDirection: 'column',
        height: '50vh',
        overflow: 'scroll',
        backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
      }}
    >
      <div className='scroll-text'>
        <strong>Scroll down</strong>
        <Icon name='arrow_downward' style={iconStyle} />
      </div>
      <SpyScroll
        onVisible={() => {
          onVisible()
          setState({ visible: true })
        }}
        onDisappearing={() => {
          onDisappearing()
          setState({ visible: false })
        }}
        containerId='spy-container'
      >
        <Box style={{
          marginTop: '50vh',
          marginBottom: '50vh'
        }} />
      </SpyScroll>
      <div className='scroll-text'>
        <Icon name='arrow_upward' style={iconStyle} />
        <strong>Scroll up</strong>
      </div>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('horizontal with container', readme, (setState, state) => (
  <div style={{ position: 'relative' }}>
    <div
      id='spy-container'
      style={{
        ...wrapperStyle,
        flexDirection: 'row',
        height: '50vh',
        overflow: 'scroll',
        backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
      }}
    >
      <div className='scroll-text'>
        <strong>Scroll right</strong>
        <Icon name='arrow_forward' style={iconStyle} />
      </div>
      <SpyScroll
        horizontal
        containerId='spy-container'
        onVisible={() => {
          onVisible()
          setState({ visible: true })
        }}
        onDisappearing={() => {
          onDisappearing()
          setState({ visible: false })
        }}
      >
        <Box style={{
          margin: 'auto 0',
          marginRight: '100vw',
          marginLeft: '100vw'
        }} />
      </SpyScroll>
      <div className='scroll-text'>
        <strong>Scroll left</strong>
        <Icon name='arrow_back' style={iconStyle} />
      </div>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onBeginningAppeared and onBeginningLost', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <SpyScroll
      onBeginningAppeared={() => {
        onBeginningAppeared()
        setState({ visible: true })
      }}
      onBeginningLost={() => {
        onBeginningLost()
        setState({ visible: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onBeginningVisible and onBeginningReached', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <SpyScroll
      onBeginningVisible={() => {
        onBeginningVisible()
        setState({ visible: true })
      }}
      onBeginningReached={() => {
        onBeginningReached()
        setState({ visible: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onEndVisible and onEndReached', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <SpyScroll
      onEndVisible={() => {
        onEndVisible()
        setState({ visible: true })
      }}
      onEndReached={() => {
        onEndReached()
        setState({ visible: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onEndAppeared and onEndLost', readme, (setState, state) => (
  <div style={{
    ...wrapperStyle,
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#e7e7e7' : '#ffffff'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={iconStyle} />
    </div>
    <SpyScroll
      onEndAppeared={() => {
        onEndAppeared()
        setState({ visible: true })
      }}
      onEndLost={() => {
        onEndLost()
        setState({ visible: false })
      }}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={iconStyle} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))
