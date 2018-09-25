import React from 'react'
import { shallow } from 'enzyme'

import { Icon } from '@talixo/icon'
import { prefix } from '@talixo/shared'

import ColumnsElement from '../src/ColumnsElement'

const moduleName = 'columns-element'
const name = prefix(moduleName)

describe('<ColumnsElement />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <ColumnsElement>
        <h2>1. Amet cillum deserunt.</h2>
      </ColumnsElement>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders icon correctly', () => {
    const wrapper = shallow(
      <ColumnsElement headerIcon={<Icon name='beenhere' />}>
        <h2>1. Amet cillum deserunt.</h2>
      </ColumnsElement>
    )

    expect(wrapper.find(Icon).prop('name')).toBe('beenhere')
  })

  it('counts element width properly', () => {
    const wrapper = shallow(
      <ColumnsElement maxColumns={2}>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
      </ColumnsElement>
    )

    expect(wrapper.prop('style').flexBasis).toBe('50%')
  })

  it('counts element width properly when maxColumns not passed', () => {
    const wrapper = shallow(
      <ColumnsElement>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
      </ColumnsElement>
    )

    expect(wrapper.prop('style').flexBasis).toBe(null)
  })

  it('render icon container when prop headerIcon not passed', () => {
    const wrapper = shallow(
      <ColumnsElement headerIcon={<Icon name='beenhere' />}>
        <h2>1. Amet cillum deserunt.</h2>
      </ColumnsElement>
    )

    expect(wrapper.find(`.${name}__icon`).exists()).toBe(true)
  })

  it('does not render icon container when prop headerIcon not passed', () => {
    const wrapper = shallow(
      <ColumnsElement>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
        <h2>1. Amet cillum deserunt.</h2>
      </ColumnsElement>
    )

    expect(wrapper.find(`.${name}__icon`).exists()).toBe(false)
  })

  it('does not render content container when children not passed', () => {
    const wrapper = shallow(<ColumnsElement />)

    expect(wrapper.find(`.${name}__content`).exists()).toBe(false)
  })
})
