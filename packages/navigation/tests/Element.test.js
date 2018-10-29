import React from 'react'
import { mount } from 'enzyme'

import { buildClassName, prefix } from '@talixo/shared'

import Element, { moduleName } from '../src/Element'
import Navigation from '../src/Navigation'

import { withSubelements } from './fixtures/elements'
import { action } from '@storybook/addon-actions'

const elementProps = withSubelements[0]
const elementWithSubelement = {
  ...withSubelements[0],
  subelement: <Element {...withSubelements[1]} />
}

function createWrapper (props) {
  return mount(<Element {...props} />)
}

// Class name helpers
const buttonCls = `.${buildClassName([ moduleName, 'button' ])}`
const wrapperCls = `.${buildClassName(moduleName)}`

describe('<Element />', () => {
  describe('rendering', () => {
    it('renders correctly when children are passed and render function return null or undefined', () => {
      const wrapper = mount(<Element label='Home' />)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })

    it('should render correctly based on props', () => {
      const wrapper = createWrapper(elementProps)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })

    it('should render children', () => {
      const wrapper = mount(
        <Element label='Minor'>
          <Navigation>
            <Element label='Minor label' />
          </Navigation>
        </Element>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('props handling', () => {
    it('should add proper classes according to passed props props', () => {
      const keys = ['active', 'completed', 'disabled', 'error', 'open']
      const getClsName = name => prefix(moduleName)
      const wrapper = createWrapper({
        ...elementProps,
        active: true,
        completed: true,
        disabled: true,
        error: true,
        open: true
      })

      keys.forEach(key => {
        const cls = getClsName(key)
        expect(wrapper.children().hasClass(`${cls}--${key}`)).toEqual(true)
        wrapper.setProps({ [key]: false })
        expect(wrapper.children().hasClass(`${cls}--${key}`)).toEqual(false)
      })

      wrapper.unmount()
    })

    it('should handle invoke onClick function', () => {
      const wrapper = createWrapper(elementProps)
      const button = wrapper.find(buttonCls)

      elementProps.onClick.mockReset()
      button.simulate('click')
      expect(elementProps.onClick).toHaveBeenCalledWith(elementProps.id, !wrapper.state().open)
      wrapper.unmount()
    })

    it('should pass proper type to navigation child', () => {
      const wrapper = mount(
        <Element type='breadcrumbs' label='label'>
          <Navigation>
            <Element label='Inner label' />
          </Navigation>
        </Element>
      )

      expect(wrapper.find('Navigation').props().type).toBe('breadcrumbs')
    })

    it('should not render elements children', () => {
      const wrapper = mount(
        <Navigation type='pagination'>
          <Element label='Home' onClick={action('click home')} />
          <Element label='Issues' onClick={action('click issues')} />
          <Element label='Minor' onClick={action('click minor')}>
            <Navigation>
              <Element label='Minor label' onClick={action('click home')} />
            </Navigation>
          </Element>
        </Navigation>
      )

      expect(wrapper.find('Element').length).toBe(3)
    })
  })

  describe('clicking navigation elements', () => {
    it('should set wrapper class to open when user clicks on a button ', () => {
      const wrapper = createWrapper(elementWithSubelement)
      const button = wrapper.find(buttonCls).at(0)

      // Open
      button.simulate('click')
      expect(wrapper.state().open).toBe(true)
      expect(wrapper.state().active).toBe(true)

      // Close
      button.simulate('click')
      expect(wrapper.state().open).toBe(false)
      expect(wrapper.state().active).toBe(false)

      wrapper.unmount()
    })

    it('should ignore clicking elements inside open element', () => {
      const wrapper = createWrapper({ ...elementWithSubelement, type: 'navbar' })
      const button = wrapper.find(buttonCls).at(0)
      const insideElement = wrapper.find(wrapperCls).at(1)
      const insideButton = insideElement.find(buttonCls)

      button.simulate('click')
      insideButton.simulate('click')
      expect(wrapper.state().open).toBe(true)
      insideElement.simulate('click')
      expect(wrapper.state().open).toBe(true)
    })

    it('should open children of main element', () => {

    })

    it('should not change state when props.disabled is set to true', () => {
      const wrapper = createWrapper({ ...elementWithSubelement, disabled: true })
      const button = wrapper.find(buttonCls).at(0)

      elementWithSubelement.onClick.mockReset()
      button.simulate('click')

      expect(wrapper.state().open).toBe(false)
      expect(wrapper.state().active).toBe(false)
      expect(elementWithSubelement.onClick).toHaveBeenCalledTimes(0)

      wrapper.unmount()
    })
  })

  describe('events handling', () => {
    it('should close element menu when clicking outside of it', () => {
      const types = ['navbar', 'sidebar']
      const wrapper = createWrapper(elementWithSubelement)
      const button = wrapper.find(buttonCls).at(0)

      for (const type of types) {
        wrapper.setProps({ type: type })

        button.simulate('click')
        expect(wrapper.state().open).toBe(true)

        document.documentElement.dispatchEvent(new window.Event('click'))
        expect(wrapper.state().open).toBe(false)
      }
    })

    it('should not close element menu when clicking outside of it', () => {
      const wrapper = createWrapper({ ...elementWithSubelement, type: 'tree' })
      const button = wrapper.find(buttonCls).at(0)

      button.simulate('click')
      expect(wrapper.state().open).toBe(true)

      document.documentElement.dispatchEvent(new window.Event('click'))
      expect(wrapper.state().open).toBe(true)
    })
  })
})
