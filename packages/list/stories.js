import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import List from './src/List'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('List', module, {
  propTables: [ List ],
  propTablesExclude: [ Icon ]
})

addStory('default', readme, () => (
  <List>
    <span>
      Live ride info, price estimation and flight number <br />tracking
    </span>
    <span>Standardized, insured service worldwide</span>
    <span>Different car classes (Taxi, VAN, Limousine)</span>
    <span>Pre-screened, licensed drivers and vehicles</span>
    <span>Children seats and other facilities</span>
    <span>
      24/7 customer support, 9 languages (EN, DE, ES, FR, IT, <br />PL, RU, CHI, AR)
    </span>
  </List>
))
// {<Icon name='done' style={{ color: 'green' }} />}
addStory('custom bullet', readme, () => (
  <div>
    <h2>List with custom character bullet "~"</h2>
    <List bullet='~'>
      <span>
        Live ride info, price estimation and flight number <br />tracking
      </span>
      <span>Standardized, insured service worldwide</span>
      <span>Different car classes (Taxi, VAN, Limousine)</span>
      <span>Pre-screened, licensed drivers and vehicles</span>
      <span>Children seats and other facilities</span>
      <span>
        24/7 customer support, 9 languages (EN, DE, ES, FR, IT, <br />PL, RU, CHI, AR)
      </span>
    </List>
    <h2>List with Icon component as bullet <Icon name='done' style={{ color: 'green' }} /></h2>
    <List bullet={<Icon name='done' style={{ color: 'green' }} />}>
      <span>
        Live ride info, price estimation and flight number <br />tracking
      </span>
      <span>Standardized, insured service worldwide</span>
      <span>Different car classes (Taxi, VAN, Limousine)</span>
      <span>Pre-screened, licensed drivers and vehicles</span>
      <span>Children seats and other facilities</span>
      <span>
        24/7 customer support, 9 languages (EN, DE, ES, FR, IT, <br />PL, RU, CHI, AR)
      </span>
    </List>
  </div>
))
