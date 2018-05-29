import React from 'react'
import { shallow, mount } from 'enzyme'

import NumberInputStepper, {moduleName} from '../src/NumberInputStepper'

import { prefix } from '@talixo/shared'

const name = prefix(moduleName)

describe('<NumberInputStepper />', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renders correctly', () => {
    const wrapper = shallow(<NumberInputStepper />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should increment value', () => {
    const spy = jest.fn()
    const wrapper = shallow(<NumberInputStepper onIncrement={spy} />)

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(0).simulate('mousedown')

    expect(spy.mock.calls.length).toBe(1)
  })

  it('should decrement value', () => {
    const spy = jest.fn()
    const wrapper = shallow(<NumberInputStepper onDecrement={spy} />)

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(1).simulate('mousedown')

    expect(spy.mock.calls.length).toBe(1)
  })

  it('should correctly work when clicking spacebar on increment button', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NumberInputStepper
        onIncrement={spy}
        initialTime={500}
        stepTime={300}
      />
    )

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(0).simulate('keydown', {
      which: 32 // Space bar
    })

    expect(spy.mock.calls.length).toBe(1)

    // It should not try to increment more
    jest.runTimersToTime(10000)
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should correctly work when clicking spacebar on decrement button', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NumberInputStepper
        onDecrement={spy}
        initialTime={500}
        stepTime={300}
      />
    )

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(1).simulate('keydown', {
      which: 32 // Space bar
    })

    expect(spy.mock.calls.length).toBe(1)

    // It should not try to increment more
    jest.runTimersToTime(10000)
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should ignore other keys on buttons', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NumberInputStepper
        onIncrement={spy}
        onDecrement={spy}
        initialTime={500}
        stepTime={300}
      />
    )

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(0).simulate('keydown', { which: 33 })
    wrapper.find(`.${name}__button`).at(1).simulate('keydown', { which: 33 })

    expect(spy.mock.calls.length).toBe(0)

    // It should not try to increment more
    jest.runTimersToTime(10000)
    expect(spy.mock.calls.length).toBe(0)
  })

  it('should correctly work when clicking increment button', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NumberInputStepper
        onIncrement={spy}
        initialTime={500}
        stepTime={300}
      />
    )

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(0).simulate('mousedown')

    expect(spy.mock.calls.length).toBe(1)

    // It shouldn't tick yet
    jest.runTimersToTime(400)
    expect(spy.mock.calls.length).toBe(1)

    // It should call it next time
    jest.runTimersToTime(100)
    expect(spy.mock.calls.length).toBe(2)

    // It should call it next time
    jest.runTimersToTime(300)
    expect(spy.mock.calls.length).toBe(3)

    // It should call it more times
    jest.runTimersToTime(3 * 300)
    expect(spy.mock.calls.length).toBe(6)

    // Event is working on DOM directly
    wrapper.getDOMNode().dispatchEvent(new window.MouseEvent('mouseup'))

    // It should not try to increment more
    jest.runTimersToTime(10000)
    expect(spy.mock.calls.length).toBe(6)
  })

  it('should correctly work when clicking decrement button', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NumberInputStepper
        onDecrement={spy}
        initialTime={500}
        stepTime={300}
      />
    )

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(1).simulate('mousedown')

    expect(spy.mock.calls.length).toBe(1)

    // It shouldn't tick yet
    jest.runTimersToTime(400)
    expect(spy.mock.calls.length).toBe(1)

    // It should call it next time
    jest.runTimersToTime(100)
    expect(spy.mock.calls.length).toBe(2)

    // It should call it next time
    jest.runTimersToTime(300)
    expect(spy.mock.calls.length).toBe(3)

    // It should call it more times
    jest.runTimersToTime(3 * 300)
    expect(spy.mock.calls.length).toBe(6)

    // Event is working on DOM directly
    wrapper.getDOMNode().dispatchEvent(new window.MouseEvent('mouseup'))

    // It should not try to decrement more
    jest.runTimersToTime(10000)
    expect(spy.mock.calls.length).toBe(6)
  })

  it('should not break when it is running, but event has been detached', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <NumberInputStepper
        onDecrement={spy}
        initialTime={500}
        stepTime={300}
      />
    )

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(1).simulate('mousedown')

    jest.runTimersToTime(10000)
    expect(spy.mock.calls.length).toBe(33)

    // Event is working on DOM directly
    wrapper.setProps({ onDecrement: null })

    // It should not break despite fact handler has been removed
    expect(() => jest.runTimersToTime(10000)).not.toThrowError()

    // It should not call it anymore
    expect(spy.mock.calls.length).toBe(33)

    wrapper.unmount()
  })

  it('should not try to change value when it is unmounted', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <NumberInputStepper
        onDecrement={spy}
        initialTime={500}
        stepTime={300}
      />
    )

    expect(spy.mock.calls.length).toBe(0)

    wrapper.find(`.${name}__button`).at(1).simulate('mousedown')

    // Immediately after click it should be decreased
    expect(spy.mock.calls.length).toBe(1)

    // Unmount element
    wrapper.unmount()

    // It shouldn't call it anymore
    jest.runTimersToTime(10000)
    expect(spy.mock.calls.length).toBe(1)
  })
})
