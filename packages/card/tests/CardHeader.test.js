import React from 'react'
import CardFooter from '../src/CardHeader'
import { shallow } from 'enzyme'

describe('<CardFooter />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <CardFooter>
        <div>Icon</div>
      </CardFooter>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders .small correctly', () => {
    const wrapper = shallow(
      <CardFooter className='small'>
        <div>Icon</div>
      </CardFooter>
    )
    expect(wrapper.props().className).toMatch(/(^| )small( |$)/)
  })

  it('renders title correctly', () => {
    const wrapper = shallow(
      <CardFooter className='small'>
        <div className='card-title'>
          <div>Title</div>
        </div>
      </CardFooter>
    )
    expect(wrapper.find('.card-title').exists()).toBe(true)
  })
})
