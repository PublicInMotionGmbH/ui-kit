import React from 'react'
import { shallow, mount } from 'enzyme'
import { prefix } from '@talixo/shared'

import ColorInput from '../src/ColorInput'

const name = prefix('color-input')

// Color from palette to test
const testColor = '#ec0000'

// Palette for testing
const palette = [
  {
    id: 'red1',
    name: 'awesome-red',
    color: testColor
  },
  {
    id: 'blue2',
    name: 'fantastic-blue',
    color: '#0004d0'
  },
  {
    id: 'green3',
    name: 'fresh-green',
    color: '#00c41c'
  }
]

// Event for tooltips
function dispatchEvent (element, eventName, mouse) {
  const Event = mouse ? window.MouseEvent : window.Event

  element.dispatchEvent(new Event(eventName))
}

describe('<ColorInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ColorInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handle passed color as value', () => {
    const wrapper = shallow(<ColorInput value='#eeeeee' />)

    expect(wrapper.state('color')).toBe('#eeeeee')
  })

  it('Change color when new color is provided', () => {
    const wrapper = mount(<ColorInput />)

    wrapper.setProps({value: '#eee'})

    expect(wrapper.state('color')).toBe('#eee')

    wrapper.unmount()
  })

  it('handle change color', () => {
    const wrapper = mount(<ColorInput />)

    expect(wrapper.state('color')).toBe(null)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: '#ddd'
      }
    })

    expect(wrapper.state('color')).toBe('#ddd')

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 'rgb(100, 100, 100)'
      }
    })

    expect(wrapper.state('color')).toBe('rgb(100, 100, 100)')

    wrapper.unmount()
  })

  it('handle onChange in color input', () => {
    const wrapper = mount(<ColorInput />)

    expect(wrapper.state('color')).toBe(null)

    expect(wrapper.find('input').at(1).prop('value')).toBe('#ffffff')

    wrapper.find('input').at(1).simulate('change', {
      target: {
        value: '#ddd'
      }
    })

    expect(wrapper.state('color')).toBe('#ddd')

    wrapper.unmount()
  })

  it('handle alpha', () => {
    const wrapper = mount(<ColorInput alpha />)
    dispatchEvent(wrapper.find(`.${name}__alpha-button`).getDOMNode(), 'click', true)
    wrapper.update()
    expect(wrapper.find('input').at(2).prop('value')).toBe(255)
    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: 30
      }
    })
    expect(wrapper.find('input').at(2).prop('value')).toBe(30)
    wrapper.unmount()
  })

  it('handle palette', () => {
    const wrapper = mount(<ColorInput palette={palette} />)

    dispatchEvent(wrapper.find(`.${name}__palette-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find(`.${name}__palette-item`).at(0).simulate('click')

    expect(wrapper.state('color')).toBe(testColor)

    wrapper.unmount()
  })

  it('handle hsl', () => {
    const wrapper = mount(<ColorInput hsl />)

    dispatchEvent(wrapper.find(`.${name}__hsl-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find('.talixo-slider__input').at(0).simulate('change', {
      target: {
        value: 0
      }
    })

    wrapper.find('.talixo-slider__input').at(1).simulate('change', {
      target: {
        value: 100
      }
    })

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 50
      }
    })
    expect(wrapper.state('color')).toBe('hsl(0,100%,50%)')

    wrapper.unmount()
  })

  it('changes hex color to rgb output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='rgb' />)

    wrapper.setState({
      color: '#0a0a0a'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('rgb(10,10,10)')

    wrapper.unmount()
  })

  it('changes short hex color to rgb output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='rgb' />)

    wrapper.setState({
      color: '#0a0'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('rgb(0,170,0)')

    wrapper.unmount()
  })

  it('changes hsl color to rgb output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='rgb' />)

    wrapper.setState({
      color: 'hsl(200,100%,50%)'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('rgb(0,169,255)')

    wrapper.unmount()
  })

  it('changes rgb color to hex output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='hex' />)

    wrapper.setState({
      color: 'rgb(10,10,10)'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('#0a0a0a')

    wrapper.unmount()
  })

  it('changes hsl color to hex output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='hex' />)

    wrapper.setState({
      color: 'hsl(200,100%,50%)'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('#00a9ff')

    wrapper.unmount()
  })

  it('changes hex color to hsl output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='hsl' />)

    wrapper.setState({
      color: '#00a9ff'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('hsl(200,100%,50%)')

    wrapper.unmount()
  })

  it('changes short hex color to hsl output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='hsl' />)

    wrapper.setState({
      color: '#00a'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('hsl(240,100%,33%)')

    wrapper.unmount()
  })

  it('changes rgb color to hsl output color ', () => {
    const wrapper = mount(<ColorInput outputFormat='hsl' />)

    wrapper.setState({
      color: 'rgb(100,100,100)'
    })

    wrapper.find('input').at(0).simulate('focus')
    wrapper.find('input').at(0).simulate('blur')

    expect(wrapper.state('color')).toBe('hsl(0,0%,39%)')

    wrapper.unmount()
  })
})
