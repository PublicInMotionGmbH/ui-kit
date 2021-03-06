import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Icon from './src/Icon'
import StorybookIcons from './src/storybook/StorybookIcons'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Icon', module, {
  propTables: [ Icon ]
})

addStory('simple', readme, () => (
  <div style={{ lineHeight: '64px' }}>
    <Icon name='mobile_apps' />
    <Icon name='mobile_apps' style={{ fontSize: '24px' }} />
    <Icon name='mobile_apps' style={{ fontSize: '32px' }} />
    <Icon name='mobile_apps' style={{ fontSize: '48px' }} />
    <Icon name='mobile_apps' style={{ fontSize: '64px' }} />

    <br />

    <Icon name='account_circle' style={{ color: '#f03a1f' }} />
    <Icon name='account_circle' style={{ color: '#f03a1f', fontSize: '24px' }} />
    <Icon name='account_circle' style={{ color: '#f03a1f', fontSize: '32px' }} />
    <Icon name='account_circle' style={{ color: '#f03a1f', fontSize: '48px' }} />
    <Icon name='account_circle' style={{ color: '#f03a1f', fontSize: '64px' }} />
  </div>
))

addStory('overview', readme, () => (
  <StorybookIcons />
))
