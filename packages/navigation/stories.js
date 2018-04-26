import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ControlledPagination from './src/ControlledPagination'
import ControlledTabs from './src/ControlledTabs'
import Element from './src/Element'
import Navigation from './src/Navigation'
import Step from './src/Step'
import Steps from './src/Steps'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Navigation', module)

// Stories

addStory('initial', readme, () => (
  <Navigation>
    <Element>Home</Element>
    <Element>Issues</Element>
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

addStory.controlled('controlled pagination', readme, (setState, state) => (
  <Navigation type='pagination'>
    <ControlledPagination
      activePage={state.page}
      displayedLimit={8}
      onChange={i => setState({ page: i })}
      pageCount={47}
    />
  </Navigation>
), () => {
  return {
    page: 1
  }
})

addStory('breadcrumbs', readme, () => (
  <Navigation type='breadcrumbs'>
    <Element onClick={action('click home')}><a href='#'>Home</a></Element>
    <Element onClick={action('click issues')}><a href='#'>Issues</a></Element>
    <Element active onClick={action('click minor')}><a href='#'>Minor</a></Element>
  </Navigation>
))

addStory('breadcrumbs with custom divider', readme, () => (
  <Navigation type='breadcrumbs' divider='>'>
    <Element onClick={action('click home')}><a href='#'>Home</a></Element>
    <Element onClick={action('click issues')}><a href='#'>Issues</a></Element>
    <Element active onClick={action('click minor')}><a href='#'>Minor</a></Element>
  </Navigation>
))

addStory('tabs', readme, () => (
  <Navigation type='tabs'>
    <Element onClick={action('click home')}><a href='#'>Home</a></Element>
    <Element onClick={action('click issues')}><a href='#'>Issues</a></Element>
    <Element onClick={action('click minor')}><a href='#'>Minor</a></Element>
  </Navigation>
))

addStory.controlled('controlled tabs', readme, (setState, state) => (
  <Navigation type='tabs'>
    <ControlledTabs
      activeTab={state.tab}
      onChange={i => setState({ tab: i })}
      labels={[
        {
          id: 0,
          name: 'Home'
        }, {
          id: 1,
          name: 'Issues'
        }, {
          id: 2,
          name: 'Minor'
        }
      ]}
    />
  </Navigation>
), () => {
  return {
    tab: 0
  }
})

addStory('step', readme, () => (
  <Navigation type='steps'>
    <Step completed>Cart</Step>
    <Step>Shipping</Step>
    <Step active>Billing</Step>
    <Step disabled>Confirm</Step>
  </Navigation>
))

addStory.controlled('steps', readme, (setState, state) => (
  <Navigation type='steps'>
    <Steps
      completed={['Cart']}
      current={state.current}
      steps={['Cart', 'Shipping', 'Billing', 'Confirm']}
      onChange={i => setState({ current: i })}
    />
  </Navigation>
), () => {
  return {
    current: 3
  }
})
