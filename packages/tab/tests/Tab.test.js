import React from 'react'
import Tab from '../src/Tab'
import { shallow, mount } from 'enzyme'
import { prefix } from '@talixo/commons'

const name = prefix('tab')

describe('<Tab />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Tab>Tab</Tab>)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders .action correctly', () => {
    const wrapper = shallow(<Tab className='action'>Tab</Tab>)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders active correctly', () => {
    const wrapper = shallow(<Tab active>Tab</Tab>)

    expect(wrapper).toMatchSnapshot()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Tab onClick={onClick}>Tab</Tab>)

    wrapper.find(`.${name}`).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
