import React from 'react'
import moment from 'moment'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Button } from '@talixo/button'
import { Icon } from '@talixo/icon'

import Chat from './src/Chat'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Chat', module, {
  propTables: [ Chat ]
})

const name = 'Daniel'

const chatStyle = {
  height: '500px'
}

const messages = [
  {
    time: 1528104696738,
    message: 'This is message',
    name: 'John',
    id: '1'
  },
  {
    time: 1528104730633,
    message: 'This is reply',
    name: 'Tom',
    id: '2'
  }
]

const thumbup = {
  time: moment().valueOf(),
  message: <Icon name='thumb_up' />,
  name: name,
  id: '3'
}

const addTypingUser = (user, setState, state) => {
  const updatedUsers = user.status
    ? state.usersTyping.concat(user)
    : state.usersTyping.filter(typingUser => typingUser.id !== user.id)

  setState({ usersTyping: updatedUsers })
}

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <Chat
    style={chatStyle}
    messages={state.messages}
    addTypingUser={(user) => addTypingUser(user, setState, state)}
    onSubmit={message => {
      setState({ messages: state.messages.concat(message) })
    }}
    name={name}
    id='3'
    usersTyping={state.usersTyping}
  />
), () => ({
  messages: messages,
  usersTyping: []
}))

addStory.controlled('with additional information', readme, (setState, state) => (
  <Chat
    style={chatStyle}
    messages={state.messages}
    addTypingUser={(user) => addTypingUser(user, setState, state)}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    name={name}
    id='3'
    usersTyping={state.usersTyping}
    additionalInformation={<span>This is additional message</span>}
  />
), () => ({
  messages: messages,
  usersTyping: []
}))

addStory.controlled('with additional button', readme, (setState, state) => (
  <Chat
    style={chatStyle}
    messages={state.messages}
    addTypingUser={(user) => addTypingUser(user, setState, state)}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    name={name}
    id='3'
    usersTyping={state.usersTyping}
    additionalButton={<Icon
      style={{ cursor: 'pointer' }}
      name='thumb_up'
      onClick={() => setState({ messages: state.messages.concat(thumbup) })}
    />}
  />
), () => ({
  messages: messages,
  usersTyping: []
}))

addStory.controlled('multiple users typing', readme, (setState, state) => (
  <Chat
    style={chatStyle}
    messages={state.messages}
    addTypingUser={(user) => addTypingUser(user, setState, state)}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    name={name}
    id='3'
    usersTyping={state.usersTyping}
  />
), () => ({
  messages: messages,
  usersTyping: [{
    name: 'John',
    id: 1,
    status: true
  },
  {
    name: 'Kennedy',
    id: 4,
    status: true
  }]
}))

addStory.controlled('change types', readme, (setState, state) => (
  <div>
    <Button
      style={{ marginBottom: '16px' }}
      onClick={() => setState({ type: 'comments' })}
    >
      Comments
    </Button>
    <Button
      style={{ marginBottom: '16px' }}
      onClick={() => setState({ type: 'chat' })}
    >
      Chat
    </Button>
    <Chat
      style={chatStyle}
      messages={state.messages}
      addTypingUser={(user) => addTypingUser(user, setState, state)}
      onSubmit={message => setState({ messages: state.messages.concat(message) })}
      name={name}
      id='3'
      type={state.type}
      usersTyping={state.usersTyping}
    />
  </div>
), () => ({
  messages: messages,
  type: 'chat',
  usersTyping: []
}))
