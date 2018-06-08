import React from 'react'
import { shallow, mount } from 'enzyme'

import Tree from '../src/Tree'
import TreeNode from '../src/TreeNode'

describe('<Tree />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Tree data={[{id: 1,
      name: 'animal',
      children:
      [{id: 5, name: 'mammals', children: [{id: 2, name: 'tiger'}, {id: 3, name: 'cow'}]}]}, {id: 4, name: 'people'}]} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes down prop initiallyOpen correctly', () => {
    const wrapper = mount(<Tree initiallyOpen data={[{id: 1,
      name: 'animal',
      children:
      [{id: 5, name: 'mammals', children: [{id: 2, name: 'tiger'}, {id: 3, name: 'cow'}]}]}, {id: 4, name: 'people'}]} />)

    expect(wrapper.find(TreeNode).at(2).prop('initiallyOpen')).toBe(true)

    wrapper.unmount()
  })
})
