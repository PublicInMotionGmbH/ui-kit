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

const user = 'Daniel'

const chatStyle = {
  height: '500px'
}

const messages = [
  {
    time: 1528104696738,
    message: 'This is message',
    user: 'John'
  },
  {
    time: 1528104730633,
    message: 'This is reply',
    user: 'Tom'
  }
]

const thumbup = {
  time: moment().valueOf(),
  message: <Icon name='thumb_up' />,
  user: user
}

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <Chat
    style={chatStyle}
    messages={state.messages}
    addTypingUser={(user) => {
      const updatedUsers = user.status
        ? state.usersTyping.concat(user)
        : state.usersTyping.filter(typingUser => typingUser.user !== user.user)
      setState({ usersTyping: updatedUsers })
    }}
    onSubmit={message => {
      setState({ messages: state.messages.concat(message) })
    }}
    user={user}
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
    addTypingUser={(user) => {
      const updatedUsers = user.status
        ? state.usersTyping.concat(user)
        : state.usersTyping.filter(typingUser => typingUser.user !== user.user)
      setState({ usersTyping: updatedUsers })
    }}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    user={user}
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
    addTypingUser={(user) => {
      const updatedUsers = user.status
        ? state.usersTyping.concat(user)
        : state.usersTyping.filter(typingUser => typingUser.user !== user.user)
      setState({ usersTyping: updatedUsers })
    }}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    user={user}
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
    addTypingUser={(user) => {
      const updatedUsers = user.status
        ? state.usersTyping.concat(user)
        : state.usersTyping.filter(typingUser => typingUser.user !== user.user)
      setState({ usersTyping: updatedUsers })
    }}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    user={user}
    usersTyping={state.usersTyping}
  />
), () => ({
  messages: messages,
  usersTyping: [{
    user: 'John',
    status: true
  },
  {
    user: 'Kennedy',
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
      addTypingUser={(user) => {
        const updatedUsers = user.status
          ? state.usersTyping.concat(user)
          : state.usersTyping.filter(typingUser => typingUser.user !== user.user)
        setState({ usersTyping: updatedUsers })
      }}
      onSubmit={message => setState({ messages: state.messages.concat(message) })}
      user={user}
      usersTyping={state.usersTyping}
      type={state.type}
    />
  </div>
), () => ({
  messages: messages,
  usersTyping: [{
    user: 'John',
    status: true,
    type: 'chat'
  }]
}))
