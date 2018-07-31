import React from 'react'
import { shallow, mount } from 'enzyme'

import Hsl from '../src/Hsl'

// Color value to be changed when callback invoked
let colorValue
let errorValue

// Callback fo Alpha
function handleHsl (value, error) {
  colorValue = value
  errorValue = error
}

describe('<Hsl />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Hsl />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handle set new color from HSL manipulation tool with no color', () => {
    const wrapper = mount(<Hsl onHslChange={(value, error) => handleHsl(value, error)} />)

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(wrapper.state('color')).toBe(undefined)
    expect(colorValue).toBe('#ffffff')

    wrapper.unmount()
  })

  it('handle set new color from HSL manipulation tool with hex color', () => {
    const wrapper = mount(
      <Hsl
        color='#eeeeee'
        onHslChange={(value, error) => handleHsl(value, error)}
      />)

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 0
      }
    })

    expect(colorValue).toBe('#000000')

    wrapper.unmount()
  })

  it('handle set new color from HSL manipulation tool with rgb color', () => {
    const wrapper = mount(
      <Hsl
        color='rgb(100,100,100)'
        onHslChange={(value, error) => handleHsl(value, error)}
      />)

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(colorValue).toBe('rgb(255,255,255)')

    wrapper.unmount()
  })

  it('handle set new color from HSL manipulation tool with incorrect values', () => {
    const wrapper = mount(<Hsl onHslChange={(value, error) => handleHsl(value, error)} />)

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

    expect(colorValue).toBe('#000000')

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

    expect(colorValue).toBe('#ffffff')

    wrapper.find('.talixo-slider__input').at(2).simulate('change', {
      target: {
        value: 0
      }
    })

    expect(colorValue).toBe('#000000')

    wrapper.unmount()
  })

  it('handle change value in HSL manipulation tool with different values', () => {
    const wrapper = mount(<Hsl onHslChange={(value, error) => handleHsl(value, error)} />)

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

    expect(colorValue).toBe('#00ffa9')

    wrapper.find('.talixo-slider__input').at(0).simulate('change', {
      target: {
        value: 200
      }
    })

    expect(colorValue).toBe('#00a9ff')

    wrapper.find('.talixo-slider__input').at(0).simulate('change', {
      target: {
        value: 270
      }
    })

    expect(colorValue).toBe('#7f00ff')

    wrapper.unmount()
  })

  it('handle error when change value in HSL manipulation tool with other format than hex or rgb', () => {
    const wrapper = mount(
      <Hsl
        color='red'
        onHslChange={(value, error) => handleHsl(value, error)}
      />)

    wrapper.find('.talixo-slider__input').at(1).simulate('change', {
      target: {
        value: 100
      }
    })

    expect(colorValue).toBe('red')
    expect(errorValue).toBe(true)

    wrapper.unmount()
  })
})
