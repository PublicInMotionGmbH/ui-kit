import React from 'react'

import Element from '../src/Element'
import { shallow } from 'enzyme'
import { prefix } from '@talixo/shared'

const moduleName = prefix('navigation')

describe('<Element />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Element>
        Home
      </Element>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders active correctly', () => {
    const wrapper = shallow(
      <Element active>
        Home
      </Element>
    )

    expect(wrapper.hasClass(`${moduleName}__element--active`)).toEqual(true)
  })

  it('renders disabled correctly', () => {
    const wrapper = shallow(
      <Element disabled>
        Home
      </Element>
    )

    expect(wrapper.hasClass(`${moduleName}__element--disabled`)).toEqual(true)
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <Element className='red' onClick={onClick}>
        Home
      </Element>
    )

    wrapper
      .find('.red')
      .simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
