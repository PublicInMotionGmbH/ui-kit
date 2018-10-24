import React from 'react'
import { shallow } from 'enzyme'

import Pagination from '../src/Pagination'

function createWrapper (props) {
  return shallow(<Pagination pageCount={10} {...props} />)
}

describe('<Pagination />', () => {
  describe('rendring', () => {
    it('should render properly', () => {
      const wrapper = createWrapper()
      expect(wrapper).toMatchSnapshot()
    })
    it('should render correctly even when wrong display number is passed', () => {
      const wrapper = createWrapper({ displayedLimit: -3 })
      expect(wrapper).toMatchSnapshot()
    })

    it('should render (1)(2)(3)(4)(5)(6)(7)', () => {
      const wrapper = createWrapper({ pageCount: 7, displayedLimit: 1 })
      const pageElement = wrapper.find('Navigation').dive().find('Element')
      expect(pageElement.length).toBe(7)
      pageElement.forEach((element, index) => {
        expect(element.props().label).toBe(index + 1)
      })
    })

    it('should render (1)(...)(4)(5)(6)(...)(10))', () => {
      const wrapper = createWrapper({ pageCount: 10, displayedLimit: 1, activePage: 5 })
      const pageElement = wrapper.find('Navigation').dive().find('Element')
      expect(pageElement.length).toBe(7)
      expect(pageElement.at(0).props().label).toBe(1)
      expect(pageElement.at(1).props().label).toBe('...')
      expect(pageElement.at(2).props().label).toBe(4)
      expect(pageElement.at(3).props().label).toBe(5)
      expect(pageElement.at(4).props().label).toBe(6)
      expect(pageElement.at(5).props().label).toBe('...')
      expect(pageElement.at(6).props().label).toBe(10)
    })

    it('should render (1)(...)(6)(7)(8)(9)(10) ', () => {
      const wrapper = createWrapper({ pageCount: 10, displayedLimit: 1, activePage: 10 })
      const pageElement = wrapper.find('Navigation').dive().find('Element')
      expect(pageElement.length).toBe(7)
      expect(pageElement.at(0).props().label).toBe(1)
      expect(pageElement.at(1).props().label).toBe('...')
      expect(pageElement.at(2).props().label).toBe(6)
      expect(pageElement.at(3).props().label).toBe(7)
      expect(pageElement.at(4).props().label).toBe(8)
      expect(pageElement.at(5).props().label).toBe(9)
      expect(pageElement.at(6).props().label).toBe(10)
    })
  })

  describe('props handling', () => {
    it('renders previousLabel correctly', () => {
      const previousLabel = 'Previous label'
      const wrapper = createWrapper({ previousLabel })
      expect(wrapper.find('Button').first().dive().text()).toEqual(previousLabel)
    })

    it('renders nextLabel correctly', () => {
      const nextLabel = 'Previous label'
      const wrapper = createWrapper({ nextLabel })
      expect(wrapper.find('Button').last().dive().text()).toEqual(nextLabel)
    })

    it('should not render page buttons', () => {
      const wrapper = createWrapper({ hidePages: true })
      const pages = wrapper.find('Navigation')
      expect(pages.exists()).toBe(false)
    })

    it('should not render next/previous buttons', () => {
      const wrapper = createWrapper({ hideButtons: true })
      const buttons = wrapper.find('Button')
      expect(buttons.exists()).toBe(false)
    })

    it('should disable previous and next button', () => {
      const wrapper = createWrapper({ previousDisabled: true, nextDisabled: true, activePage: 3 })
      const buttons = wrapper.find('Button')
      buttons.forEach(button => {
        expect(button.props().disabled).toBe(true)
      })
    })
  })

  describe('handling page changes', () => {
    it('should handle page change properly', () => {
      const change = jest.fn()
      const wrapper = createWrapper({ onChange: change })
      const buttonPrev = wrapper.find('Button').first()
      const buttonNext = wrapper.find('Button').last()
      expect(wrapper.state().activePage).toBe(1)

      buttonNext.simulate('click')
      expect(wrapper.state().activePage).toBe(2)
      expect(change).toHaveBeenCalledTimes(1)
      expect(change).toHaveBeenCalledWith(2)

      buttonPrev.simulate('click')
      expect(wrapper.state().activePage).toBe(1)
      expect(change).toHaveBeenCalledTimes(2)
      expect(change).toHaveBeenCalledWith(1)

      buttonPrev.simulate('click')
      expect(wrapper.state().activePage).toBe(1)
      expect(change).toHaveBeenCalledTimes(2)
    })
  })

  describe('props handling', () => {
    it('should change activePage when props change', () => {
      const wrapper = createWrapper({ activePage: 5 })
      expect(wrapper.state().activePage).toBe(5)

      wrapper.setProps({ activePage: 6 })
      expect(wrapper.state().activePage).toBe(6)
    })
  })
})
