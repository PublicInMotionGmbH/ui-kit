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
    time: 1528104730633,
    message: 'This is message',
    name: 'John',
    id: '1'
  },
  {
    time: '2018-06-04T11:35:00+02:00',
    message: 'This is reply',
    name: 'Tom',
    id: '2'
  }
]

// Simulation

const randomMessages = [
  'Hi',
  'How are you?',
  'Can I help you?',
  'OK',
  'Give me a second',
  'How you doin?',
  'No, I don\'t think so...',
  'Amazing!',
  'Wow'
]

const names = ['Mike', 'Tom', 'Susan', 'George', 'Lilly']

let simulation

function startSimulation (setState, state) {
  setState({ simulation: true })

  simulation = setInterval(() => {
    const randomUser = {
      name: names[Math.floor(Math.random(names.length) * names.length)],
      id: Math.floor(Math.random() * 10000).toString(),
      status: true
    }

    const randomMessage = () => ({
      time: moment().valueOf(),
      message: randomMessages[Math.floor(Math.random(randomMessages.length) * randomMessages.length)],
      name: randomUser.name,
      id: randomUser.id
    })

    setState({
      usersTyping: state.usersTyping.concat(randomUser)
    })

    setTimeout(() => setState({
      usersTyping: state.usersTyping
        .filter(typingUser => typingUser.id !== randomUser.id)
    }), 4000)

    setTimeout(() => setState({
      messages: state.messages.concat(randomMessage())
    }), 2000)
  }, Math.floor(Math.random() * 5000))
}

function stopSimulation (setState, state) {
  clearInterval(simulation)

  setState({ simulation: false })
}

// Helpers

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

addStory.controlled('with custom message renderer', readme, (setState, state) => (
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
    messageRenderer={(n) => n.toUpperCase()}
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

addStory.controlled('chat simulation', readme, (setState, state) => {
  return (
    <div>
      <Button
        onClick={() => state.simulation
          ? stopSimulation(setState, state)
          : startSimulation(setState, state)
        }
      >
        {state.simulation ? 'Stop' : 'Start'} Simulation
      </Button>
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
    </div>
  )
}, () => ({
  simulation: false,
  messages: [],
  usersTyping: []
}))
