import React from 'react'
import { shallow } from 'enzyme'

import ItemList from '../src/ItemList'
import { data } from './fixtures/mocks'

const createProps = (props = {}) => ({
  items: data,
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<ItemList {...props} />)

describe('<ItemList>', () => {
  const props = createProps({ openItem: data[0] })
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(props)
  })

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render all children', () => {
    const dataLength = data.length
    expect(wrapper.children()).toHaveLength(dataLength)
  })

  it('should pass active=true prop to opened children', () => {
    const items = wrapper.find('Item')
    items.forEach((node, index) => {
      if (node.props().item === props.openItem) {
        expect(node.props().active).toBe(true)
      } else {
        expect(node.props().active).toBe(false)
      }
    })
  })
})
