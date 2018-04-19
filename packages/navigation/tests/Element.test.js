import React from 'react'
import { shallow } from 'enzyme'

import Element, { moduleName } from '../src/Element'

const includesClassName = (wrapper, className) => {
  const clsName = wrapper.props().className
  expect(clsName.includes(className)).toEqual(true)
}

describe('Module name', () => {
  it('is passed correctly', () => {
    const wrapper = shallow(<Element />)

    includesClassName(wrapper.find('li'), moduleName)
  })
})

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

    includesClassName(wrapper.find('li'), 'active')
  })

  it('renders disabled correctly', () => {
    const wrapper = shallow(
      <Element disabled>
        Home
      </Element>
    )

    includesClassName(wrapper.find('li'), 'disabled')
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
