import React from 'react'
import CardContent from '../src/CardContent'
import { shallow } from 'enzyme'

describe('<CardContent />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <CardContent>
        <div>Content</div>
      </CardContent>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders .blue correctly', () => {
    const wrapper = shallow(
      <CardContent className='blue'>
        <div>Content</div>
      </CardContent>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
