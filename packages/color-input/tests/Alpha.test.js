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

    expect(colorValue).toBe('#fff3')

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
})
