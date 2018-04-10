import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Collapse from './src/Collapse'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Collapse', module, {
  propTypes: [ Collapse ]
})

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <div>
    <button onClick={() => setState({ collapsed: !state.collapsed })}>Toggle</button>

    <Collapse collapsed={state.collapsed}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there
      </div>
    </Collapse>
  </div>
), () => ({ collapsed: true }))

addStory.controlled('dynamic content', readme, (setState, state) => (
  <div>
    <button onClick={() => setState({ collapsed: !state.collapsed })}>Toggle</button>
    <button onClick={() => setState({ small: !state.small })}>Toggle size</button>

    <Collapse collapsed={state.collapsed}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there

        <Collapse collapsed={state.small}>
          There is also some text<br />
          As the example, that it can be long,<br />
          Long and even longer, we are not keeping static CSS there.<br />
          Instead we are calculating current height and assume that it will be not bigger than 1.5x of that.<br />
          Xtremely big container should work, despite fact that we are using `max-height`.<br />
          Of course it may happen often in software.
        </Collapse>
      </div>
    </Collapse>
  </div>
), () => ({ collapsed: true, small: true }))

addStory.controlled('not smooth', readme, (setState, state) => (
  <div>
    <button onClick={() => setState({ collapsed: !state.collapsed })}>Toggle</button>
    <button onClick={() => setState({ small: !state.small })}>Toggle size</button>

    <Collapse collapsed={state.collapsed} smooth={false}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there

        <Collapse collapsed={state.small} smooth={false}>
          There is also some text<br />
          As the example, that it can be long,<br />
          Long and even longer, we are not keeping static CSS there.<br />
          Instead we are calculating current height and assume that it will be not bigger than 1.5x of that.<br />
          Xtremely big container should work, despite fact that we are using `max-height`.<br />
          Of course it may happen often in software.
        </Collapse>
      </div>
    </Collapse>
  </div>
), () => ({ collapsed: true, small: true }))

addStory.controlled('different animation time', readme, (setState, state) => (
  <div>
    <button onClick={() => setState({ collapsed: !state.collapsed })}>Toggle</button>

    <Collapse collapsed={state.collapsed} animationTime={100}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        There is also some text<br />
        As the example, that it can be long,<br />
        Long and even longer, we are not keeping static CSS there.<br />
        Instead we are calculating current height and assume that it will be not bigger than 1.5x of that.<br />
        Xtremely big container should work, despite fact that we are using `max-height`.<br />
        Of course it may happen often in software.
      </div>
    </Collapse>
  </div>
), () => ({ collapsed: true }))

addStory.controlled('accessible', readme, (setState, state) => (
  <div>
    <button aria-expanded={!state.collapsed} aria-controls='element' onClick={() => setState({ collapsed: !state.collapsed })}>
      Toggle
    </button>

    <Collapse id='element' collapsed={state.collapsed} aria-hidden={state.collapsed}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there
      </div>
    </Collapse>
  </div>
), () => ({ collapsed: true }))
