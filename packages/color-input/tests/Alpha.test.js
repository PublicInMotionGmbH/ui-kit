import React from 'react'
import { shallow, mount } from 'enzyme'

import Alpha from '../src/Alpha'

// Color value to be changed when callback invoked
let colorValue
let errorValue

// Callback fo Alpha
function handleAlpha (value, error) {
  colorValue = value
  errorValue = error
}

describe('<Alpha />', () => {
  beforeEach(() => {
    colorValue = undefined
    errorValue = false
  })
  it('renders children correctly', () => {
    const wrapper = shallow(<Alpha />)

    expect(wrapper).toMatchSnapshot()
  })
  it('handle change alpha when color not set', () => {
    const wrapper = mount(<Alpha onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)
    expect(errorValue).toBe(false)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 30
      }
    })

    expect(colorValue).toBe(undefined)
    expect(errorValue).toBe(true)

    wrapper.unmount()
  })

  it('handle alpha when color in long hex format', () => {
    const wrapper = mount(<Alpha color='#ffffff' onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 50
      }
    })

    expect(colorValue).toBe('#ffffff32')

    wrapper.unmount()
  })

  it('handle alpha when color in short hex format', () => {
    const wrapper = mount(<Alpha color='#fff' onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 50
      }
    })

    expect(colorValue).toBe('#ffffff32')

    wrapper.unmount()
  })

  it('handle error when change alpha of wrong hex color', () => {
    const wrapper = mount(<Alpha color='#mmmmmm' onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('#mmmmmm')
    expect(errorValue).toBe(true)

    wrapper.unmount()
  })

  it('handle alpha when color in rgb format', () => {
    const wrapper = mount(<Alpha color='rgb(100,100,100)' onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('rgba(100,100,100, 0.50)')

    wrapper.unmount()
  })

  it('handle alpha when color in rgba format', () => {
    const wrapper = mount(<Alpha color='rgba(100,100,100, 0.20)' onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('rgba(100,100,100, 0.50)')

    wrapper.unmount()
  })

  it('handle alpha when incorect value in rgb format', () => {
    const wrapper = mount(<Alpha color='rgba(100,100,eee)' onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('rgba(100,100,eee)')
    expect(errorValue).toBe(true)

    wrapper.unmount()
  })

  it('handle error when change alpha of predefined color', () => {
    const wrapper = mount(<Alpha color='red' onAlphaChange={(value, error) => handleAlpha(value, error)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('red')
    expect(errorValue).toBe(true)

    wrapper.unmount()
  })

  it('handle change hex alpha color', () => {
    const wrapper = mount(
      <Alpha
        color='#123456'
        onAlphaChange={(value, error) => handleAlpha(value, error)}
        outputFormat='hex'
      />)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('#1234567f')

    wrapper.unmount()
  })

  it('handle change empty rgb alpha color', () => {
    const wrapper = mount(
      <Alpha
        color='rgb'
        onAlphaChange={(value, error) => handleAlpha(value, error)}
      />)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('rgb')

    wrapper.unmount()
  })

  it('handle change hsl alpha color', () => {
    const wrapper = mount(
      <Alpha
        color='hsl(100,60%,80%)'
        onAlphaChange={(value, error) => handleAlpha(value, error)}
      />)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('hsla(100,60%,80%, 0.50)')

    wrapper.unmount()
  })

  it('handle change empty hsl alpha color', () => {
    const wrapper = mount(
      <Alpha
        color='hsl'
        onAlphaChange={(value, error) => handleAlpha(value, error)}
      />)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('hsl')
    expect(errorValue).toBe(true)

    wrapper.unmount()
  })

  it('handle change wrong hsl alpha color', () => {
    const wrapper = mount(
      <Alpha
        color='hsl(100,www,20%)'
        onAlphaChange={(value, error) => handleAlpha(value, error)}
      />)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('hsl(100,www,20%)')
    expect(errorValue).toBe(true)

    wrapper.unmount()
  })

  it('handle change hsla alpha color', () => {
    const wrapper = mount(
      <Alpha
        color='hsla(100,40%,20%,0.8)'
        onAlphaChange={(value, error) => handleAlpha(value, error)}
      />)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 127
      }
    })

    expect(colorValue).toBe('hsla(100,40%,20%, 0.50)')

    wrapper.unmount()
  })
})
