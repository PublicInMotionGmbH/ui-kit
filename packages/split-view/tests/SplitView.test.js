import React from 'react'
import { shallow } from 'enzyme'

import SplitView from '../src/SplitView'
import { data, ListHeader } from './fixtures/mocks'

const createProps = (props = {}) => ({
  data,
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<SplitView {...props} />)

describe('<DetailsView>', () => {
  describe('when rendered', () => {
    let wrapper
    beforeEach(() => {
      wrapper = createWrapper()
    })
    it('renders children correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when list item is clicked', () => {
    let wrapper, listItem1, listItemLast, itemList
    const props = createProps({ onChange: jest.fn() })

    beforeEach(() => {
      wrapper = createWrapper(props)
      itemList = wrapper.find('ItemList')
      listItem1 = itemList.dive().find('Item').at(1).dive()
      listItemLast = itemList.dive().find('Item').last().dive()
    })

    it('should change state.openIndex to 1', () => {
      listItem1.simulate('click', {})
      expect(wrapper.state().value).toBe(data[1])
    })

    it('should change state.openIndex to last data index', () => {
      const index = data.length - 1
      listItemLast.simulate('click', {})
      expect(wrapper.state().value).toBe(data[index])
    })

    it('should invoke onChange function from props', () => {
      props.onChange.mockReset()
      listItemLast.simulate('click', {})
      expect(props.onChange).toHaveBeenCalledTimes(1)
    })

    it('should invoke onChange function from props with proper value', () => {
      const index = data.length - 1
      props.onChange.mockReset()
      listItemLast.simulate('click', {})
      expect(props.onChange).toHaveBeenCalledWith(data[index], expect.anything())
    })
  })

  describe('when listHeader is passed', () => {
    const props = createProps({ listHeader: <ListHeader className='test-header' /> })
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should render list header', () => {
      expect(wrapper.find('.test-header').exists()).toBe(true)
    })

    it('should render listHeader text', () => {
      expect(wrapper.find('.test-header').dive().text()).toBe('Test Header')
    })
  })

  describe('when openIndex is controlled by props', () => {
    const openIndex = data.length - 2
    const value = data[openIndex]
    const props = createProps({ value })
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should set open index in state to give value when component is rendered', () => {
      expect(wrapper.state().value).toBe(value)
    })

    it('should update openIndex in state', () => {
      const newItem = data[1]
      wrapper.setProps({ value: newItem })
      expect(wrapper.state().value).toBe(newItem)
    })

    it('should not update openIndex when list item is clicked', () => {
      const listItemLast = wrapper.find('ItemList').dive().find('Item').last().dive()
      listItemLast.simulate('click')
      listItemLast.simulate('click')
      listItemLast.simulate('click')
      expect(wrapper.state().value).toBe(value)
    })
  })
})
