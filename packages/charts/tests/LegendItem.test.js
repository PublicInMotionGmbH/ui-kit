import React from 'react'
import { shallow } from 'enzyme'

import LegendItem, { moduleName } from '../src/LegendItem'
import { buildClassName } from '@talixo/shared'

const fakeProps = {
  className: 'test',
  color: 'white',
  id: '0',
  onClick: () => {},
  title: 'Title',
  value: 10
}

const createProps = (props = {}) => ({
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<LegendItem {...props} />)

describe('<LegendItem> component ', () => {
  let wrapper
  describe('rendering', () => {
    it('should render properly', () => {
      wrapper = createWrapper(fakeProps)
      expect(wrapper).toMatchSnapshot()
    })
    it('should not add color to styles when it is not passed', () => {
      wrapper = createWrapper({ ...fakeProps, color: null })
      const divCls = buildClassName(`${moduleName}__colorbox`)
      expect(wrapper.find(`.${divCls}`).props().style).toEqual({})
    })
  })
})
