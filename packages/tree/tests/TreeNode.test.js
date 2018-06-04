import React from 'react'
import { shallow } from 'enzyme'

import TreeNode from '../src/TreeNode'

describe('<TreeNode />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TreeNode
      children={[{
        id: 1,
        name: 'animal'}]}
    />)

    expect(wrapper).toMatchSnapshot()
  })
})
