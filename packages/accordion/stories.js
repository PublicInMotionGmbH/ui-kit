import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Accordion from './src/Accordion'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Accordion', module, {
  propTables: [ Accordion ]
})

const options = [
  { id: 1, label: 'First one', content: 'Something is there' },
  { id: 'another', label: 'Another', content: <strong>Also here we've got some content</strong> },
  { id: 'third', label: 'Third', content: 'Here we are' },
  { id: 'multiple', label: 'Multi', content: 'And there is multiple' },
  { id: 'multiple', label: 'Multi 2', content: 'element selected' }
]

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <Accordion
    value={state.active}
    onChange={x => setState({ active: x })}
    options={options}
  />
), () => ({ active: null }))

addStory.controlled('different animation time', readme, (setState, state) => (
  <Accordion
    value={state.active}
    onChange={x => setState({ active: x })}
    animationTime={100}
    options={options}
  />
), () => ({ active: null }))

addStory.controlled('not smooth', readme, (setState, state) => (
  <Accordion
    value={state.active}
    onChange={x => setState({ active: x })}
    smooth={false}
    options={options}
  />
), () => ({ active: null }))
