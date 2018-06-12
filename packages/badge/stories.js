import React from 'react'

import { Button } from '@talixo/button'
import { Navigation, Element } from '@talixo/navigation'
import { Icon } from '@talixo/icon'

import Badge from './src/Badge'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Badge', module, {
  propTables: [ Badge ],
  propTablesExclude: [ Button, Navigation, Element ]
})

addStory('default', readme, () => (
  <div>
    <Badge>1</Badge>{' '}
    <Badge>10</Badge>{' '}
    <Badge>100</Badge>{' '}
    <Badge>Badge</Badge>
  </div>
))

addStory('different types', readme, () => (
  <div>
    <Badge>1</Badge>{' '}
    <Badge>10</Badge>{' '}
    <Badge>100</Badge>{' '}
    <Badge>Badge</Badge>

    <br />
    <br />

    <Badge type='primary'>1</Badge>{' '}
    <Badge type='primary'>10</Badge>{' '}
    <Badge type='primary'>100</Badge>{' '}
    <Badge type='primary'>Badge</Badge>

    <br />
    <br />

    <Badge type='secondary'>1</Badge>{' '}
    <Badge type='secondary'>10</Badge>{' '}
    <Badge type='secondary'>100</Badge>{' '}
    <Badge type='secondary'>Badge</Badge>

    <br />
    <br />

    <Badge type='tertiary'>1</Badge>{' '}
    <Badge type='tertiary'>10</Badge>{' '}
    <Badge type='tertiary'>100</Badge>{' '}
    <Badge type='tertiary'>Badge</Badge>

    <br />
    <br />

    <Badge type='success'>1</Badge>{' '}
    <Badge type='success'>10</Badge>{' '}
    <Badge type='success'>100</Badge>{' '}
    <Badge type='success'>Badge</Badge>

    <br />
    <br />

    <Badge type='info'>1</Badge>{' '}
    <Badge type='info'>10</Badge>{' '}
    <Badge type='info'>100</Badge>{' '}
    <Badge type='info'>Badge</Badge>

    <br />
    <br />

    <Badge type='warning'>1</Badge>{' '}
    <Badge type='warning'>10</Badge>{' '}
    <Badge type='warning'>100</Badge>{' '}
    <Badge type='warning'>Badge</Badge>

    <br />
    <br />

    <Badge type='error'>1</Badge>{' '}
    <Badge type='error'>10</Badge>{' '}
    <Badge type='error'>100</Badge>{' '}
    <Badge type='error'>Badge</Badge>
  </div>
))

addStory('as pills', readme, () => (
  <div>
    <Badge pill>1</Badge>{' '}
    <Badge pill>10</Badge>{' '}
    <Badge pill>100</Badge>{' '}
    <Badge pill>Badge</Badge>

    <br />
    <br />

    <Badge pill type='primary'>1</Badge>{' '}
    <Badge pill type='primary'>10</Badge>{' '}
    <Badge pill type='primary'>100</Badge>{' '}
    <Badge pill type='primary'>Badge</Badge>

    <br />
    <br />

    <Badge pill type='secondary'>1</Badge>{' '}
    <Badge pill type='secondary'>10</Badge>{' '}
    <Badge pill type='secondary'>100</Badge>{' '}
    <Badge pill type='secondary'>Badge</Badge>

    <br />
    <br />

    <Badge pill type='tertiary'>1</Badge>{' '}
    <Badge pill type='tertiary'>10</Badge>{' '}
    <Badge pill type='tertiary'>100</Badge>{' '}
    <Badge pill type='tertiary'>Badge</Badge>

    <br />
    <br />

    <Badge pill type='success'>1</Badge>{' '}
    <Badge pill type='success'>10</Badge>{' '}
    <Badge pill type='success'>100</Badge>{' '}
    <Badge pill type='success'>Badge</Badge>

    <br />
    <br />

    <Badge pill type='info'>1</Badge>{' '}
    <Badge pill type='info'>10</Badge>{' '}
    <Badge pill type='info'>100</Badge>{' '}
    <Badge pill type='info'>Badge</Badge>

    <br />
    <br />

    <Badge pill type='warning'>1</Badge>{' '}
    <Badge pill type='warning'>10</Badge>{' '}
    <Badge pill type='warning'>100</Badge>{' '}
    <Badge pill type='warning'>Badge</Badge>

    <br />
    <br />

    <Badge pill type='error'>1</Badge>{' '}
    <Badge pill type='error'>10</Badge>{' '}
    <Badge pill type='error'>100</Badge>{' '}
    <Badge pill type='error'>Badge</Badge>
  </div>
))

const remove = action('remove')

addStory('with remove button', readme, () => (
  <div>
    <Badge onRemove={remove}>Skipper</Badge>{' '}
    <Badge onRemove={remove} type='primary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} type='secondary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} type='tertiary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} type='success'>Skipper</Badge>{' '}
    <Badge onRemove={remove} type='info'>Skipper</Badge>{' '}
    <Badge onRemove={remove} type='warning'>Skipper</Badge>{' '}
    <Badge onRemove={remove} type='error'>Skipper</Badge>

    <br />
    <br />

    <Badge onRemove={remove} pill>Skipper</Badge>{' '}
    <Badge onRemove={remove} pill type='primary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} pill type='secondary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} pill type='tertiary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} pill type='success'>Skipper</Badge>{' '}
    <Badge onRemove={remove} pill type='info'>Skipper</Badge>{' '}
    <Badge onRemove={remove} pill type='warning'>Skipper</Badge>{' '}
    <Badge onRemove={remove} pill type='error'>Skipper</Badge>
  </div>
))

addStory('custom remove button', readme, () => (
  <div>
    <Badge onRemove={remove} removeText={<Icon name='close' />}>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} type='primary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} type='secondary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} type='tertiary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} type='success'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} type='info'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} type='warning'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} type='error'>Skipper</Badge>

    <br />
    <br />

    <Badge onRemove={remove} removeText={<Icon name='close' />} pill>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} pill type='primary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} pill type='secondary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} pill type='tertiary'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} pill type='success'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} pill type='info'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} pill type='warning'>Skipper</Badge>{' '}
    <Badge onRemove={remove} removeText={<Icon name='close' />} pill type='error'>Skipper</Badge>
  </div>
))

addStory('inside button', readme, () => (
  <div>
    <Button>
      Mail <Badge type='primary' pill>10 unread</Badge>
    </Button>
    <Button>
      Warnings <Badge type='warning' pill>10 problems</Badge>
    </Button>
    <Button >
      Trash <Badge pill>10</Badge>
    </Button>
  </div>
))

addStory('inside tab', readme, () => (
  <Navigation type='tabs'>
    <Element>
      Mail
      <Badge type='primary' pill>10 unread</Badge>
    </Element>
    <Element>
      info
      <Badge type='info' pill>1</Badge>
    </Element>
    <Element>
      Settings
      <Badge type='success' pill>200</Badge>
    </Element>
  </Navigation>
))
