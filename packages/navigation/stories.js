import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Element from './src/Element'
import MappedPagination from './src/MappedPagination'
import Navigation from './src/Navigation'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Navigation', module)

function getInitialState () {
  return {
    page: 1
  }
}

// Stories

addStory('initial', readme, () => (
  <Navigation>
    <Element>Home</Element>
    <Element>Isuues</Element>
    <Element>Minor</Element>
  </Navigation>
))

addStory('pagination', readme, () => (
  <Navigation type='pagination'>
    <Element onClick={action('click Previous')}>Previous</Element>
    <Element active onClick={action('click 1')}>1</Element>
    <Element onClick={action('click 2')}>2</Element>
    <Element onClick={action('click 3')}>3</Element>
    <Element disabled onClick={action('click 3')}>...</Element>
    <Element onClick={action('click Next')}>Next</Element>
  </Navigation>
))

addStory.controlled('mapped pagination', readme, (setState, state) => (
  <Navigation type='pagination'>
    <MappedPagination
      activePage={state.page}
      displayedLimit={8}
      onChange={i => setState({ page: i })}
      pageCount={47}
    />
  </Navigation>
), getInitialState)

addStory('breadcrumbs', readme, () => (
  <Navigation type='breadcrumbs'>
    <Element onClick={action('click home')}><a>Home</a></Element>
    <Element onClick={action('click issues')}><a>Isuues</a></Element>
    <Element active onClick={action('click minor')}><a>Minor</a></Element>
  </Navigation>
))

addStory('breadcrumbs with custom divider', readme, () => (
  <Navigation type='breadcrumbs' divider='>'>
    <Element onClick={action('click home')}><a>Home</a></Element>
    <Element onClick={action('click issues')}><a>Isuues</a></Element>
    <Element active onClick={action('click minor')}><a>Minor</a></Element>
  </Navigation>
))

addStory('tabs', readme, () => (
  <Navigation type='tabs'>
    <Element onClick={action('click home')}><a>Home</a></Element>
    <Element onClick={action('click issues')}><a>Isuues</a></Element>
    <Element onClick={action('click minor')}><a>Minor</a></Element>
  </Navigation>
))
