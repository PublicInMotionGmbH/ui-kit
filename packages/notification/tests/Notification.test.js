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

  it('renders variant correctly', () => {
    const wrapper = shallow(
      <Notification variant='error'>
        Notification
      </Notification>
    )

    const className = wrapper.props().className
    expect(className).toContain(`${moduleName}--error`)
  })

  it('calls onRemove when clicked', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Notification onRemove={onClick}>Notification</Notification>)

    wrapper.find(`span.${moduleName}__close`).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
