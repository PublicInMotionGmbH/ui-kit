import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import Rating from '../src/Rating'

function createKeyEvent (which) {
  return {
    which: which,
    preventDefault: jest.fn()
  }
}

const innerName = '.' + prefix('rating', 'inner')

describe('<Rating />', () => {
  it('renders basic rating correctly', () => {
    const wrapper = shallow(<Rating />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render basic rating without placeholders', () => {
    const wrapper = shallow(<Rating value={3} size={5} hidePlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })

  it('allows changing number of icons', () => {
    const wrapper = shallow(<Rating size={5} />)

    expect(wrapper.find('Icon').length).toBe(10)

    wrapper.setProps({ size: 10 })

    expect(wrapper.find('Icon').length).toBe(20)
  })

  it('should correctly apply value', () => {
    const wrapper = shallow(<Rating value={0.3} />)
    const inner = wrapper.find(innerName)

    expect(inner.prop('style')).toEqual({
      width: '30%'
    })
  })

  it('should correctly change value', () => {
    const wrapper = shallow(<Rating value={0.3} />)

    wrapper.setProps({ value: 0.8 })

    const inner = wrapper.find(innerName)

    expect(inner.prop('style')).toEqual({
      width: '80%'
    })
  })

  it('should change class name while hovering with event', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Hover 3rd icon (out of default 5)
    wrapper.find('Icon').at(2).simulate('mouseOver')

    expect(wrapper.hasClass(prefix('rating') + '--hover')).toBe(true)
  })

  it('should change visible value while hovering with event', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Hover 3rd icon (out of default 5)
    wrapper.find('Icon').at(2).simulate('mouseOver')

    const inner = wrapper.find(innerName)

    expect(inner.prop('style')).toEqual({
      width: '60%'
    })
  })

  it('should trigger onChange event on click', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Rating value={0.3} onChange={spy} />)

    // Click 4th icon (out of default 5)
    wrapper.find('Icon').at(3).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 0.8 ])
  })

  it('should remove hovering class name when mouse is out', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Hover 3rd icon (out of default 5)
    wrapper.find('Icon').at(2).simulate('mouseOver')

    // Move mouse out
    wrapper.find('Icon').at(2).simulate('mouseOut')

    expect(wrapper.hasClass(prefix('rating') + '--hover')).toBe(false)
  })

  it('should remove hovering class name when mouse is left', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Hover 3rd icon (out of default 5)
    wrapper.find('Icon').at(2).simulate('mouseOver')

    // Move mouse out
    wrapper.find('Icon').at(2).simulate('mouseLeave')

    expect(wrapper.hasClass(prefix('rating') + '--hover')).toBe(false)
  })

  it('should change class name while changing a value through keyboard with event', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Press 'right arrow'
    wrapper.simulate('keyDown', createKeyEvent(39))

    expect(wrapper.hasClass(prefix('rating') + '--hover')).toBe(true)
  })

  it('should change visible value while hovering with event', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Press 'right arrow'
    wrapper.simulate('keyDown', createKeyEvent(39))

    const inner = wrapper.find(innerName)

    expect(inner.prop('style')).toEqual({
      width: '40%'
    })
  })

  it('should not trigger onChange event on Enter key without value', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Rating value={0.3} onChange={spy} />)

    // Press 'enter
    wrapper.simulate('keyDown', createKeyEvent(13))

    expect(spy.mock.calls.length).toBe(0)
  })

  it('should trigger onChange event on Enter key with value', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Rating value={0.3} onChange={spy} />)

    // Press 'right arrow'
    wrapper.simulate('keyDown', createKeyEvent(39))

    // Press 'enter'
    wrapper.simulate('keyDown', createKeyEvent(13))

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 0.4 ])
  })

  it('should remove hovering class name when focus is out', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Press 'right arrow'
    wrapper.simulate('keyDown', createKeyEvent(39))
    wrapper.simulate('blur')

    expect(wrapper.hasClass(prefix('rating') + '--hover')).toBe(false)
  })

  it('should work with left/right arrows', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Press 'right arrow'
    wrapper.simulate('keyDown', createKeyEvent(39))
    wrapper.simulate('keyDown', createKeyEvent(39))
    wrapper.simulate('keyDown', createKeyEvent(39))

    // Press 'left arrow'
    wrapper.simulate('keyDown', createKeyEvent(37))

    const inner = wrapper.find(innerName)

    expect(inner.prop('style')).toEqual({
      width: '60%'
    })
  })

  it('should work with up/down arrows', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Press 'up arrow'
    wrapper.simulate('keyDown', createKeyEvent(38))
    wrapper.simulate('keyDown', createKeyEvent(38))
    wrapper.simulate('keyDown', createKeyEvent(38))

    // Press 'down arrow'
    wrapper.simulate('keyDown', createKeyEvent(40))

    const inner = wrapper.find(innerName)

    expect(inner.prop('style')).toEqual({
      width: '60%'
    })
  })

  it('should ignore events when keyboard is disabled', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} keyboard={false} />)

    // Press 'up arrow'
    wrapper.simulate('keyDown', createKeyEvent(38))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '30%'
    })
  })

  it('should ignore keyboard events when there is no onChange event', () => {
    const wrapper = shallow(<Rating value={0.3} />)

    // Press 'up arrow'
    wrapper.simulate('keyDown', createKeyEvent(38))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '30%'
    })
  })

  it('should ignore mouse events when there is no onChange event', () => {
    const wrapper = shallow(<Rating value={0.3} />)

    // Hover 3rd icon (out of default 5)
    wrapper.find('Icon').at(2).simulate('mouseOver')

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '30%'
    })
  })

  it('should properly work with fractions through up/right arrow key', () => {
    const wrapper = shallow(<Rating value={0.3} onChange={() => {}} />)

    // Press 'up arrow'
    wrapper.simulate('keyDown', createKeyEvent(38))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '40%'
    })

    // Press 'up arrow'
    wrapper.simulate('keyDown', createKeyEvent(38))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '60%'
    })
  })

  it('should properly work with fractions through down/left arrow key', () => {
    const wrapper = shallow(<Rating value={0.5} onChange={() => {}} />)

    // Press 'down arrow'
    wrapper.simulate('keyDown', createKeyEvent(40))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '40%'
    })

    // Press 'down arrow'
    wrapper.simulate('keyDown', createKeyEvent(40))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '20%'
    })
  })

  it('should not allow going to less than one icon by keyboard', () => {
    const wrapper = shallow(<Rating value={0.5} onChange={() => {}} />)

    // Press 'down arrow'
    wrapper.simulate('keyDown', createKeyEvent(40))
    wrapper.simulate('keyDown', createKeyEvent(40))
    wrapper.simulate('keyDown', createKeyEvent(40))
    wrapper.simulate('keyDown', createKeyEvent(40))
    wrapper.simulate('keyDown', createKeyEvent(40))
    wrapper.simulate('keyDown', createKeyEvent(40))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '20%'
    })
  })

  it('should not allow going to more than 100% by keyboard', () => {
    const wrapper = shallow(<Rating value={0.5} onChange={() => {}} />)

    // Press 'down arrow'
    wrapper.simulate('keyDown', createKeyEvent(38))
    wrapper.simulate('keyDown', createKeyEvent(38))
    wrapper.simulate('keyDown', createKeyEvent(38))
    wrapper.simulate('keyDown', createKeyEvent(38))
    wrapper.simulate('keyDown', createKeyEvent(38))
    wrapper.simulate('keyDown', createKeyEvent(38))

    expect(wrapper.find(innerName).prop('style')).toEqual({
      width: '100%'
    })
  })
})
