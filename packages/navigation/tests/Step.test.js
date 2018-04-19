import React from 'react'
import { shallow } from 'enzyme'

import Step, { moduleName } from '../src/Step'

const includesClassName = (wrapper, className) => {
  const clsName = wrapper.props().className
  expect(clsName.includes(className)).toEqual(true)
}

describe('Module name', () => {
  it('is passed correctly', () => {
    const wrapper = shallow(<Step />)

    includesClassName(wrapper.find('li'), moduleName)
  })
})

describe('<Step />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Step>
        Home
      </Step>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders active correctly', () => {
    const wrapper = shallow(
      <Step active>
        Home
      </Step>
    )

    includesClassName(wrapper.find('li'), 'active')
  })

  it('renders disabled correctly', () => {
    const wrapper = shallow(
      <Step disabled>
        Home
      </Step>
    )

    includesClassName(wrapper.find('li'), 'disabled')
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <Step className='red' onClick={onClick}>
        Home
      </Step>
    )

    wrapper
      .find('.red')
      .simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders tooltip', () => {
    const wrapper = shallow(<Step />)

    expect(wrapper.find('Tooltip').exists()).toEqual(true)
  })

  it('renders children in tooltip', () => {
    const wrapper = shallow(<Step>Home</Step>)

    const tooltip = wrapper.find('Tooltip')
    expect(tooltip.props().render()).toEqual(<span>Home</span>)
  })
})
