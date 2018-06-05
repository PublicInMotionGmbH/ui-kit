import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Chat from './src/Chat'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Chat', module, {
  propTables: [ Chat ]
})

const messages = [
  {
    date: 1528104696738,
    message: 'This is message',
    user: 'John'
  },
  {
    date: 1528104730633,
    message: 'This is reply',
    user: 'Tom'
  }
]

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <Chat
    messages={state.messages}
    onChange={() => {
      setState({ writing: true })
      setTimeout(() => setState({ writing: false }), 1000)
    }}
    onSubmit={message => setState({ messages: state.messages.concat(message) })}
    user='Daniel'
    writing={state.writing}
  />
), () => ({
  messages: messages,
  writing: false
}))
