import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
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

// Stories

addStory.controlled('onVisible and onDisappearing', readme, (setState, state) => (
  <div style={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#ccc' : '#fff',
    transition: '400ms all ease-in'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
    <SpyScroll
      onVisible={() => setState({ visible: true })}
      onDisappearing={() => setState({ visible: false })}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={{fontSize: '64px', lineHeight: '64px'}} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('horizontal', readme, (setState, state) => (
  <div style={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '300vw',
    height: '50vh',
    backgroundColor: state.visible ? '#ccc' : '#fff',
    transition: '400ms all ease-in'
  }}>
    <div className='scroll-text'>
      <strong>Scroll right</strong>
      <Icon name='arrow_forward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
    <SpyScroll
      horizontal
      onVisible={() => setState({ visible: true })}
      onDisappearing={() => setState({ visible: false })}
    >
      <Box style={{
        top: 0,
        width: '50vw',
        margin: 'auto 0'
      }} />
    </SpyScroll>
    <div className='scroll-text'>
      <strong>Scroll left</strong>
      <Icon name='arrow_back' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('with trigger', readme, (setState, state) => (
  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '200vh' }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
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
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={{fontSize: '64px', lineHeight: '64px'}} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ triggered: false }))

addStory.controlled('horizontal with trigger', readme, (setState, state) => (
  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '300vw' }}>
    <div className='scroll-text'>
      <strong>Scroll right</strong>
      <Icon name='arrow_forward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
    <div
      id='trigger-horizontal'
    />
    <SpyScroll
      horizontal
      triggerId='trigger-horizontal'
      onTriggerReached={() => setState({ triggered: true })}
      onTriggerRetreats={() => setState({ triggered: false })}
    >
      <Box style={{
        top: 0,
        margin: '0',
        width: '50vw',
        backgroundColor: state.triggered ? 'red' : 'blue',
        padding: state.triggered ? '2em' : '3em',
        transition: '400ms all ease-in'
      }} />
    </SpyScroll>
    <div className='scroll-text'>
      <strong>Scroll left</strong>
      <Icon name='arrow_back' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
  </div>
), () => ({ triggered: false }))

addStory.controlled('with container', readme, (setState, state) => (
  <div style={{ position: 'relative' }}>
    <div
      id='spy-container'
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'rgb(247, 247, 247)',
        height: '50vh',
        overflow: 'scroll'
      }}
    >
      <div className='scroll-text'>
        <strong>Scroll down</strong>
        <Icon name='arrow_downward' style={{fontSize: '64px', lineHeight: '64px'}} />
      </div>
      <SpyScroll
        onVisible={() => setState({ visible: true })}
        onDisappearing={() => setState({ visible: false })}
        containerId='spy-container'
      >
        <Box style={{
          backgroundColor: state.visible ? 'red' : 'blue',
          transition: '400ms all ease-in',
          marginTop: '50vh',
          marginBottom: '50vh'
        }} />
      </SpyScroll>
      <div className='scroll-text'>
        <Icon name='arrow_upward' style={{fontSize: '64px', lineHeight: '64px'}} />
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
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'rgb(247, 247, 247)',
        height: '50vh',
        overflow: 'scroll'
      }}
    >
      <div className='scroll-text'>
        <strong>Scroll right</strong>
        <Icon name='arrow_forward' style={{fontSize: '64px', lineHeight: '64px'}} />
      </div>
      <SpyScroll
        horizontal
        containerId='spy-container'
        onVisible={() => setState({ visible: true })}
        onDisappearing={() => setState({ visible: false })}
      >
        <Box style={{
          backgroundColor: state.visible ? 'red' : 'blue',
          transition: '400ms all ease-in',
          margin: 'auto 0',
          marginRight: '100vw',
          marginLeft: '100vw'
        }} />
      </SpyScroll>
      <div className='scroll-text'>
        <strong>Scroll left</strong>
        <Icon name='arrow_back' style={{fontSize: '64px', lineHeight: '64px'}} />
      </div>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onBeginningAppeared and onBeginningLost', readme, (setState, state) => (
  <div style={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#ccc' : '#fff',
    transition: '400ms all ease-in'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
    <SpyScroll
      onBeginningAppeared={() => setState({ visible: true })}
      onBeginningLost={() => setState({ visible: false })}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={{fontSize: '64px', lineHeight: '64px'}} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onBeginningVisible and onBeginningReached', readme, (setState, state) => (
  <div style={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#ccc' : '#fff',
    transition: '400ms all ease-in'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
    <SpyScroll
      onBeginningVisible={() => setState({ visible: true })}
      onBeginningReached={() => setState({ visible: false })}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={{fontSize: '64px', lineHeight: '64px'}} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onEndVisible and onEndReached', readme, (setState, state) => (
  <div style={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#ccc' : '#fff',
    transition: '400ms all ease-in'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
    <SpyScroll
      onEndVisible={() => setState({ visible: true })}
      onEndReached={() => setState({ visible: false })}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={{fontSize: '64px', lineHeight: '64px'}} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))

addStory.controlled('onEndAppeared and onEndLost', readme, (setState, state) => (
  <div style={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '200vh',
    backgroundColor: state.visible ? '#ccc' : '#fff',
    transition: '400ms all ease-in'
  }}>
    <div className='scroll-text'>
      <strong>Scroll down</strong>
      <Icon name='arrow_downward' style={{fontSize: '64px', lineHeight: '64px'}} />
    </div>
    <SpyScroll
      onEndAppeared={() => setState({ visible: true })}
      onEndLost={() => setState({ visible: false })}
    >
      <Box />
    </SpyScroll>
    <div className='scroll-text'>
      <Icon name='arrow_upward' style={{fontSize: '64px', lineHeight: '64px'}} />
      <strong>Scroll up</strong>
    </div>
  </div>
), () => ({ visible: false }))
