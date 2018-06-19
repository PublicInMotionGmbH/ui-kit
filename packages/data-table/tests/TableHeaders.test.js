import React from 'react'
import { shallow } from 'enzyme'
import { buildClassName } from '@talixo/shared'

import TableHeaders from '../src/TableHeaders'
import { tableData, columns, columnsWithActions } from './fixtures/testData'
import { moduleName } from '../src/config'

// ClassNames helpers
const arrowsCls = buildClassName([moduleName, 'header', 'arrows'])
const arrowUpCls = buildClassName([moduleName, 'header', 'arrow-up'])
const arrowDownCls = buildClassName([moduleName, 'header', 'arrow-down'])
const headerCls = buildClassName([moduleName, 'header'])

// Wrapper creatio heleprs
const createProps = props => ({
  rowData: tableData,
  columns: columns,
  sortOrder: 'asc',
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<TableHeaders {...props} />)

describe('<TableHeaders />', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    it('should render children properly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render provided label inside headers', () => {
      const headers = wrapper.find(`.${headerCls}`)
      headers.forEach((node, index) => {
        expect(node.children().text()).toContain(columns[index].name)
      })
    })

    it('should render modified header if renderHeader is provided', () => {
      const testSpan = wrapper.find('.test-span').first()
      expect(testSpan.exists()).toBe(true)
      expect(testSpan.text()).toContain(columns[4].name)
    })

    it('should not render sorting arrows inside headers', () => {
      expect(wrapper.find(`.${arrowsCls}`).exists()).toBe(false)
    })
  })

  describe('when actions are provided', () => {
    const props = createProps({ columns: columnsWithActions, sortable: true })
    let wrapper, actionHeader

    beforeEach(() => {
      wrapper = createWrapper(props)
      actionHeader = wrapper.find('HeadCell').last()
    })

    it('should render actions columns', () => {
      const actionHeader = wrapper.find('HeadCell').last()
      expect(actionHeader.children().text()).toContain(columnsWithActions[5].name)
    })

    it('should not render arrows inside action column', () => {
      expect(actionHeader.find(`.${arrowsCls}`).exists()).toBe(false)
    })

    it('should add sorting arrows to every column except actions', () => {
      const headers = wrapper.find(`.${headerCls}`)
      headers.forEach((node, index) => {
        expect(node.find(`.${arrowsCls}`)).toHaveLength(1)
      })
    })
  })

  describe('when onClick callback is passed', () => {
    const props = createProps({ sortable: true, onClick: jest.fn() })
    let wrapper, headers

    beforeEach(() => {
      wrapper = createWrapper(props)
      headers = wrapper.find(`.${headerCls}`)
      props.onClick.mockReset()
    })

    it('should invoke props.onChange function', () => {
      headers.first().simulate('click', {})
      expect(props.onClick).toHaveBeenCalledTimes(1)
    })

    it('should invoke props.onChange function with proper 1st argument', () => {
      headers.first().simulate('click', {})
      expect(props.onClick).toHaveBeenCalledWith(columns[0].id, expect.anything())
    })
  })

  describe('arrow changes when props.sortColumn and order changes', () => {
    const props = createProps({ sortable: true, sortColumn: columns[0].id })
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should add selected class to arrow up', () => {
      wrapper.setProps({ sortOrder: 'asc', sortColumn: columns[0].id })

      const headers = wrapper.find(`.${headerCls}`)
      const arrows = headers.first().find(`.${arrowsCls}`)
      const arrowUp = wrapper.find(`.${arrowUpCls}--selected`)

      expect(arrows.find(`.${arrowUpCls}`).props().className).toMatch(/.*selected.*/)
      expect(arrows.find(`.${arrowDownCls}`).props().className).not.toMatch(/.*selected.*/)
      expect(arrowUp).toHaveLength(1)
    })

    it('should add selected class to arrow down', () => {
      wrapper.setProps({ sortOrder: 'desc' })

      const header = wrapper.find(`.${headerCls}`).first()
      const arrows = header.find(`.${arrowsCls}`)
      const arrowDown = wrapper.find(`.${arrowDownCls}--selected`)

      expect(arrows.find(`.${arrowUpCls}`).props().className).not.toMatch(/.*selected.*/)
      expect(arrows.find(`.${arrowDownCls}`).props().className).toMatch(/.*selected.*/)
      expect(arrowDown).toHaveLength(1)
    })

    it('should change sorting to 2nd column', () => {
      wrapper.setProps({ sortColumn: columns[1].id, sortOrder: 'asc' })

      const header = wrapper.find(`.${headerCls}`).at(1)
      const arrows = header.find(`.${arrowsCls}`)
      const arrowUp = wrapper.find(`.${arrowUpCls}--selected`)

      expect(arrows.find(`.${arrowUpCls}`).props().className).toMatch(/.*selected.*/)
      expect(arrows.find(`.${arrowDownCls}`).props().className).not.toMatch(/.*selected.*/)
      expect(arrowUp).toHaveLength(1)
    })
  })
})
