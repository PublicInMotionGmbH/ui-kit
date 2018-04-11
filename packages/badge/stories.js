import React from 'react'

import Badge from './src/Badge'
import Button from '@talixo/button'
import Tab from '@talixo/tab'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Badge', module, {
  propTables: [ Badge ],
  propTablesExclude: [ Button, Tab ]
})

addStory('default', readme, () =>
  <div>
    <Badge>1</Badge>{' '}
    <Badge>10</Badge>{' '}
    <Badge>100</Badge>{' '}
    <Badge>Badge</Badge>
  </div>
)
addStory('inside button', readme, () =>
  <div>
    <Button>
      Mail <Badge>10 unread</Badge>
    </Button>
    <Button color='primary'>
      Warnings <Badge>10 problems</Badge>
    </Button>
    <Button color='black'>
      Trash <Badge>10</Badge>
    </Button>
  </div>
)
addStory('inside tab', readme, () =>
  <div>
    <Tab>
      Mail
      <Badge>10 unread</Badge>
    </Tab>
    <Tab>
      info
      <Badge>1</Badge>
    </Tab>
    <Tab>
      Settings
      <Badge>200</Badge>
    </Tab>
  </div>
)
