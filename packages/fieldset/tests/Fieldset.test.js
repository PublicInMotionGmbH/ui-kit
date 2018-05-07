import React from 'react'
import { shallow, mount } from 'enzyme'

import Fieldset from '../src/Fieldset'
import { Icon } from '@talixo/icon'

describe('<Fieldset />', () => {
  it('renders children correctly', () => {
    const wrapper = mount(<Fieldset legend='Personal info' asideLegend={<span><Icon name='credit-card' /> Credit Card</span>} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes prop legend correctly', () => {
    const wrapper = shallow(<Fieldset legend='Personal info' />)

    expect(wrapper.find('.talixo-fieldset__legend').text()).toBe('Personal info')
  })

  it('passes prop asideLegend correctly', () => {
    const wrapper = mount(<Fieldset legend='Personal info' asideLegend={<span><Icon name='credit-card' />Credit Card</span>} />)
    expect(wrapper.prop('asideLegend').props.children[0].props.name).toMatch(/credit-card/)
  })

  it('shouldn`t render asideLegend when prop legend is not passed', () => {
    const wrapper = mount(<Fieldset asideLegend={<span><Icon name='credit-card' />Credit Card</span>} />)
    expect(wrapper.html()).not.toMatch(/Credit/)
  })
})
