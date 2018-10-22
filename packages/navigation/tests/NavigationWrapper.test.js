import React from 'react'
import { shallow } from 'enzyme'

import { buildClassName } from '@talixo/shared'

import NavigationWrapper, { moduleName } from '../src/NavigationWrapper'

function createWrapper (props) {
  return shallow(<NavigationWrapper {...props} />)
}

const subtitleCls = `.${buildClassName([moduleName, 'subtitle'])}`

const includesClassName = (wrapper, className) => {
  const clsName = wrapper.props().className
  expect(clsName.includes(className)).toEqual(true)
}

describe('Module name', () => {
  it('is passed correctly', () => {
    const wrapper = createWrapper()
    includesClassName(wrapper, moduleName)
  })
})

describe('<Navigation />', () => {
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
      navigation: createWrapper({ type: 'navigation' }),
      pagination: createWrapper({ type: 'pagination' }),
      breadcrumbs: createWrapper({ type: 'breadcrumbs' }),
      tabs: createWrapper({ type: 'tabs' }),
      steps: createWrapper({ type: 'steps' })
    }

    Object.keys(wrappers).forEach(key => {
      includesClassName(wrappers[key], key)
    })
  })

  it('should render subtitle when it is  passed', () => {
    const wrapper = createWrapper({ subtitle: 'test-subtitle' })
    console.log(wrapper.find(subtitleCls).props())
    expect(wrapper.find(subtitleCls).exists()).toBe(true)
  })
})
