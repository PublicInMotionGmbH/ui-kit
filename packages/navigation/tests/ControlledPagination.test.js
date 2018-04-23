import React from 'react'
import ControlledPagination from '../src/ControlledPagination'
import { mount } from 'enzyme'

describe('<ControlledPagination />', () => {
  it('renders pageCount correctly', () => {
    const wrapper = mount(<ControlledPagination pageCount={10} />)

    expect(wrapper.children().length).toEqual(12)
    wrapper.unmount()
  })

  it('renders active page correctly', () => {
    const wrapper = mount(<ControlledPagination pageCount={8} activePage={1} />)

    const pageTwo = wrapper.children().get(1)
    expect(pageTwo.props.active).toEqual(true)
    wrapper.unmount()
  })

  it('renders correctly when limit is passed', () => {
    const wrapper = mount(<ControlledPagination pageCount={20} displayedLimit={6} />)

    expect(wrapper.find('li').length).toEqual(10)
    wrapper.unmount()
  })

  it('renders first page button when current page is higher than limit', () => {
    const wrapper = mount(<ControlledPagination activePage={8} pageCount={20} displayedLimit={6} />)

    expect(wrapper.findWhere(n => n.key() === 'first').exists()).toEqual(true)
    wrapper.unmount()
  })

  it('renders last page button when current page is lower than limit', () => {
    const wrapper = mount(<ControlledPagination activePage={6} pageCount={20} displayedLimit={6} />)

    expect(wrapper.findWhere(n => n.key() === 'last').exists()).toEqual(true)
    wrapper.unmount()
  })

  it('renders previousLabel correctly', () => {
    const wrapper = mount(<ControlledPagination pageCount={5} previousLabel='Previous page' />)

    expect(wrapper.find('li').first().props('children').children).toEqual('Previous page')
    wrapper.unmount()
  })

  it('renders nextLabel correctly', () => {
    const wrapper = mount(<ControlledPagination pageCount={5} nextLabel='Next page' />)

    expect(wrapper.find('li').last().props('children').children).toEqual('Next page')
    wrapper.unmount()
  })

  it('calls onClick when Element is clicked', () => {
    const onClick = jest.fn()
    const wrapper = mount(<ControlledPagination pageCount={5} onClick={onClick} />)

    const pageButton = wrapper.find('Element').at(1)
    pageButton.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
