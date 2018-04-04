import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import RadioInput from './src/RadioInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Radio Input', module)

// Stories

addStory('default', readme, () => (
  <div>
    <h3>Radio group default</h3>
    <RadioInput name='default'>Option</RadioInput>
    <RadioInput name='default'>Option two</RadioInput>
    <br /><br />

    <h3>Radio group with default value</h3>
    <RadioInput name='default_checked'>Option</RadioInput>
    <RadioInput name='default_checked' defaultChecked>Option default checked</RadioInput>
    <br /><br />

    <h3>Default radio with disabled opition</h3>
    <RadioInput name='default_disabled'>Option</RadioInput>
    <RadioInput name='default_disabled' defaultChecked>Option default checked</RadioInput>
    <RadioInput name='default_disabled' disabled>Option disabled</RadioInput>
  </div>
))

addStory('small', readme, () => (
  <div>
    <h3>Radio group default</h3>
    <RadioInput size='small' name='default'>Option</RadioInput>
    <RadioInput size='small' name='default'>Option two</RadioInput>
    <br /><br />

    <h3>Radio group with default value</h3>
    <RadioInput size='small' name='default_checked'>Option</RadioInput>
    <RadioInput size='small' name='default_checked' defaultChecked>Option default checked</RadioInput>
    <br /><br />

    <h3>Default radio with disabled opition</h3>
    <RadioInput size='small' name='default_disabled'>Option</RadioInput>
    <RadioInput size='small' name='default_disabled' defaultChecked>Option default checked</RadioInput>
    <RadioInput size='small' name='default_disabled' disabled>Option disabled</RadioInput>
  </div>
))

addStory('large', readme, () => (
  <div>
    <h3>Radio group default</h3>
    <RadioInput size='large' name='default'>Option</RadioInput>
    <RadioInput size='large' name='default'>Option two</RadioInput>
    <br /><br />

    <h3>Radio group with default value</h3>
    <RadioInput size='large' name='default_checked'>Option</RadioInput>
    <RadioInput size='large' name='default_checked' defaultChecked>Option default checked</RadioInput>
    <br /><br />

    <h3>Default radio with disabled opition</h3>
    <RadioInput size='large' name='default_disabled'>Option</RadioInput>
    <RadioInput size='large' name='default_disabled' defaultChecked>Option default checked</RadioInput>
    <RadioInput size='large' name='default_disabled' disabled>Option disabled</RadioInput>
  </div>
))
