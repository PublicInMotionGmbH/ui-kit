import { shallow } from 'enzyme'
import React from 'react'

import { buildClassName } from '@talixo/shared'

import Navigation, { moduleName } from '../src/Navigation'
import Element from '../src/Element'

import { withSubelements, withoutSubelements } from './fixtures/elements'

function createWrapper (props) {
  return shallow(<Navigation {...props} />)
}

const dividerCls = `.${buildClassName([moduleName, 'divider'])}`

describe('<Navigation />', () => {
  describe('rendering', () => {
    it('should render properly when children are passed', () => {
      const wrapper = shallow(
        <Navigation>
          <Element label='test-element-0' />
          <Element label='test-element-1' />
          <Element label='test-element-2' />
        </Navigation>
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('should render properly when children are passed with own children', () => {
      const wrapper = shallow(
        <Navigation type='tree'>
          <Element label='Home' />
          <Element label='Issues' />
          <Element label='Minor'>
            <Navigation>
              <Element label='Minor label' />
            </Navigation>
          </Element>
        </Navigation>
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should render properly when elements are passed via props', () => {
      const wrapper = createWrapper({ elements: withSubelements })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('props handling', () => {
    it('should render divider when it is passed and nav type is set to `breadcrumbs`', () => {
      const divider = '/'
      const wrapper = createWrapper({ elements: withSubelements, divider: divider, type: 'breadcrumbs' })

      const expectedDividersNumber = withoutSubelements.length - 1
      const renderedDividersNumber = wrapper.find(dividerCls).length

      expect(renderedDividersNumber).toBe(expectedDividersNumber)
      wrapper.children().forEach((node, index) => {
        if (index % 2 === 1) {
          expect(node.contains(divider)).toBe(true)
        } else {
          expect(node.contains(divider)).toBe(false)
        }
      })
    })
  })
})
