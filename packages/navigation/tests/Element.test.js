import React from 'react'
import { shallow } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import Element, { moduleName } from '../src/Element'

describe('Module name', () => {
  it('is passed correctly', () => {
    const wrapper = shallow(<Element />)
    const clsName = buildClassName([moduleName, 'element'])

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
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
    const clsName = buildClassName([moduleName, 'element'], null, 'active')

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
  })

  it('renders completed correctly', () => {
    const wrapper = shallow(
      <Element completed>
        Home
      </Element>
    )
    const clsName = buildClassName([moduleName, 'element'], null, 'completed')

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
  })

  it('renders disabled correctly', () => {
    const wrapper = shallow(
      <Element disabled>
        Home
      </Element>
    )
    const clsName = buildClassName([moduleName, 'element'], null, 'disabled')

    expect(wrapper.find('li').hasClass(clsName)).toEqual(true)
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
