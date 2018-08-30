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

// Styles
const style = {
  fontSize: '2em',
  color: '#3f42a0'
}

// Stories
addStory('initial', readme, () => (
  <Columns>
    <ColumnsElement>
      <h3>Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>Amet cillum deserunt.</h3>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
    <ColumnsElement>
      <h3>Amet cillum deserunt.</h3>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua, cillum deserunt fugiat duis ullamco aliqua.</p>
    </ColumnsElement>
    <ColumnsElement>
      <h3>Amet cillum deserunt.</h3>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua voluptate.</p>
      <p>Amet cillum deserunt fugiat duis ullamco aliqua voluptate.</p>
    </ColumnsElement>
  </Columns>
))

addStory('with max columns number', readme, () => (
  <Columns maxColumns={4}>
    <ColumnsElement>
      <h3>1. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>2. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>3. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>4. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>5. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>6. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>7. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>8. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>9.Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>10. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>11. Amet cillum deserunt.</h3>
    </ColumnsElement>
    <ColumnsElement>
      <h3>12. Amet cillum deserunt.</h3>
    </ColumnsElement>
  </Columns>
))

addStory('with icon in header', readme, () => (
  <Columns>
    <ColumnsElement headerIcon={<Icon name='beenhere' style={style} />}>
      <span style={style}>Amet</span>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
    <ColumnsElement headerIcon={<Icon name='dog' style={style} />}>
      <span style={style}>Cillum deserunt.</span>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
    <ColumnsElement headerIcon={<Icon name='pan_tool' style={style} />} >
      <span style={style}>Amet cillum.</span>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
    <ColumnsElement headerIcon={<Icon name='adb' style={style} />}>
      <span style={style}>Amet cillum.</span>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
      <p>Amet cillum deserunt fugiat duis ullamco.</p>
    </ColumnsElement>
  </Columns>
))
