import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Notification from './src/Notification'
import NotificationsList from './src/NotificationsList'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Notification', module, {
  propTables: [ Notification, NotificationsList ]
})

function random (arr) {
  return arr[Math.floor((Math.random() * arr.length) % arr.length)]
}

let index = 0

function buildRandomNotification () {
  return {
    type: [
      undefined, 'toast', 'info', 'success', 'primary',
      'secondary', 'tertiary', 'error', 'warning'
    ][(++index) % 9],
    content: <div>
      <strong key='title'>{random([
        'Just a message for you.',
        'Your user registration was successful.',
        'There were some errors with your registration.',
        'Warning!',
        'Information'
      ])}</strong>

      <p key='text'>{random([
        'You must include both a upper and lower-case letters in your password.',
        'You are using a weak password, we recommend creating a new one.',
        'Your booking will be reserved for next 24 hours.',
        'You can always look at other examples.',
        'You may now log-in with the username you have chosen.'
      ])}</p>
    </div>
  }
}

const notifications = [
  buildRandomNotification(),
  buildRandomNotification(),
  buildRandomNotification(),
  buildRandomNotification(),
  buildRandomNotification()
]

// Stories
addStory('default', readme, () => (
  <Notification>
    <strong>Your user registration was successful.</strong>

    <p>You may now log-in with the username you have chosen</p>
  </Notification>
))

addStory('different types', readme, () => (
  <div>
    <Notification style={{ marginTop: 10, marginBottom: 10 }}>
      <strong>Your user registration was successful.</strong>

      <p>You may now log-in with the username you have chose.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='primary'>
      <strong>New updates!</strong>

      <p>We have updated a lot of features.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='secondary'>
      <strong>New updates!</strong>

      <p>We have updated a lot of features.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='tertiary'>
      <strong>New updates!</strong>

      <p>We have updated a lot of features.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='error'>
      <strong>There were some errors with your registration.</strong>

      <p>You must include both a upper and lower-case letters in your password.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='warning'>
      <strong>Warning!</strong>

      <p>You are using a weak password, we recommend creating a new one.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='info'>
      <strong>Information</strong>

      <p>Your booking will be reserved for 24 hours.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='success'>
      <strong>Your user registration was successful.</strong>

      <p>You may now log-in with the username you have chosen.</p>
    </Notification>
  </div>
))

addStory('on smaller size', readme, () => (
  <div style={{ width: '300px' }}>
    <Notification style={{ marginTop: 10, marginBottom: 10 }}>
      <strong>Your user registration was successful.</strong>

      <p>You may now log-in with the username you have chose.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='primary'>
      <strong>New updates!</strong>

      <p>We have updated a lot of features.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='secondary'>
      <strong>New updates!</strong>

      <p>We have updated a lot of features.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='tertiary'>
      <strong>New updates!</strong>

      <p>We have updated a lot of features.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='error'>
      <strong>There were some errors with your registration.</strong>

      <p>You must include both a upper and lower-case letters in your password.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='warning'>
      <strong>Warning!</strong>

      <p>You are using a weak password, we recommend creating a new one.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='info'>
      <strong>Information</strong>

      <p>Your booking will be reserved for 24 hours.</p>
    </Notification>

    <Notification style={{ marginTop: 10, marginBottom: 10 }} type='success'>
      <strong>Your user registration was successful.</strong>

      <p>You may now log-in with the username you have chosen.</p>
    </Notification>
  </div>
))

addStory('notifications list', readme, () => (
  <NotificationsList items={notifications} />
))

addStory.controlled('sticky notifications list', readme, (setState, state) => (
  <div>
    <br />

    <button onClick={() => setState({ notifications: state.notifications.concat(buildRandomNotification()) })}>Add on end</button>
    <button onClick={() => setState({ notifications: [ buildRandomNotification() ].concat(state.notifications) })}>Add on beginning</button>

    <br />

    <button style={state.horizontal === 'start' ? { fontWeight: 'bold' } : null} onClick={() => setState({ horizontal: 'start' })}>
      Start
    </button>

    <button style={state.horizontal === 'center' ? { fontWeight: 'bold' } : null} onClick={() => setState({ horizontal: 'center' })}>
      Center
    </button>

    <button style={state.horizontal === 'end' ? { fontWeight: 'bold' } : null} onClick={() => setState({ horizontal: 'end' })}>
      End
    </button>

    <br />

    <button style={state.vertical === 'top' ? { fontWeight: 'bold' } : null} onClick={() => setState({ vertical: 'top' })}>
      Top
    </button>

    <button style={state.vertical === 'bottom' ? { fontWeight: 'bold' } : null} onClick={() => setState({ vertical: 'bottom' })}>
      Bottom
    </button>

    <NotificationsList
      sticky
      horizontal={state.horizontal}
      vertical={state.vertical}
      items={state.notifications}
    />
  </div>
), () => ({
  notifications: notifications.slice(),
  horizontal: 'start',
  vertical: 'bottom'
}))

addStory.controlled('RTL: sticky notifications list', readme, (setState, state) => (
  <div dir='rtl'>
    <br />

    <button onClick={() => setState({ notifications: state.notifications.concat(buildRandomNotification()) })}>Add on end</button>
    <button onClick={() => setState({ notifications: [ buildRandomNotification() ].concat(state.notifications) })}>Add on beginning</button>

    <br />

    <button style={state.horizontal === 'start' ? { fontWeight: 'bold' } : null} onClick={() => setState({ horizontal: 'start' })}>
      Start
    </button>

    <button style={state.horizontal === 'center' ? { fontWeight: 'bold' } : null} onClick={() => setState({ horizontal: 'center' })}>
      Center
    </button>

    <button style={state.horizontal === 'end' ? { fontWeight: 'bold' } : null} onClick={() => setState({ horizontal: 'end' })}>
      End
    </button>

    <br />

    <button style={state.vertical === 'top' ? { fontWeight: 'bold' } : null} onClick={() => setState({ vertical: 'top' })}>
      Top
    </button>

    <button style={state.vertical === 'bottom' ? { fontWeight: 'bold' } : null} onClick={() => setState({ vertical: 'bottom' })}>
      Bottom
    </button>

    <NotificationsList
      sticky
      horizontal={state.horizontal}
      vertical={state.vertical}
      items={state.notifications}
    />
  </div>
), () => ({
  notifications: notifications.slice(),
  horizontal: 'start',
  vertical: 'bottom'
}))
