import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import Columns from './src/Columns'
import ColumnsElement from './src/ColumnsElement'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Columns', module, {
  propTables: [ Columns ]
})

// Stories
addStory('basic', readme, () => (
  <Columns>
    <ColumnsElement header='Amet cillum deserunt.'>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>

    <ColumnsElement header='Amet cillum deserunt.'>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua, cillum deserunt fugiat duis ullamco aliqua.</p>
    </ColumnsElement>

    <ColumnsElement header='Amet cillum deserunt.'>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua voluptate.</p>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua voluptate.</p>
    </ColumnsElement>

    <ColumnsElement header='Amet cillum deserunt.'>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua voluptate.</p>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua voluptate.</p>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua voluptate.</p>
    </ColumnsElement>
  </Columns>
))

addStory('with max columns number', readme, () => (
  <Columns maxColumns={4}>
    <ColumnsElement header='1. Amet cillum deserunt.' />
    <ColumnsElement header='2. Amet cillum deserunt.' />
    <ColumnsElement header='3. Amet cillum deserunt.' />
    <ColumnsElement header='4. Amet cillum deserunt.' />
    <ColumnsElement header='5. Amet cillum deserunt.' />
    <ColumnsElement header='6. Amet cillum deserunt.' />
    <ColumnsElement header='7. Amet cillum deserunt.' />
    <ColumnsElement header='8. Amet cillum deserunt.' />
  </Columns>
))

addStory('with icon in header', readme, () => (
  <Columns>
    <ColumnsElement icon={<Icon name='beenhere' />} header='Amet'>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
    <ColumnsElement icon={<Icon name='dog' />} header='Cillum deserunt.'>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
    <ColumnsElement icon={<Icon name='pan_tool' />} header='Amet cillum.'>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
    <ColumnsElement icon={<Icon name='adb' />} header='Amet cillum.'>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
  </Columns>
))
