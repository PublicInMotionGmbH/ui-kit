import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Collapse from './src/Collapse'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Collapse', module, {
  propTables: [ Collapse ]
})

// Stories

addStory('initial', readme, ({ collapsed = true }, setState) => (
  <div>
    <button onClick={() => setState({ collapsed: !collapsed })}>Toggle</button>

    <Collapse collapsed={collapsed}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there
      </div>
    </Collapse>
  </div>
))

addStory('dynamic content', readme, ({ collapsed = true, small = true }, setState) => (
  <div>
    <button onClick={() => setState({ collapsed: !collapsed })}>Toggle</button>
    <button onClick={() => setState({ small: !small })}>Toggle size</button>

    <Collapse collapsed={collapsed}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there

        <Collapse collapsed={small}>
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
))

addStory('not smooth', readme, ({ collapsed = true, small = true }, setState) => (
  <div>
    <button onClick={() => setState({ collapsed: !collapsed })}>Toggle</button>
    <button onClick={() => setState({ small: !small })}>Toggle size</button>

    <Collapse collapsed={collapsed} smooth={false}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there

        <Collapse collapsed={small} smooth={false}>
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
))

addStory('different animation time', readme, ({ collapsed = true }, setState) => (
  <div>
    <button onClick={() => setState({ collapsed: !collapsed })}>Toggle</button>

    <Collapse collapsed={collapsed} animationTime={100}>
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
))

addStory('accessible', readme, ({ collapsed = true }, setState) => (
  <div>
    <button aria-expanded={!collapsed} aria-controls='element' onClick={() => setState({ collapsed: !collapsed })}>
      Toggle
    </button>

    <Collapse id='element' collapsed={collapsed} aria-hidden={collapsed}>
      <div style={{ border: '2px solid #eee', padding: 20 }}>
        Something is there
      </div>
    </Collapse>
  </div>
))
