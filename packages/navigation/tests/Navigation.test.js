import React from 'react'
import { shallow } from 'enzyme'

import Navigation, { moduleName } from '../src/Navigation'

const includesClassName = (wrapper, className) => {
  const clsName = wrapper.props().className
  expect(clsName.includes(className)).toEqual(true)
}

describe('Module name', () => {
  it('is passed correctly', () => {
    const wrapper = shallow(<Navigation />)

    includesClassName(wrapper, moduleName)
  })
})

describe('<Navigation />', () => {
  const customDivider = '#'

  it('renders children correctly', () => {
    const wrapper = shallow(
      <Navigation>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </Navigation>
    )

    expect(wrapper.props().className.includes('navigation')).toEqual(true)
  })

  it('renders types correctly', () => {
    const wrappers = {
      navigation: shallow(<Navigation type='navigation' />),
      pagination: shallow(<Navigation type='pagination' />),
      breadcrumbs: shallow(<Navigation type='breadcrumbs' />),
      tabs: shallow(<Navigation type='tabs' />),
      steps: shallow(<Navigation type='steps' />)
    }

    Object.keys(wrappers).forEach(key => {
      includesClassName(wrappers[key], key)
    })
  })

  it('inserts dividers correctly', () => {
    const wrappers = {
      empty: shallow(<Navigation divider={customDivider} />),
      single: shallow(
        <Navigation divider={customDivider}>
          <span>Home</span>
        </Navigation>
      ),
      multiple: shallow(
        <Navigation divider={customDivider}>
          <span>Home</span>
          <span>Issues</span>
        </Navigation>
      )
    }

    expect(wrappers.empty.contains(customDivider)).toEqual(false)
    expect(wrappers.single.contains(customDivider)).toEqual(false)
    expect(wrappers.multiple.contains(customDivider)).toEqual(true)
  })

  it('inserts dividers between children elements', () => {
    const wrapper = shallow(
      <Navigation divider={customDivider}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Navigation>
    )

    expect(wrapper.childAt(0).contains(customDivider)).toEqual(false)
    expect(wrapper.childAt(1).contains(customDivider)).toEqual(true)
    expect(wrapper.childAt(2).contains(customDivider)).toEqual(false)
    expect(wrapper.childAt(3).contains(customDivider)).toEqual(true)
    expect(wrapper.childAt(4).contains(customDivider)).toEqual(false)
  })
})
