import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import Accordion from '../src/Accordion'

const moduleName = prefix('accordion')

const options = [
  { id: 1, label: 'First one', content: 'Something is there' },
  { id: 'another', label: 'Another', content: <strong>Also here we've got some content</strong> },
  { id: 'third', label: 'Third', content: 'Here we are' },
  { id: 'multiple', label: 'Multi', content: 'And there is multiple' },
  { id: 'multiple', label: 'Multi 2', content: 'element selected' }
]

describe('<Accordion />', () => {
  it('renders closed accordion correctly', () => {
    const wrapper = shallow(
      <Accordion
        value={null}
        animationSpeed={100}
        options={options}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders opened accordion correctly', () => {
    const wrapper = shallow(
      <Accordion
        value={1}
        animationSpeed={100}
        options={options}
      />
    )

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)
  })

  it('renders not smooth accordion correctly', () => {
    const wrapper = shallow(
      <Accordion
        value={1}
        smooth={false}
        options={options}
      />
    )

    expect(wrapper.hasClass(`${moduleName}--smooth`)).toBe(false)
  })

  it('renders smooth accordion by default', () => {
    const wrapper = shallow(
      <Accordion
        value={1}
        options={options}
      />
    )

    expect(wrapper.find('Collapse').at(0).prop('smooth')).toBe(true)
  })

  it('should handle buildId correctly', () => {
    const wrapper = shallow(
      <Accordion
        value='third'
        smooth={false}
        options={options}
        buildId={option => option.id}
      />
    )

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)
  })

  it('should open multiple options with same ID', () => {
    const wrapper = shallow(
      <Accordion
        value='multiple'
        smooth={false}
        options={options}
        buildId={option => option.id}
      />
    )

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(false)
  })

  it('should change from self-controlled to controlled', () => {
    const wrapper = shallow(
      <Accordion
        smooth={false}
        options={options}
      />
    )

    wrapper.setProps({ value: 3 })

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)
  })

  it('should self-control', () => {
    const wrapper = shallow(
      <Accordion
        smooth={false}
        options={options}
      />
    )

    // Open 3rd element

    wrapper.find(`.${moduleName}-element__toggle`).at(2).simulate('click')

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)

    // Open 4th element

    wrapper.find(`.${moduleName}-element__toggle`).at(3).simulate('click')

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)

    // Close 4th element

    wrapper.find(`.${moduleName}-element__toggle`).at(3).simulate('click')

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)
  })

  it('should trigger onChange', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <Accordion
        smooth={false}
        options={options}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}-element__toggle`).at(2).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ 2 ])
  })

  it('should not self-control when it is controlled from outside', () => {
    const wrapper = shallow(
      <Accordion
        value={1}
        smooth={false}
        options={options}
      />
    )

    wrapper.find(`.${moduleName}-element__toggle`).at(2).simulate('click')

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)
  })

  it('should render icon in questions', () => {
    const wrapper = shallow(
      <Accordion
        value={1}
        smooth={false}
        options={options}
        renderCloseIcon={() => <span id='close-test' />}
        renderOpenIcon={() => <span id='open-test' />}
      />
    )

    expect(wrapper.find('#open-test').length).toBe(4)
    expect(wrapper.find('#close-test').length).toBe(1)
  })

  it('should self-control for multi-accordion', () => {
    const wrapper = shallow(
      <Accordion
        multi
        smooth={false}
        options={options}
      />
    )

    // Open 3rd element

    wrapper.find(`.${moduleName}-element__toggle`).at(2).simulate('click')

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)

    // Open 4th element

    wrapper.find(`.${moduleName}-element__toggle`).at(3).simulate('click')

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)

    // Close 4th element

    wrapper.find(`.${moduleName}-element__toggle`).at(3).simulate('click')

    expect(wrapper.find('Collapse').at(0).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(1).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(2).prop('collapsed')).toBe(false)
    expect(wrapper.find('Collapse').at(3).prop('collapsed')).toBe(true)
    expect(wrapper.find('Collapse').at(4).prop('collapsed')).toBe(true)
  })

  it('should trigger onChange for multi-accordion', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <Accordion
        multi
        smooth={false}
        options={options}
        onChange={spy}
      />
    )

    wrapper.find(`.${moduleName}-element__toggle`).at(2).simulate('click')

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0]).toEqual([ [ 2 ] ])

    wrapper.find(`.${moduleName}-element__toggle`).at(3).simulate('click')

    expect(spy.mock.calls.length).toBe(2)
    expect(spy.mock.calls[1]).toEqual([ [ 2, 3 ] ])

    wrapper.find(`.${moduleName}-element__toggle`).at(3).simulate('click')

    expect(spy.mock.calls.length).toBe(3)
    expect(spy.mock.calls[2]).toEqual([ [ 2 ] ])
  })
})
