import React from 'react'
import { shallow } from 'enzyme'

import Message from '../src/Message'

import { buildClassName } from '@talixo/shared'

const moduleName = 'chat'

const type = 'chat'
const messageClsName = buildClassName([moduleName, 'message'], null, { [type]: type })

jest.mock('moment', () => {
  const moment = require.requireActual('moment')
  return moment.utc
})

let nowDate = global.Date.now

function mock (date) {
  global.Date.now = jest.fn(() => date)
}

function unmock () {
  global.Date.now = nowDate
}

describe('<Message />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Message className={messageClsName} message='Random message' name='Johny' time={1528104696738} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders classNames correctly', () => {
    const wrapper = shallow(<Message className={messageClsName} />)

    expect(wrapper.find('.talixo-chat__message').length).toBe(1)
    expect(wrapper.find('.talixo-chat__message--chat').length).toBe(1)
    expect(wrapper.find('.talixo-chat__message--chat__info').length).toBe(1)
  })

  it('renders name and message correctly', () => {
    const wrapper = shallow(<Message className={messageClsName} message='Random message' name='Johny' time={1528104696738} />)

    expect(wrapper.find('.talixo-chat__message--chat__message').text()).toBe('Random message')
    expect(wrapper.find('.talixo-chat__message--chat__name').text()).toBe('Johny')
  })

  it('renders time correctly', () => {
    mock(1528106696738)
    const wrapper = shallow(<Message className={messageClsName} message='Random message' name='Johny' time={1528104696738} />)

    expect(wrapper.find('.talixo-chat__message--chat__time').text()).toMatch(/33 minutes ago/)
    unmock()
  })
})
