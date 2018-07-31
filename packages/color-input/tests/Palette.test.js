import React from 'react'
import { shallow } from 'enzyme'
import { prefix } from '@talixo/shared'

import Palette from '../src/Palette'

const name = prefix('color-input__palette')

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

// Color value to be changed when callback invoked
let colorValue

// Callback fo Palette
function handlePalette (value) {
  colorValue = value
}

describe('<Palette />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Palette palette={palette} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handle set new color from palette', () => {
    const wrapper = shallow(<Palette palette={palette} onPaletteChange={(value) => handlePalette(value)} />)

    expect(colorValue).toBe(undefined)

    wrapper.find(`.${name}-item`).at(0).simulate('click')

    expect(colorValue).toBe(testColor)

    wrapper.unmount()
  })
})
