import React from 'react'
import { shallow } from 'enzyme'

import Chat from '../src/Chat'
import Message from '../src/Message'

jest.mock('moment', () => {
  const moment = require.requireActual('moment')
  return moment.utc
})

let D = global.Date.now

function mock (date) {
  global.Date.now = jest.fn(() => date)
}

function unmock () {
  global.Date.now = D
}

const messages = [
  {
    time: 1528104696738,
    message: 'This is message',
    name: 'John',
    id: '2'
  },
  {
    time: 1528104730633,
    message: 'This is reply',
    name: 'Tom',
    id: '3'
  },
  {
    time: 1528104730633,
    message: 'This is reply',
    name: 'Me',
    id: '1'
  }
]

describe('<Chat />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Chat messages={messages} id='1' />)

    expect(wrapper).toMatchSnapshot()
  })
})

describe('componentDidUpdate', () => {
  it('fires addTypingUser when state.typingStatus is updated', () => {
    let user
    const spy = jest.fn().mockImplementation(n => { user = n })
    const wrapper = shallow(<Chat messages={messages} addTypingUser={spy} id='1' />)

    wrapper.setState({ typingStatus: true })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(user.status).toEqual(true)
  })

  it('fires scrollToBottom when new messages are provided', () => {
    const wrapper = shallow(<Chat messages={messages} id='1' />)
    const scrollToBottom = jest.spyOn(wrapper.instance(), 'scrollToBottom').mockImplementation(n => n)

    wrapper.setProps({ messages: messages.concat(messages[0]) })

    expect(scrollToBottom).toHaveBeenCalledTimes(1)
  })
})

describe('handleInputChange', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('changes state.typingStatus to true', () => {
    const wrapper = shallow(<Chat messages={messages} id='1' />)
    const input = wrapper.find('TextInput')
    const status = wrapper.state().typingStatus

    input.simulate('change', 'a')

    expect(wrapper.state().typingStatus).toEqual(!status)
  })

  it('changes state.typingStatus to false after 2000ms', () => {
    const wrapper = shallow(<Chat messages={messages} id='1' />)
    const input = wrapper.find('TextInput')
    const status = wrapper.state().typingStatus

    input.simulate('change', 'a')

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000)
    expect(wrapper.state().typingStatus).toEqual(!status)

    jest.runTimersToTime(2000)

    expect(wrapper.state().typingStatus).toEqual(status)
  })

  it('clears timeout if state.typingStatus is true', () => {
    const wrapper = shallow(<Chat messages={messages} id='1' />)
    const input = wrapper.find('TextInput')

    wrapper.setState({ typingStatus: true })
    input.simulate('change', 'a')

    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })
})

describe('handleSubmit', () => {
  let event, form, message, onSubmit, wrapper
  beforeEach(() => {
    onSubmit = jest.fn().mockImplementation(n => { message = n })
    wrapper = shallow(<Chat messages={messages} onSubmit={onSubmit} id='1' />)
    form = wrapper.find('form')
    event = {
      preventDefault: () => {},
      persist: () => {},
      stopPropagation: () => {}
    }
  })

  it('prevents default', () => {
    const spy = jest.spyOn(event, 'preventDefault')
    form.simulate('submit', event)

    expect(spy).toBeCalled()
  })

  it('persists', () => {
    const spy = jest.spyOn(event, 'persist')
    form.simulate('submit', event)

    expect(spy).toBeCalled()
  })

  it('stops propagation', () => {
    const spy = jest.spyOn(event, 'stopPropagation')
    form.simulate('submit', event)

    expect(spy).toBeCalled()
  })

  it('builds and submits message correctly', () => {
    mock(1483228800000)
    const name = 'John'
    wrapper.setProps({ name })
    wrapper.setState({ inputValue: 'a' })
    form.simulate('submit', event)

    const expectedMessage = {
      time: 1483228800000,
      message: 'a',
      name: name,
      id: '1'
    }

    expect(message).toEqual(expectedMessage)
    unmock()
  })

  it('sets state.inputValue to empty string', () => {
    form.simulate('submit', event)

    expect(wrapper.state().inputValue).toEqual('')
  })

  it('renders classNames correctly', () => {
    const wrapper = shallow(<Chat id='1' messages={messages} />)

    expect(wrapper.find('.talixo-chat').length).toBe(1)
    expect(wrapper.find('.talixo-chat__messages').length).toBe(1)
    expect(wrapper.find('.talixo-chat__message.talixo-chat__message--chat').length).toBe(3)
    expect(wrapper.find('.talixo-chat__user-typing-container').length).toBe(1)
    expect(wrapper.find('.talixo-chat__input-container').length).toBe(1)
    expect(wrapper.find('.talixo-chat__input-container-inner').length).toBe(1)
  })

  it('renders renderMessages type chat correctly', () => {
    const wrapper = shallow(<Chat id='1' messages={messages} />)

    expect(wrapper.find(Message).at(0).props().className).toMatch(/.talixo-chat__message--chat/)
  })

  it('renders renderMessages type comments correctly', () => {
    const wrapper = shallow(<Chat id='1' type='comments' messages={messages} />)

    expect(wrapper.find(Message).at(0).props().className).toMatch(/.talixo-chat__message--comments/)
  })

  it('sets margin-left correctly', () => {
    const wrapper = shallow(<Chat id='1' messages={messages} />)

    expect(wrapper.find(Message).get(0).props.style.marginLeft).toBe(false)
    expect(wrapper.find(Message).get(1).props.style.marginLeft).toBe(false)
    expect(wrapper.find(Message).get(2).props.style.marginLeft).toBe('auto')
  })

  it('renders one typing user correctly', () => {
    const wrapper = shallow(<Chat id='1' type='comments' messages={messages} />)
    wrapper.setProps({usersTyping:
      [{name: 'John', id: '1', status: true}]
    })

    expect(wrapper.find('.talixo-chat__user-typing-container').text()).toMatch(/is typing/)
  })

  it('renders two typing users correctly', () => {
    const wrapper = shallow(<Chat id='1' type='comments' messages={messages} />)
    wrapper.setProps({usersTyping:
      [{name: 'John', id: '1', status: true},
        {name: 'Kenny', id: '2', status: true}]
    })

    expect(wrapper.find('.talixo-chat__user-typing-container').text()).toMatch(/are typing/)
  })

  it('renders more then two typing users correctly', () => {
    const wrapper = shallow(<Chat id='1' type='comments' messages={messages} />)
    wrapper.setProps({usersTyping:
      [{name: 'John', id: '1', status: true},
        {name: 'Kenny', id: '2', status: true},
        {name: 'Benny', id: '3', status: true}]
    })

    expect(wrapper.find('.talixo-chat__user-typing-container').text()).toMatch(/John, Kenny and Benny/)
  })
})
