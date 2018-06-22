import React from 'react'

import { Button } from '@talixo/button'
import { Icon } from '@talixo/icon'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Divider from './src/Divider'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Divider', module, {
  propTables: [ Divider ]
})

// Mock text
const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus autem cupiditate laudantium molestiae neque numquam placeat quod saepe sit suscipit? Dolores enim facilis harum nostrum obcaecati quia, quibusdam vel. Asperiores blanditiis consequatur cum dolore doloremque ea explicabo facere fugit labore laborum magni, modi mollitia nostrum officia, quo saepe velit. Deleniti, distinctio dolores doloribus ducimus eaque eos, eveniet facilis fugit hic ipsam magnam obcaecati quos sed sint ut veritatis voluptates? Alias amet aperiam aut autem commodi consectetur distinctio dolorem doloribus earum esse facilis fuga fugiat id incidunt ipsum libero magnam omnis perspiciatis quibusdam rem repudiandae rerum saepe sint, tempora ut, voluptas!\n'

// Stories

addStory('initial', readme, () => (
  <div>
    <div style={{ fontSize: 30 }}>Content Top</div>
    <Divider>Divider with text</Divider>
    <div style={{ fontSize: 30 }}>Content Middle</div>
    <Divider />
    <div style={{ fontSize: 30 }}>Content Bottom</div>
  </div>
))

addStory('small', readme, () => (
  <div>
    <div style={{ fontSize: 30 }}>Content Top</div>
    <Divider small>Small divider with text</Divider>
    <div style={{ fontSize: 30 }}>Content Middle</div>
    <Divider small />
    <div style={{ fontSize: 30 }}>Content Bottom</div>
  </div>
))

addStory('custom content', readme, () => (
  <div>
    <Divider>
      <div style={{ textTransform: 'uppercase', fontWeight: 600 }}>
        <Icon name='calendar_outline' /> Calendar
      </div>
    </Divider>
    <Button color='primary' variant='full-width'>
      <div style={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>Add event</div>
    </Button>
    <br />
    <br />
    <Button color='primary' variant='full-width'>
      <div style={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>Delete Events</div>
    </Button>
    <br />
    <br />
    <Button color='primary' variant='full-width'>
      <div style={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>Set Notification</div>
    </Button>

    <Divider>
      <div style={{ textTransform: 'uppercase', fontWeight: 600 }}>
        <Icon name='settings' /> Settings
      </div>
    </Divider>
    <Button color='primary' variant='full-width'>
      <div style={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>Personal information</div>
    </Button>
    <br />
    <br />
    <Button color='primary' variant='full-width'>
      <div style={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>Notifications</div>
    </Button>
    <br />
    <br />
    <Button color='primary' variant='full-width'>
      <div style={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>Theme</div>
    </Button>
    <Divider />
  </div>
))

addStory('sections', readme, () => (
  <div>
    <h2>Default size</h2>
    <Divider><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 1</div></Divider>
    <div>{text}</div>
    <Divider><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 2</div></Divider>
    <div>{text}</div>
    <Divider><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 3</div></Divider>
    <div>{text}</div>
    <Divider><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 4</div></Divider>
    <div>{text}</div>
    <Divider />

    <h2>Small</h2>
    <Divider small><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 1</div></Divider>
    <div>{text}</div>
    <Divider small><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 2</div></Divider>
    <div>{text}</div>
    <Divider small><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 3</div></Divider>
    <div>{text}</div>
    <Divider small><div style={{ textTransform: 'uppercase', fontWeight: 600 }}>&#167; 4</div></Divider>
    <div>{text}</div>
    <Divider small />
  </div>
))
