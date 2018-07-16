import React from 'react'
import { shallow } from 'enzyme'
import { buildClassName } from '@talixo/shared'

import Item from '../src/Item'
import { moduleName } from '../src/config'
import { dataItem, renderItems } from './fixtures/mocks'

const itemCls = buildClassName([moduleName, 'list-item'])

const createProps = (props = {}) => ({
  item: dataItem,
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<Item {...props} />)

describe('<Item>', () => {
  describe('when rendered', () => {
    const activeCls = `${itemCls}--active`
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not have active class when props.active is set to false', () => {
      expect(wrapper.props().className).not.toContain(activeCls)
    })

    it('should not have active class when props.active is set to false', () => {
      wrapper.setProps({ active: true })
      expect(wrapper.props().className).toContain(activeCls)
    })
  })

  describe('when renderItem is passed', () => {
    const props = createProps({ renderItems })
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should render children properly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render children iside provided wrapper', () => {
      expect(wrapper.find('.test-item').exists()).toBe(true)
    })
  })

  describe('click handling, props.active change', () => {
    const props = createProps({ onClick: jest.fn() })
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should invoke onClick passed from props', () => {
      wrapper.simulate('click', {})
      expect(props.onClick).toHaveBeenCalledWith(dataItem, expect.anything())
    })
  })
})
