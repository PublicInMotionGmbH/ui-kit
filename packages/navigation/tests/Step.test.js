import React from 'react'
import { shallow } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import Step, { moduleName } from '../src/Step'

describe('Module name', () => {
  it('is passed correctly', () => {
    const wrapper = shallow(<Step />)
    const clsName = buildClassName([moduleName, 'step'])

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
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
    const clsName = buildClassName([moduleName, 'step'], null, 'active')

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
  })

  it('renders completed correctly', () => {
    const wrapper = shallow(
      <Step completed>
        Home
      </Step>
    )
    const clsName = buildClassName([moduleName, 'step'], null, 'completed')

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
  })

  it('renders disabled correctly', () => {
    const wrapper = shallow(
      <Step disabled>
        Home
      </Step>
    )
    const clsName = buildClassName([moduleName, 'step'], null, 'disabled')

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
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
