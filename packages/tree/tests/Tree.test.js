import React from 'react'
import { shallow } from 'enzyme'

import Tree from '../src/Tree'

describe('<Tree />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Tree data={[{id: 1,
      name: 'animal',
      children:
      [{id: 5, name: 'mammals', children: [{id: 2, name: 'tiger'}, {id: 3, name: 'cow'}]}]}, {id: 4, name: 'people'}]}/>)

    expect(wrapper).toMatchSnapshot()
  })
})
