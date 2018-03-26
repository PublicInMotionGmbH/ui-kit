import React from 'react'
import Notification from '../src/Notification'
import { shallow, mount } from 'enzyme'

describe('<Notification />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Notification>Notification</Notification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders .big correctly', () => {
    const wrapper = shallow(<Notification className='big'>Notification</Notification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders variant correctly', () => {
    const wrapper = shallow(
      <Notification variant='error'>
        Notification
      </Notification>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('calls handleRemove when clicked', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Notification handleRemove={onClick}>Notification</Notification>)

    wrapper.find('span.close').simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
