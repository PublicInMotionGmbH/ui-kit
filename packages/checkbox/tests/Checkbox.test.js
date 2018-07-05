import React from 'react'
import Checkbox, {moduleName} from '../src/Checkbox'
import { mount, shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

const name = prefix(moduleName)

describe('<Checkbox />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Checkbox />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with error styling', () => {
    const wrapper = shallow(<Checkbox error />)

    expect(wrapper.hasClass(`${name}--error`)).toBe(true)
  })

  it('should handle events on input', () => {
    const change = jest.fn()

    const wrapper = mount(<Checkbox onChange={change} />)

    const input = wrapper.find('input')

    input.simulate('change')
    expect(change).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('should work controlled from outside', () => {
    const change = jest.fn()

    const wrapper = mount(<Checkbox value={false} onChange={change} />)

    expect(wrapper.find('input').prop('checked')).toBe(false)

    wrapper.setProps({ value: true })
    expect(wrapper.find('input').prop('checked')).toBe(true)

    wrapper.setProps({ value: false })
    expect(wrapper.find('input').prop('checked')).toBe(false)

    wrapper.unmount()
  })
})
