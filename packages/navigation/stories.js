import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ControlledPagination from './src/ControlledPagination'
import ControlledTabs from './src/ControlledTabs'
import Element from './src/Element'
import NavigationWrapper from './src/NavigationWrapper'
import SimpleNavigation from './src/Navigation'
import Step from './src/Step'
import Steps from './src/Steps'

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
    name: 'Element 1 lvl 3',
    subtitle: 'Subtitile of element 1 lvl 3',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  }
]

const elemLvl2 = [
  {
    disabled: false,
    id: 20,
    name: 'Element 1 lvl 2',
    panel: true,
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 1 lvl 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: false,
    id: 20,
    name: 'Element 2 lvl 2',
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 2 lvl 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: false,
    id: 20,
    name: 'Element 3 lvl 2',
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 3 lvl 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  }
]

const elemLvl1 = [
  {
    disabled: false,
    // open: true,
    id: 10,
    name: 'Element 1 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 1 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: false,
    id: 11,
    name: 'Element 2 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 2 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: false,
    id: 12,
    name: 'Element 3 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 3 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: false,
    id: 13,
    name: 'Element 4 lvl 1',
    subtitle: 'Subtitile of element 4 lvl 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  }
]

const withSubelements = [
  {
    disabled: true,
    id: 0,
    name: 'Element 1',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 1',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: false,
    id: 1,
    name: 'Element 2',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 2',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: false,
    id: 2,
    name: 'Element 3',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 3',
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  },
  {
    disabled: true,
    id: 3,
    name: 'Element 4',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 4',
    panel: true,
    onClick: click,
    onMouseOver: hover,
    render: x => x.name
  }
]

// const withoutSubelements = [
//   {
//     disabled: false,
//     id: 0,
//     name: 'Element 1',
//     subelements: elemLvl1,
//     subtitle: 'Subtitile of element 1',
//     onClick: click,
//     onMouseOver: hover,
//     render: x => x.name
//   },
//   {
//     disabled: false,
//     id: 1,
//     name: 'Element 2',
//     subelements: elemLvl1,
//     subtitle: 'Subtitile of element 2',
//     onClick: click,
//     onMouseOver: hover,
//     render: x => x.name
//   },
//   {
//     disabled: false,
//     id: 2,
//     name: 'Element 3',
//     subelements: elemLvl1,
//     subtitle: 'Subtitile of element 3',
//     onClick: click,
//     onMouseOver: hover,
//     render: x => x.name
//   }
// ]

// Stories

addStory('simple nav with subelements', readme, () => (
  <div>
    <SimpleNavigation elements={withSubelements} />
    <br />
    <br />
    <SimpleNavigation elements={withSubelements} type={'breadcrumbs'} divider='/' />
    {/* <br /> */}
    {/* <br /> */}
    {/* <SimpleNavigation elements={withSubelements} type={'pagination'} /> */}
    {/* <br /> */}
    {/* <br /> */}
    {/* <SimpleNavigation elements={withSubelements} type={'steps'} /> */}
    {/* <br /> */}
    {/* <br /> */}
    {/* <SimpleNavigation elements={withSubelements} type={'tabs'} /> */}
  </div>
))

addStory('sidebar', readme, () => (
  <div>
    <SimpleNavigation elements={withSubelements} type='sidebar' />
  </div>
))

addStory('initial', readme, () => (
  <NavigationWrapper>
    <Element>Home</Element>
    <Element>Issues</Element>
    <Element>Minor</Element>
  </NavigationWrapper>
))

addStory('pagination', readme, () => (
  <NavigationWrapper type='pagination'>
    <Element onClick={action('click Previous')}>Previous</Element>
    <Element active onClick={action('click 1')}>1</Element>
    <Element onClick={action('click 2')}>2</Element>
    <Element onClick={action('click 3')}>3</Element>
    <Element disabled onClick={action('click 3')}>...</Element>
    <Element onClick={action('click Next')}>Next</Element>
  </NavigationWrapper>
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
  <NavigationWrapper type='breadcrumbs'>
    <Element onClick={action('click home')}><a href='#'>Home</a></Element>
    <Element onClick={action('click issues')}><a href='#'>Issues</a></Element>
    <Element active onClick={action('click minor')}><a href='#'>Minor</a></Element>
  </NavigationWrapper>
))

addStory('breadcrumbs with custom divider', readme, () => (
  <NavigationWrapper type='breadcrumbs' divider='>'>
    <Element onClick={action('click home')}><a href='#'>Home</a></Element>
    <Element onClick={action('click issues')}><a href='#'>Issues</a></Element>
    <Element active onClick={action('click minor')}><a href='#'>Minor</a></Element>
  </NavigationWrapper>
))

addStory('tabs', readme, () => (
  <NavigationWrapper type='tabs'>
    <Element onClick={action('click home')}><a href='#'>Home</a></Element>
    <Element onClick={action('click issues')}><a href='#'>Issues</a></Element>
    <Element onClick={action('click minor')}><a href='#'>Minor</a></Element>
  </NavigationWrapper>
))

addStory.controlled('controlled tabs', readme, (setState, state) => (
  <NavigationWrapper type='tabs'>
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
  </NavigationWrapper>
), () => {
  return {
    tab: 0
  }
})

addStory('step', readme, () => (
  <NavigationWrapper type='steps'>
    <Step completed>Cart</Step>
    <Step>Shipping</Step>
    <Step active>Billing</Step>
    <Step disabled>Confirm</Step>
  </NavigationWrapper>
))

addStory.controlled('steps', readme, (setState, state) => (
  <NavigationWrapper type='steps'>
    <Steps
      current={state.current}
      steps={[
        { name: 'Cart', disabled: false },
        { name: 'Shipping', disabled: true },
        { name: 'Billing', disabled: false },
        { name: 'Confirm', disabled: false }
      ]}
      onChange={current => setState({ current })}
    />
  </NavigationWrapper>
), () => {
  return {
    current: undefined
  }
})
