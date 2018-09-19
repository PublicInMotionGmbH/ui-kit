import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Avatar from './src/Avatar'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Avatar', module, {
  propTables: [ Avatar ]
})

// Stories

addStory('image', readme, () => (
  <div>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar
        alt='js-logo'
        src='http://i.pravatar.cc/300?1'
      />
      <Avatar
        alt='js-logo'
        src='http://i.pravatar.cc/300?1'
        size={24}
      />
      <Avatar
        alt='js-logo'
        src='http://i.pravatar.cc/300?1'
        size={32}
      />
      <Avatar
        alt='js-logo'
        src='http://i.pravatar.cc/300?1'
        size={48}
      />
      <Avatar
        alt='js-logo'
        src='http://i.pravatar.cc/300?1'
        size={64}
      />
    </div>

    <br />

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar
        rounded
        alt='js-logo'
        src='http://i.pravatar.cc/300?2'
      />
      <Avatar
        rounded
        alt='js-logo'
        src='http://i.pravatar.cc/300?2'
        size={24}
      />
      <Avatar
        rounded
        alt='js-logo'
        src='http://i.pravatar.cc/300?2'
        size={32}
      />
      <Avatar
        rounded
        alt='js-logo'
        src='http://i.pravatar.cc/300?2'
        size={48}
      />
      <Avatar
        rounded
        alt='js-logo'
        src='http://i.pravatar.cc/300?2'
        size={64}
      />
    </div>
  </div>
))

addStory('icon', readme, () => (
  <div>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar icon='avatar' />
      <Avatar icon='avatar' size={24} />
      <Avatar icon='avatar' size={32} />
      <Avatar icon='avatar' size={48} />
      <Avatar icon='avatar' size={64} />
    </div>

    <br />

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar rounded icon='avatar' />
      <Avatar rounded icon='avatar' size={24} />
      <Avatar rounded icon='avatar' size={32} />
      <Avatar rounded icon='avatar' size={48} />
      <Avatar rounded icon='avatar' size={64} />
    </div>

    <br />

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar rounded icon='avatar' style={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }} />
      <Avatar rounded icon='avatar' style={{ backgroundColor: '#ffff33' }} />
      <Avatar rounded icon='avatar' style={{ backgroundColor: '#273440', color: '#ffffff' }} />
      <Avatar rounded icon='avatar' style={{ backgroundColor: '#6F7B80' }} />
      <Avatar rounded icon='avatar' style={{ backgroundColor: '#000000', color: '#ffffff' }} />
    </div>
  </div>
))

addStory('text', readme, () => (
  <div>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar>H</Avatar>
      <Avatar size={24}>H</Avatar>
      <Avatar size={32}>H</Avatar>
      <Avatar size={48}>H</Avatar>
      <Avatar size={64}>H</Avatar>
    </div>

    <br />

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar rounded>H</Avatar>
      <Avatar rounded size={24}>H</Avatar>
      <Avatar rounded size={32}>H</Avatar>
      <Avatar rounded size={48}>H</Avatar>
      <Avatar rounded size={64}>H</Avatar>
    </div>

    <br />

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '300px'
    }}>
      <Avatar rounded style={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }}>H</Avatar>
      <Avatar rounded style={{ backgroundColor: '#ffff33' }}>H</Avatar>
      <Avatar rounded style={{ backgroundColor: '#273440', color: '#ffffff' }}>H</Avatar>
      <Avatar rounded style={{ backgroundColor: '#6F7B80' }}>H</Avatar>
      <Avatar rounded style={{ backgroundColor: '#000000', color: '#ffffff' }}>H</Avatar>
    </div>
  </div>
))

addStory('image error', readme, () => (
  <Avatar
    alt='js-logo'
    src='some-invalid-url'
  />
))

addStory('image error with default text', readme, () => (
  <Avatar
    defaultText='A'
    alt='js-logo'
    src='some-invalid-url'
  />
))

addStory('image error with default icon', readme, () => (
  <Avatar
    defaultIcon='avatar'
    alt='js-logo'
    src='some-invalid-url'
  />
))
