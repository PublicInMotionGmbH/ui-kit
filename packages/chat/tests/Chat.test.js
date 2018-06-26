import React from 'react'
import { mount, shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import Chat from '../src/Chat'
import Message from '../src/Message'

const name = prefix('chat')

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
    user: {
      name: 'John',
      id: '2'
    }
  },
  {
    time: 1528104730633,
    message: 'This is reply',
    user: {
      name: 'Tom',
      id: '3'
    }
  },
  {
    time: 1528104730633,
    message: 'This is reply',
    user: {
      name: 'Me',
      id: '1'
    }
  }
]

const user = {
  name: 'user',
  id: '1'
}

describe('<Chat />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Chat user={user} messages={messages} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders classNames correctly', () => {
    const wrapper = shallow(<Chat user={user} messages={messages} />)

    expect(wrapper.find(`.${name}`).length).toBe(1)
    expect(wrapper.find(`.${name}__messages`).length).toBe(1)
    expect(wrapper.find(`.${name}__message--chat`).length).toBe(3)
    expect(wrapper.find(`.${name}__input-container`).length).toBe(1)
    expect(wrapper.find(`.${name}__input-container-inner`).length).toBe(1)
  })

  it('renders renderMessages type chat correctly', () => {
    const wrapper = shallow(<Chat user={user} messages={messages} />)

    expect(wrapper.find(Message).at(0).props().className).toMatch(`${name}__message--chat`)
  })

  it('renders renderMessages type comments correctly', () => {
    const wrapper = shallow(<Chat user={user} type='comments' messages={messages} />)

    expect(wrapper.find(Message).at(0).props().className).toMatch(`${name}__message--comments`)
  })

  it('renders placeholder correctly', () => {
    const placeholder = 'custom placeholder'
    const wrapper = shallow(<Chat user={user} placeholder={placeholder} />)
    const input = wrapper.find('Textarea')

    expect(input.props().placeholder).toEqual(placeholder)
  })

  it('sets messages ref correctly', () => {
    const wrapper = mount(<Chat user={user} messages={messages} />)
    const messagesWrapper = wrapper.find(`.${name}__messages`)
    const refMessagesWrapper = wrapper.instance()._messages

    expect(messagesWrapper.contains(refMessagesWrapper)).toEqual(true)
    wrapper.unmount()
  })

  it('sets form ref correctly', () => {
    const wrapper = mount(<Chat user={user} placeholder='hello' messages={messages} />)
    const refForm = wrapper.instance()._form

    expect(refForm.className).toMatch(`${name}__form`)
    wrapper.unmount()
  })
})

describe('componentDidUpdate', () => {
  it('triggers onTyping when state.typingStatus is updated', () => {
    let spiedUser
    const spy = jest.fn().mockImplementation(n => { spiedUser = n })
    const wrapper = shallow(<Chat messages={messages} onTyping={spy} user={user} />)

    wrapper.setState({ typingStatus: true })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spiedUser.status).toEqual(true)
  })

  it('triggers scrollToBottom when new messages are provided by the user', () => {
    const wrapper = mount(<Chat messages={messages} user={messages[0].user} />)
    const scrollToBottom = jest.spyOn(wrapper.instance(), 'scrollToBottom').mockImplementation(n => n)

    Object.defineProperty(window.Element.prototype, 'scrollHeight', {value: 200, writable: true})
    Object.defineProperty(window.Element.prototype, 'scrollTop', {value: 0, writable: true})
    Object.defineProperty(window.Element.prototype, 'clientHeight', {value: 100, writable: true})

    wrapper.setProps({ messages: messages.concat(messages[0]) })

    expect(scrollToBottom).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('triggers scrollToBottom when new messages are provided and the view is scrolled to the bottom', () => {
    const wrapper = mount(<Chat messages={messages} user={user} />)
    const scrollToBottom = jest.spyOn(wrapper.instance(), 'scrollToBottom').mockImplementation(n => n)

    Object.defineProperty(window.Element.prototype, 'scrollHeight', {value: 200, writable: true})
    Object.defineProperty(window.Element.prototype, 'scrollTop', {value: 200, writable: true})
    Object.defineProperty(window.Element.prototype, 'clientHeight', {value: 100, writable: true})

    wrapper.setProps({ messages: messages.concat(messages[0]) })

    expect(scrollToBottom).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('doesn`t triggers scrollToBottom when new messages are provided and the view is not scrolled to the bottom', () => {
    const wrapper = mount(<Chat messages={messages} user={user} />)
    const scrollToBottom = jest.spyOn(wrapper.instance(), 'scrollToBottom').mockImplementation(n => n)

    Object.defineProperty(window.Element.prototype, 'scrollHeight', {value: 200, writable: true})
    Object.defineProperty(window.Element.prototype, 'scrollTop', {value: 0, writable: true})
    Object.defineProperty(window.Element.prototype, 'clientHeight', {value: 100, writable: true})

    wrapper.setProps({ messages: messages.concat(messages[0]) })

    expect(scrollToBottom).toHaveBeenCalledTimes(0)
    wrapper.unmount()
  })

  it('scrollToBottom triggers scrollTo', () => {
    const wrapper = mount(<Chat messages={messages} user={user} />)
    const element = {
      scrollTo: jest.fn()
    }

    wrapper.instance().scrollToBottom(element)

    expect(element.scrollTo).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})

describe('handleInputChange', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('changes state.typingStatus to true', () => {
    const wrapper = shallow(<Chat messages={messages} user={user} />)
    const input = wrapper.find('Textarea')
    const status = wrapper.state().typingStatus

    input.simulate('change', 'a')

    expect(wrapper.state().typingStatus).toEqual(!status)
  })

  it('changes state.typingStatus to false after 2000ms', () => {
    const wrapper = shallow(<Chat messages={messages} user={user} />)
    const input = wrapper.find('Textarea')
    const status = wrapper.state().typingStatus

    input.simulate('change', 'a')

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000)
    expect(wrapper.state().typingStatus).toEqual(!status)

    jest.runTimersToTime(2000)

    expect(wrapper.state().typingStatus).toEqual(status)
  })

  it('clears timeout if state.typingStatus is true', () => {
    const wrapper = shallow(<Chat messages={messages} user={user} />)
    const input = wrapper.find('Textarea')

    wrapper.setState({ typingStatus: true })
    input.simulate('change', 'a')

    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })
})

describe('handleSubmit', () => {
  let event, form, message, onSubmit, wrapper
  beforeEach(() => {
    onSubmit = jest.fn().mockImplementation(n => { message = n })
    wrapper = shallow(<Chat messages={messages} onSubmit={onSubmit} user={user} />)
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
    wrapper.setProps({ user })
    wrapper.setState({ inputValue: 'a' })
    form.simulate('submit', event)

    const expectedMessage = {
      time: 1483228800000,
      message: 'a',
      user: user
    }

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(message).toEqual(expectedMessage)
    unmock()
  })

  it('sets state.inputValue to empty string', () => {
    form.simulate('submit', event)

    expect(wrapper.state().inputValue).toEqual('')
  })
})
