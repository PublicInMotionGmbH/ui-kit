import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Notification from './src/Notification'
import NotificationList from './src/NotificationList'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Notification', module)

const notifications = [
  {
    variant: null,
    title: 'Just a message for you.',
    message: 'You can always look at other examples',
    id: 0
  },
  {
    variant: 'success',
    title: 'Your user registration was successful.',
    message: 'You may now log-in with the username you have chosen',
    id: 1
  },
  {
    variant: 'error',
    title: 'There were some errors with your registration.',
    message: 'You must include both a upper and lower case letters in your password',
    id: 2
  },
  {
    variant: 'warning',
    title: 'Warning!',
    message: 'You are using a weak password, we reccomend creating a new one',
    id: 3
  },
  {
    variant: 'information',
    title: 'Information',
    message: 'Your booking will be reserved for 24 hours',
    id: 4
  }
]

// Stories
addStory('default', readme, () => (
  <Notification style={{ width: '300px' }}>
    <strong>Your user registration was successful.</strong>
    <br />
    <span>You may now log-in with the username you have chosen</span>
  </Notification>
))
addStory('success', readme, () => (
  <Notification style={{ width: '300px' }} variant='information'>
    <strong>Your user registration was successful.</strong>
    <br />
    <span>You may now log-in with the username you have chosen</span>
  </Notification>
))
addStory('error', readme, () => (
  <Notification style={{ width: '300px' }} variant='error'>
    <strong>There were some errors with your registration.</strong>
    <br />
    <span>You must include both a upper and lower case letters in your password</span>
  </Notification>
))
addStory('warning', readme, () => (
  <Notification style={{ width: '300px' }} variant='warning'>
    <strong>Warning!</strong>
    <br />
    <span>You are using a weak password, we reccomend creating a new one</span>
  </Notification>
))
addStory('information', readme, () => (
  <Notification style={{ width: '300px' }} variant='information'>
    <strong>Information</strong>
    <br />
    <span>Your booking will be reserved for 24 hours</span>
  </Notification>
))
addStory('notifications group', readme, () => (
  <NotificationList>
    {notifications.map(notification => (
      <Notification key={notification.id} id={notification.id} variant={notification.variant}>
        <strong>{notification.title}</strong>
        <br />
        <span>{notification.message}</span>
      </Notification>
    ))}
  </NotificationList>
))
