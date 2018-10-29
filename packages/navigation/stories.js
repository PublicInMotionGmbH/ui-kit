import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import Element from './src/Element'
import Navigation from './src/Navigation'
import Pagination from './src/Pagination'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Navigation', module)

const click = action('click')

const elemLvl3 = [
  {
    disabled: false,
    id: 30,
    label: 'Element 1 lvl 3',
    subtitle: 'Subtitile of element 1 lvl 3',
    onClick: click
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
    onClick: click
  },
  {
    disabled: false,
    id: 21,
    label: 'Element 2 lvl 2',
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 2 lvl 2',
    onClick: click
  },
  {
    disabled: false,
    id: 22,
    label: 'Element 3 lvl 2',
    subelements: elemLvl3,
    subtitle: 'Subtitile of element 3 lvl 2',
    onClick: click
  }
]

const elemLvl1 = [
  {
    disabled: false,
    id: 10,
    label: 'Element 1 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 1 lvl 1',
    onClick: click
  },
  {
    disabled: false,
    id: 11,
    label: 'Element 2 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 2 lvl 1',
    onClick: click
  },
  {
    disabled: false,
    id: 12,
    label: 'Element 3 lvl 1',
    subelements: elemLvl2,
    subtitle: 'Subtitile of element 3 lvl 1',
    onClick: click
  },
  {
    disabled: false,
    id: 13,
    label: 'Element 4 lvl 1',
    subtitle: 'Subtitile of element 4 lvl 1',
    onClick: click
  }
]

const withSubelements = [
  {
    disabled: false,
    id: 0,
    label: 'Element 1',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 1',
    onClick: click
  },
  {
    disabled: false,
    id: 1,
    label: 'Element 2',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 2',
    onClick: click
  },
  {
    disabled: false,
    id: 2,
    label: 'Element 3',
    subelements: elemLvl1,
    subtitle: 'Subtitile of element 3',
    onClick: click
  },
  {
    disabled: true,
    id: 3,
    label: 'Element 4',
    subtitle: 'Subtitile of element 4',
    panel: true,
    onClick: click
  }
]

const withoutSubelements = [
  {
    completed: true,
    id: 0,
    label: 'Element 1',
    subtitle: 'Subtitile of element 1',
    onClick: click
  },
  {
    active: true,
    id: 1,
    label: 'Element 2',
    subtitle: 'Subtitile of element 2',
    onClick: click
  },
  {
    id: 2,
    label: 'Element 3',
    subtitle: 'Subtitile of element 3',
    onClick: click
  },
  {
    id: 3,
    label: 'Element 4',
    subtitle: 'Subtitile of element 3',
    onClick: click
  }
]

// Stories

addStory('navbar', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Navigation elements={withSubelements} />

    <h2>Using Element components.</h2>
    <Navigation>
      <Element label='Home' onClick={action('click home')} />
      <Element label='Issues' onClick={action('click issues')} />
      <Element label='Minor' onClick={action('click minor')}>
        <Navigation>
          <Element label='Minor label' onClick={action('click home')} />
        </Navigation>
      </Element>
    </Navigation>
  </div>
))

addStory('breadcrumbs', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Navigation elements={withSubelements} type='breadcrumbs' />

    <h2>Using Element components.</h2>
    <Navigation type='breadcrumbs'>
      <Element label='Home' onClick={action('click home')} />
      <Element label='Issues' onClick={action('click issues')} />
      <Element label='Minor' onClick={action('click minor')}>
        <Navigation>
          <Element label='Minor label' onClick={action('click home')} />
        </Navigation>
      </Element>
    </Navigation>
  </div>
))

addStory('breadcrumbs with custom divider', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Navigation elements={withSubelements} type='breadcrumbs' divider='>>>' />

    <h2>Using Element components.</h2>
    <Navigation type='breadcrumbs' divider='>>>'>
      <Element label='Home' onClick={action('click home')} />
      <Element label='Issues' onClick={action('click issues')} />
      <Element label='Minor' onClick={action('click minor')}>
        <Navigation>
          <Element label='Minor label' onClick={action('click home')} />
        </Navigation>
      </Element>
    </Navigation>
  </div>
))

addStory('sidebar', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Navigation elements={withSubelements} type='sidebar' />

    <h2>Using Element components.</h2>
    <Navigation type='sidebar'>
      <Element label='Home' onClick={action('click home')} />
      <Element label='Issues' onClick={action('click issues')} />
      <Element label='Minor' onClick={action('click minor')}>
        <Navigation subtitle='This is a panel' panel>
          <Element label='Minor label' onClick={action('click home')} />
        </Navigation>
      </Element>
    </Navigation>
  </div>
))

addStory('tree view', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Navigation elements={withSubelements} type='tree' />

    <h2>Using Element components.</h2>
    <Navigation type='tree'>
      <Element label='Home' onClick={action('click home')} />
      <Element label='Issues' onClick={action('click issues')} />
      <Element label='Minor' onClick={action('click minor')}>
        <Navigation>
          <Element label='Minor label' onClick={action('click home')} />
        </Navigation>
      </Element>
    </Navigation>
  </div>
))

addStory('tabs', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Navigation elements={withSubelements} type='tabs' />

    <h2>Using Element components.</h2>
    <Navigation type='tabs'>
      <Element label='Home' onClick={action('click home')} />
      <Element label='Issues' onClick={action('click issues')} />
      <Element label='Minor' onClick={action('click minor')}>
        <Navigation>
          <Element label='Minor label' onClick={action('click home')} />
        </Navigation>
      </Element>
    </Navigation>
  </div>
))

addStory('steps', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Navigation elements={withoutSubelements} type='steps' />

    <h2>Using Element components.</h2>
    <Navigation type='steps'>
      <Element completed label='Cart' />
      <Element active label='Confirm' />
      <Element label='Shipping' />
      <Element label='Billing' />
    </Navigation>
  </div>
))

addStory('pagination', readme, () => (
  <div>
    <h2>Using element prop.</h2>
    <Pagination
      displayedLimit={1}
      pageCount={8}
      ellipsisPlaceholder={<Icon name='settings_ethernet' />}
    />

    <h2>Using Element components.</h2>
    <Navigation type='pagination'>
      <Element id='previous' onClick={action('click Previous')} label='Previous' />
      <Element id={1} active onClick={action('click 1')} label='1' />
      <Element id={2} onClick={action('click 2')} label='2' />
      <Element id={3} onClick={action('click 3')} label='3' />
      <Element id={4} onClick={action('click 4')} label='...' />
      <Element id='next' onClick={action('click Next')} label='Next' />
    </Navigation>
  </div>
))
