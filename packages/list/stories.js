import React from 'react'

import List from './src/List'
import Icon from '../icon/src/Icon'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('List', module)

addStory('icon bullet', readme, () => (
  <List bullet={<Icon name='done' />}>
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
addStory('~ bullet', readme, () => (
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
))
