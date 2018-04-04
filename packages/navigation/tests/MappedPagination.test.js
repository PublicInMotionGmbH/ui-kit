import React from 'react'
import MappedPagination from '../src/MappedPagination'
import { mount } from 'enzyme'

describe('<MappedPagination />', () => {
  it('renders pageCount correctly', () => {
    const wrapper = mount(<MappedPagination pageCount={10} />)

    expect(wrapper.children().length).toEqual(12)
    wrapper.unmount()
  })

  it('renders active page correctly', () => {
    const wrapper = mount(<MappedPagination pageCount={8} activePage={1} />)

    const pageTwo = wrapper.children().get(1)
    expect(pageTwo.props.active).toEqual(true)
    wrapper.unmount()
  })

  it('renders correctly when limit is passed', () => {
    const wrapper = mount(<MappedPagination pageCount={20} displayedLimit={6} />)

    expect(wrapper.find('li').length).toEqual(10)
    wrapper.unmount()
  })

  it('renders previousLabel correctly', () => {
    const wrapper = mount(<MappedPagination pageCount={5} previousLabel='Previous page' />)

    expect(wrapper.find('li').first().props('children').children[0]).toEqual('Previous page')
    wrapper.unmount()
  })

  it('renders nextLabel correctly', () => {
    const wrapper = mount(<MappedPagination pageCount={5} nextLabel='Next page' />)

    expect(wrapper.find('li').last().props('children').children[0]).toEqual('Next page')
    wrapper.unmount()
  })
})
