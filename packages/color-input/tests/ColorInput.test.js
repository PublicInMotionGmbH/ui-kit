import React from 'react'
import { shallow, mount } from 'enzyme'
import { prefix } from '@talixo/shared'

import ColorInput from '../src/ColorInput'

const name = prefix('color-input')

// Event for tooltips
function dispatchEvent (element, eventName, mouse) {
  const Event = mouse ? window.MouseEvent : window.Event

  element.dispatchEvent(new Event(eventName))
}

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

describe('<ColorInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ColorInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('Change color when new color is provided', () => {
    const wrapper = mount(<ColorInput />)

    wrapper.setProps({defaultColor: '#eee'})

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

  it('handle change alpha when color not set', () => {
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

  it('handle alpha when color in long hex format', () => {
    const wrapper = mount(<ColorInput alpha defaultColor='#ffffff' />)

    dispatchEvent(wrapper.find(`.${name}__alpha-button`).getDOMNode(), 'click', true)
    wrapper.update()

    expect(wrapper.find('input').at(2).prop('value')).toBe(255)

    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: 50
      }
    })

    expect(wrapper.find('input').at(2).prop('value')).toBe(50)

    wrapper.unmount()
  })

  it('handle alpha when color in short hex format', () => {
    const wrapper = mount(<ColorInput alpha defaultColor='#fff' />)

    dispatchEvent(wrapper.find(`.${name}__alpha-button`).getDOMNode(), 'click', true)
    wrapper.update()

    expect(wrapper.find('input').at(2).prop('value')).toBe(255)

    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: 99
      }
    })

    expect(wrapper.find('input').at(2).prop('value')).toBe(99)

    wrapper.unmount()
  })

  it('handle alpha when color in rgb format', () => {
    const wrapper = mount(<ColorInput alpha defaultColor='rgb(200, 200, 200)' />)

    dispatchEvent(wrapper.find(`.${name}__alpha-button`).getDOMNode(), 'click', true)
    wrapper.update()

    expect(wrapper.find('input').at(2).prop('value')).toBe(255)

    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: 220
      }
    })

    expect(wrapper.find('input').at(2).prop('value')).toBe(220)

    wrapper.unmount()
  })

  it('handle alpha when color in rgba format', () => {
    const wrapper = mount(<ColorInput alpha defaultColor='rgba(200, 200, 200, 0.5)' />)

    dispatchEvent(wrapper.find(`.${name}__alpha-button`).getDOMNode(), 'click', true)
    wrapper.update()

    expect(wrapper.find('input').at(2).prop('value')).toBe(255)

    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: 110
      }
    })

    expect(wrapper.find('input').at(2).prop('value')).toBe(110)

    wrapper.unmount()
  })

  it('handle error when change alpha of incorrect format', () => {
    const wrapper = mount(<ColorInput alpha defaultColor='red' />)

    dispatchEvent(wrapper.find(`.${name}__alpha-button`).getDOMNode(), 'click', true)
    wrapper.update()

    expect(wrapper.find('input').at(2).prop('value')).toBe(255)

    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: 110
      }
    })

    expect(wrapper.state('error')).toBe(true)

    wrapper.unmount()
  })

  it('handle set new color from palette', () => {
    const wrapper = mount(<ColorInput palette={palette} />)

    dispatchEvent(wrapper.find(`.${name}__palette-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find(`.${name}__palette-item`).at(0).simulate('click')

    expect(wrapper.state('color')).toBe(testColor)

    wrapper.unmount()
  })

  it('handle set new color from HSL manipulation tool with no color', () => {
    const wrapper = mount(<ColorInput hsl />)

    expect(wrapper.state('color')).toBe(null)

    dispatchEvent(wrapper.find(`.${name}__hsl-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(wrapper.state('color')).toBe('#ffffff')

    wrapper.unmount()
  })

  it('handle set new color from HSL manipulation tool with hex color', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='#eeeeee' />)

    expect(wrapper.state('color')).toBe('#eeeeee')

    dispatchEvent(wrapper.find(`.${name}__hsl-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(wrapper.state('color')).toBe('#ffffff')

    wrapper.unmount()
  })

  it('handle set new color from HSL manipulation tool with rgb color', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='rgb(100,100,100)' />)

    expect(wrapper.state('color')).toBe('rgb(100,100,100)')

    dispatchEvent(wrapper.find(`.${name}__hsl-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(wrapper.state('color')).toBe('rgb(255,255,255)')

    wrapper.unmount()
  })

  it('handle set new color from HSL manipulation tool with incorrect values', () => {
    const wrapper = mount(<ColorInput hsl />)

    dispatchEvent(wrapper.find(`.${name}__hsl-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.setState({
      h: -2,
      s: -2,
      l: -2
    })

    wrapper.find('.talixo-slider__input').at(0).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(wrapper.state('color')).toBe('#000000')

    wrapper.setState({
      h: 400,
      s: 120,
      l: 999
    })

    wrapper.find('.talixo-slider__input').at(1).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(wrapper.state('color')).toBe('#ffffff')

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 0
      }
    })

    expect(wrapper.state('color')).toBe('#000000')

    wrapper.unmount()
  })

  it('handle change value in HSL manipulation tool with different values', () => {
    const wrapper = mount(<ColorInput hsl />)

    dispatchEvent(wrapper.find(`.${name}__hsl-button`).getDOMNode(), 'click', true)
    wrapper.update()

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

    wrapper.find('.talixo-slider__input').at(0).simulate('change', {
      target: {
        value: 160
      }
    })

    expect(wrapper.state('color')).toBe('#00ffa9')

    wrapper.find('.talixo-slider__input').at(0).simulate('change', {
      target: {
        value: 200
      }
    })

    expect(wrapper.state('color')).toBe('#00a9ff')

    wrapper.find('.talixo-slider__input').at(0).simulate('change', {
      target: {
        value: 270
      }
    })

    expect(wrapper.state('color')).toBe('#7f00ff')

    wrapper.unmount()
  })

  it('handle error when change value in HSL manipulation tool with other format than hex or rgb', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='red' />)

    dispatchEvent(wrapper.find(`.${name}__hsl-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find('.talixo-slider__input').at(1).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(wrapper.state('color')).toBe('red')
    expect(wrapper.state('error')).toBe(true)

    wrapper.unmount()
  })

  it('handle set new hsl values when click on HSL manipulation tool button with rgb format', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='rgb(255,255,255)' />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(100)

    wrapper.unmount()
  })

  it('handle set new hsl values when click on HSL manipulation tool button with long hex format', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='#ffffff' />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(100)

    wrapper.unmount()
  })

  it('handle set new hsl values when click on HSL manipulation tool button with short hex format', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='#fff' />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(52)

    wrapper.unmount()
  })

  it('handle hsl values when click on HSL manipulation tool button with wrong hex format', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='#f' />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(0)

    wrapper.unmount()
  })

  it('handle hsl values when click on HSL manipulation tool button without set color', () => {
    const wrapper = mount(<ColorInput hsl />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(0)

    wrapper.unmount()
  })

  it('handle hsl values when click on HSL manipulation tool button with blue color', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='#0000ff' />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(50)

    wrapper.unmount()
  })

  it('handle hsl values when click on HSL manipulation tool button with red color', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='#ff0000' />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(50)

    wrapper.unmount()
  })

  it('handle hsl values when click on HSL manipulation tool button with wrong color', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='mmm' />)

    expect(wrapper.state('l')).toBe(0)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('l')).toBe(0)

    wrapper.unmount()
  })

  it('handle error with wrong hex format', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='#mmmmmm' />)

    expect(wrapper.state('error')).toBe(false)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('error')).toBe(true)

    wrapper.unmount()
  })

  it('handle error with wrong rgb format', () => {
    const wrapper = mount(<ColorInput hsl defaultColor='rgbwrongformat' />)

    expect(wrapper.state('error')).toBe(false)

    wrapper.find(`.${name}__hsl-button`).simulate('click')

    expect(wrapper.state('error')).toBe(true)

    wrapper.unmount()
  })
})
