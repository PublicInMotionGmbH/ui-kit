import React from 'react'
import Notification from '../src/Notification'
import { shallow, mount } from 'enzyme'
import { prefix } from '@talixo/shared'

const moduleName = prefix('notification')

describe('<Notification />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Notification>Notification</Notification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders .big correctly', () => {
    const wrapper = shallow(<Notification className='big'>Notification</Notification>)

    const className = wrapper.props().className
    expect(className).toContain('big')
  })

  it('renders type correctly', () => {
    const wrapper = shallow(
      <Notification type='error'>
        Notification
      </Notification>
    )

    const className = wrapper.props().className
    expect(className).toContain(`${moduleName}--error`)
  })

  it('calls onClose when clicked', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Notification onClose={onClick}>Notification</Notification>)

    wrapper.find(`span.${moduleName}__close`).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
