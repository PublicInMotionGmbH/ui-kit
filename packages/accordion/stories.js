import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import { Icon } from '@talixo/icon'

import Accordion from './src/Accordion'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Accordion', module, {
  propTables: [ Accordion ]
})

const options = [
  { label: 'First one', content: 'Something is there' },
  { label: 'Another', content: <strong>Also here we've got some content</strong> },
  { label: 'Third', content: 'Here we are' },
  { label: 'Fourth', content: 'It is there!' }
]

const optionsById = [
  { id: 1, label: 'First one', content: 'Something is there' },
  { id: 'another', label: 'Another', content: <strong>Also here we've got some content</strong> },
  { id: 'third', label: 'Third', content: 'Here we are' },
  { id: 'multiple', label: 'Multi', content: 'And there is multiple' },
  { id: 'multiple', label: 'Multi 2', content: 'element selected' }
]

const optionsCustomAnimationSpeed = [
  { id: 1, customAnimationSpeed: 30, label: 'Very Slow Animation', content: 'I`m slow as sloth' },
  { id: 'another', customAnimationSpeed: 80, label: 'Slow Animation', content: <strong>I`m slow as turtle</strong> },
  { id: 'third', customAnimationSpeed: 900, label: 'Quick Animation', content: 'I`m quick as gazelle' },
  { id: 'multiple', label: 'Default Animation', content: 'I have default animation speed' },
  { id: 'last',
    customAnimationSpeed: 9000,
    label: 'Rocket Speed',
    content: <span><Icon name='rocket' /><Icon name='rocket' /><Icon name='rocket' /></span>}
]

// Stories

addStory('self-controlled', readme, () => (
  <Accordion
    onChange={action('change')}
    options={options}
  />
))

addStory.controlled('different animation speed', readme, (setState, state) => (
  <Accordion
    value={state.active}
    onChange={x => setState({ active: x })}
    animationSpeed={100}
    options={options}
  />
), () => ({ active: null }))

addStory.controlled('with special arrow', readme, (setState, state) => (
  <Accordion
    value={state.active}
    onChange={x => setState({ active: x })}
    options={options}
    renderOpenIcon={() => <Icon name='keyboard_arrow_down' />}
    renderCloseIcon={() => <Icon name='keyboard_arrow_up' />}
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

addStory.controlled('multiple items with same IDs', readme, (setState, state) => (
  <Accordion
    value={state.active}
    onChange={x => setState({ active: x })}
    options={optionsById}
    buildId={option => option.id}
  />
), () => ({ active: null }))

addStory.controlled('multiple items open at once', readme, (setState, state) => (
  <Accordion
    multi
    value={state.active}
    onChange={x => setState({ active: x })}
    options={optionsById}
    buildId={option => option.id}
  />
), () => ({ active: null }))

addStory.controlled('custom animation speed', readme, (setState, state) => (
  <Accordion
    value={state.active}
    onChange={x => setState({ active: x })}
    options={optionsCustomAnimationSpeed}
  />
), () => ({ active: null }))
