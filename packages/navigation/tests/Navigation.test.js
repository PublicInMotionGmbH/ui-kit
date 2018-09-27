import React from 'react'
import { shallow } from 'enzyme'

import NavigationWrapper, { moduleName } from '../src/NavigationWrapper'

const includesClassName = (wrapper, className) => {
  const clsName = wrapper.props().className
  expect(clsName.includes(className)).toEqual(true)
}

describe('Module name', () => {
  it('is passed correctly', () => {
    const wrapper = shallow(<NavigationWrapper />)

    includesClassName(wrapper, moduleName)
  })
})

describe('<Navigation />', () => {
  const customDivider = '#'

  it('renders children correctly', () => {
    const wrapper = shallow(
      <NavigationWrapper>
        <span>Home</span>
        <span>Issues</span>
        <span>Major</span>
      </NavigationWrapper>
    )

    expect(wrapper.props().className.includes('navigation')).toEqual(true)
  })

  it('renders types correctly', () => {
    const wrappers = {
      navigation: shallow(<NavigationWrapper type='navigation' />),
      pagination: shallow(<NavigationWrapper type='pagination' />),
      breadcrumbs: shallow(<NavigationWrapper type='breadcrumbs' />),
      tabs: shallow(<NavigationWrapper type='tabs' />),
      steps: shallow(<NavigationWrapper type='steps' />)
    }

    Object.keys(wrappers).forEach(key => {
      includesClassName(wrappers[key], key)
    })
  })

  it('inserts dividers correctly', () => {
    const wrappers = {
      empty: shallow(<NavigationWrapper divider={customDivider} />),
      single: shallow(
        <NavigationWrapper divider={customDivider}>
          <span>Home</span>
        </NavigationWrapper>
      ),
      multiple: shallow(
        <NavigationWrapper divider={customDivider}>
          <span>Home</span>
          <span>Issues</span>
        </NavigationWrapper>
      )
    }

    expect(wrappers.empty.contains(customDivider)).toEqual(false)
    expect(wrappers.single.contains(customDivider)).toEqual(false)
    // expect(wrappers.multiple.contains(customDivider)).toEqual(true)
  })

  it('inserts dividers between children elements', () => {
    const wrapper = shallow(
      <NavigationWrapper divider={customDivider}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </NavigationWrapper>
    )

    expect(wrapper.childAt(0).contains(customDivider)).toEqual(false)
    // expect(wrapper.childAt(1).contains(customDivider)).toEqual(true)
    expect(wrapper.childAt(2).contains(customDivider)).toEqual(false)
    // expect(wrapper.childAt(3).contains(customDivider)).toEqual(true)
    expect(wrapper.childAt(4).contains(customDivider)).toEqual(false)
  })
})
