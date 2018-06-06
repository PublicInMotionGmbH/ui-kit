import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Button } from '@talixo/button'

import Chat from './src/Chat'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Chat', module, {
  propTables: [ Chat ]
})

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

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <Chat
    messages={state.messages}
    addTypingUser={(user) => {
      const updatedUsers = user.status
        ? state.usersTyping.concat(user)
        : state.usersTyping.filter(typingUser => typingUser.user !== user.user)
      setState({ usersTyping: updatedUsers })
    }}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    user='Daniel'
    usersTyping={state.usersTyping}
  />
), () => ({
  messages: messages,
  usersTyping: [{
    user: 'John',
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
      messages={state.messages}
      addTypingUser={(user) => {
        const updatedUsers = user.status
          ? state.usersTyping.concat(user)
          : state.usersTyping.filter(typingUser => typingUser.user !== user.user)
        setState({ usersTyping: updatedUsers })
      }}
      onSubmit={message => setState({ messages: state.messages.concat(message) })}
      user='Daniel'
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
