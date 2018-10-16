import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { action } from '@storybook/addon-actions'

import { Form } from '@talixo/form'
import { TextInput } from '@talixo/text-input'
import { Checkbox } from '@talixo/checkbox'
import Wizard from './src/Wizard'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Wizard', module, {
  propTables: [ Wizard ]
})

// Style for TextInput
const style = {
  marginBottom: 15
}

// Components for Wizard's steps
function Step1 (props) {
  return (
    <Form>
      <h3>Step 1</h3>
      <TextInput placeholder='First Step' style={style} />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

function Step2 (props) {
  return (
    <Form>
      <h3>Step 2</h3>
      <TextInput placeholder='Second Step' style={style} />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

function Step3 (props) {
  return (
    <Form>
      <h3>Step 3</h3>
      <TextInput placeholder='Third Step' style={style} />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

function Step4 (props) {
  return (
    <Form>
      <h3>Step 4</h3>
      <TextInput placeholder='Fourth Step' style={style} />
      <Checkbox onChange={change} size='small'>Check</Checkbox>
      <Checkbox onChange={change} size='small'>Box</Checkbox>
    </Form>
  )
}

const change = action('change')

// Stories

addStory('default', readme, () => (
  <Wizard>
    <Step1 />
    <Step2 />
    <Step3 />
  </Wizard>
))

addStory('with set starting step', readme, () => (
  <Wizard step={3}>
    <Step1 />
    <Step2 />
    <Step3 />
    <Step4 />
  </Wizard>
))

addStory('with one children', readme, () => (
  <Wizard>
    <Step1 />
  </Wizard>
))

addStory('without pagination', readme, () => (
  <Wizard pagination={false}>
    <Step1 />
  </Wizard>
))

addStory('with pagination props', readme, () => (
  <Wizard paginationProps={{
    displayedLimit: 9,
    nextLabel: 'NEXT STEP >',
    previousLabel: '< PREV STEP'
  }}>
    <Step1 />
    <Step2 />
    <Step3 />
    <Step4 />
  </Wizard>
))
