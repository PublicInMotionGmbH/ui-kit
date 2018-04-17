import React from 'react'
import Card from '../src/Card'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'
const moduleName = prefix('card')

describe('<Card />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Card>
        <div>Header</div>
        <div>Container</div>
        <div>Footer</div>
      </Card>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <Card onClick={onClick}>
        <div>Header</div>
        <div>Container</div>
        <div>Footer</div>
      </Card>
    )
    wrapper.find(`div.${moduleName}`).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
