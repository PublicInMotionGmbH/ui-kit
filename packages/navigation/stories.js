import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ControlledPagination from './src/ControlledPagination'
import Element from './src/Element'
import Navigation from './src/Navigation'
import NavigationWrapper from './src/NavigationWrapper'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Navigation', module)

const click = action('click')
const hover = action('hover')

const elemLvl3 = [
  {
    disabled: false,
    id: 30,
    label: 'Element 1 lvl 3',
    subtitle: 'Subtitile of element 1 lvl 3',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  }
]

const elemLvl2 = [
  {
    disabled: false,
    id: 20,
    label: 'Element 1 lvl 2',
    panel: true,
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 1 lvl 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 20,
    label: 'Element 2 lvl 2',
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 2 lvl 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 20,
    label: 'Element 3 lvl 2',
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 3 lvl 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  }
]

const elemLvl1 = [
  {
    disabled: false,
    // open: true,
    id: 10,
    label: 'Element 1 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 1 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 11,
    label: 'Element 2 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 2 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 12,
    label: 'Element 3 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 3 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 13,
    label: 'Element 4 lvl 1',
    subtitle: 'Subtitile of element 4 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  }
]

const withSubelements = [
  {
    disabled: true,
    id: 0,
    label: 'Element 1',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 1,
    label: 'Element 2',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 2,
    label: 'Element 3',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 3',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: true,
    id: 3,
    label: 'Element 4',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 4',
    panel: true,
    onClick: click,
    onMouseOver: hover,
    render: (x, state) => <div style={state.open ? { color: 'red' } : {}}>{x.label}</div>
  }
]

const withoutSubelements = [
  {
    disabled: false,
    id: 0,
    label: 'Element 1',
    subtitle: 'Subtitile of element 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    completed: true,
    disabled: false,
    id: 1,
    label: 'Element 2',
    subtitle: 'Subtitile of element 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    error: true,
    id: 2,
    label: 'Element 3',
    subtitle: 'Subtitile of element 3',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  },
  {
    disabled: false,
    id: 3,
    label: 'Element 4',
    subtitle: 'Subtitile of element 3',
    onClick: click,
    onMouseOver: hover,
    render: x => x.label
  }
]

// Stories

addStory('simple nav with subelements', readme, () => (
  <div>
    <Navigation elements={withSubelements} />
    <br />
    <br />
    <Navigation elements={withSubelements} type={'breadcrumbs'} divider='/' />
  </div>
))

addStory('sidebar', readme, () => (
  <div>
    <Navigation elements={withSubelements} type='sidebar' />
  </div>
))

addStory('tree view', readme, () => (
  <div>
    <Navigation elements={withSubelements} type='tree' />
  </div>
))

addStory('tabs gen', readme, () => (
  <div>
    <Navigation elements={withoutSubelements} type='tabs' />
  </div>
))

addStory('steps gen', readme, () => (
  <div>
    <Navigation elements={withoutSubelements} type='steps' />
  </div>
))

addStory('pagination gen', readme, () => (
  <div>
    <Navigation elements={withoutSubelements} type='pagination' />
  </div>
))

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
  <NavigationWrapper type='pagination'>
    <ControlledPagination
      activePage={state.page}
      displayedLimit={8}
      onChange={i => setState({ page: i })}
      pageCount={47}
    />
  </NavigationWrapper>
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
addStory('steps', readme, () => (
  <Navigation type='steps'>
    <Element completed>Cart</Element>
    <Element disabled>Confirm</Element>
    <Element error>Shipping</Element>
    <Element active>Billing</Element>
  </Navigation>
))
