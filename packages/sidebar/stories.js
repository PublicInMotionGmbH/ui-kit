import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import Sidebar from './src/Sidebar'
import Panel from './src/Panel'
import Element from './src/Element'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Sidebar', module)

// Stories

addStory('simple navigation', readme, () => (
  <Sidebar>
    <Element icon='home' label='HOME' onClick={action('click home')} />
    <Element icon='list' label='ISSUES' onClick={action('click issues')} />
  </Sidebar>
))

addStory('simple navigation with activated element', readme, () => (
  <Sidebar>
    <Element icon='home' label='HOME' onClick={action('click home')} active />
    <Element icon='list' label='ISSUES' onClick={action('click issues')} />
  </Sidebar>
))

addStory('fixed navigation', readme, () => (
  <Sidebar style={{ borderLeft: '1px solid #eee', position: 'fixed', left: 0, top: 0, height: '100%' }}>
    <Element icon='home' label='HOME' onClick={action('click home')} />
    <Element icon='list' label='ISSUES' onClick={action('click issues')} />
  </Sidebar>
), {
  inline: false
})

addStory('fixed navigation with activated element', readme, () => (
  <Sidebar style={{ borderLeft: '1px solid #eee', position: 'fixed', left: 0, top: 0, height: '100%' }}>
    <Element icon='home' label='HOME' onClick={action('click home')} active />
    <Element icon='list' label='ISSUES' onClick={action('click issues')} />
  </Sidebar>
), {
  inline: false
})

addStory('fixed navigation with panel', readme, () => (
  <Sidebar style={{ borderLeft: '1px solid #eee', position: 'fixed', left: 0, top: 0, height: '100%' }}>
    <Element icon='home' label='HOME' onClick={action('click home')} />
    <Element icon='list' label='ISSUES' onClick={action('click issues')}>
      <Panel icon='warning' name='Issue'>
        <Element icon='keyboard_arrow_up' label='High priority' />
        <Element icon='keyboard_arrow_down' label='Low priority' />
      </Panel>
    </Element>
  </Sidebar>
), {
  inline: false
})

addStory('fixed navigation with sidebar', readme, () => (
  <Sidebar style={{ borderLeft: '1px solid #eee', position: 'fixed', left: 0, top: 0, height: '100%' }}>
    <Element icon='home' label='HOME' onClick={action('click home')} />
    <Element icon='list' label='ISSUES' onClick={action('click issues')}>
      <Sidebar>
        <Element icon='keyboard_arrow_up' label='High priority' />
        <Element icon='keyboard_arrow_down' label='Low priority' />
      </Sidebar>
    </Element>
  </Sidebar>
), {
  inline: false
})

addStory('fixed multi-level navigation', readme, () => (
  <Sidebar style={{ borderLeft: '1px solid #eee', position: 'fixed', left: 0, top: 0, height: '100%' }}>
    <Element icon='home' label='HOME' onClick={action('click home')} />
    <Element icon='list' label='ISSUES' onClick={action('click issues')}>
      <Sidebar>
        <Element icon='keyboard_arrow_up' label='High priority' />
        <Element icon='keyboard_arrow_right' label='More...'>
          <Sidebar>
            <Element icon='keyboard_arrow_right' label='And more...'>
              <Panel icon='warning' name='Great!'>
                Something
              </Panel>
            </Element>
          </Sidebar>
        </Element>
      </Sidebar>
    </Element>
  </Sidebar>
), {
  inline: false
})

addStory('fixed multi-level panels', readme, () => (
  <Sidebar style={{ borderLeft: '1px solid #eee', position: 'fixed', left: 0, top: 0, height: '100%' }}>
    <Element icon='home' label='HOME' onClick={action('click home')} />
    <Element icon='list' label='ISSUES' onClick={action('click issues')}>
      <Panel icon='warning' name='Issue'>
        <Element icon='keyboard_arrow_up' label='High priority' />
        <Element icon='keyboard_arrow_down' label='More'>
          <Panel icon='warning' name='Great!'>
            Something
          </Panel>
        </Element>
      </Panel>
    </Element>
  </Sidebar>
), {
  inline: false
})
