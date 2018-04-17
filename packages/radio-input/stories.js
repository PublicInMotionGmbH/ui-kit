import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import RadioInput from './src/RadioInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Radio Input', module)
const change = action('change')

// Stories

addStory('default', readme, () => (
  <div>
    <h2>Default radio</h2>
    <RadioInput onChange={change} name='default'>Option</RadioInput>
    <RadioInput onChange={change} name='default'>Option two</RadioInput>
    <br /><br />

    <h2>Radio group with default value</h2>
    <RadioInput onChange={change} name='default_checked'>Option</RadioInput>
    <RadioInput onChange={change} name='default_checked' defaultChecked>Option default checked</RadioInput>
    <br /><br />

    <h2>Default radio with disabled opition</h2>
    <RadioInput onChange={change} name='default_disabled'>Option</RadioInput>
    <RadioInput onChange={change} name='default_disabled' defaultChecked>Option default checked</RadioInput>
    <RadioInput onChange={change} name='default_disabled' disabled>Option disabled</RadioInput>
  </div>
))

addStory('small', readme, () => (
  <div>
    <h2>Default radio</h2>
    <RadioInput onChange={change} size='small' name='default'>Option</RadioInput>
    <RadioInput onChange={change} size='small' name='default'>Option two</RadioInput>
    <br /><br />

    <h2>Radio group with default value</h2>
    <RadioInput onChange={change} size='small' name='default_checked'>Option</RadioInput>
    <RadioInput onChange={change} size='small' name='default_checked' defaultChecked>Option default checked</RadioInput>
    <br /><br />

    <h2>Default radio with disabled opition</h2>
    <RadioInput onChange={change} size='small' name='default_disabled'>Option</RadioInput>
    <RadioInput onChange={change} size='small' name='default_disabled' defaultChecked>Option default checked</RadioInput>
    <RadioInput onChange={change} size='small' name='default_disabled' disabled>Option disabled</RadioInput>
  </div>
))

addStory('large', readme, () => (
  <div>
    <h2>Default radio</h2>
    <RadioInput onChange={change} size='large' name='default'>Option</RadioInput>
    <RadioInput onChange={change} size='large' name='default'>Option two</RadioInput>
    <br /><br />

    <h2>Radio group with default value</h2>
    <RadioInput onChange={change} size='large' name='default_checked'>Option</RadioInput>
    <RadioInput onChange={change} size='large' name='default_checked' defaultChecked>Option default checked</RadioInput>
    <br /><br />

    <h2>Default radio with disabled opition</h2>
    <RadioInput onChange={change} size='large' name='default_disabled'>Option</RadioInput>
    <RadioInput onChange={change} size='large' name='default_disabled' defaultChecked>Option default checked</RadioInput>
    <RadioInput onChange={change} size='large' name='default_disabled' disabled>Option disabled</RadioInput>
  </div>
))
