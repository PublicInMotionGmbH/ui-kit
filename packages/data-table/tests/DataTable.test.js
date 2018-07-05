import React from 'react'
import { shallow } from 'enzyme'

import DataTable, { registerElements, generateId } from '../src/DataTable'
import { moduleName } from '../src/config'
import {actions, columns, tableData, tableData2, tableDataNoId, tableDataSort} from './fixtures/testData'
import { buildClassName } from '@talixo/shared'

const headerCls = buildClassName([ moduleName, 'header' ])

// Wrapper creatio heleprs
const createProps = props => ({
  actions: actions,
  data: tableData,
  columns: columns,
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<DataTable {...props} />)

describe('<DataTable />', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    it('renders children correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should apply empty string on sortColumn if not passed from props', () => {
      expect(wrapper.state().sortColumn).toBe('')
    })

    it('should apply false on reversedOrder if not passed from props', () => {
      expect(wrapper.state().reversedOrder).toBe(false)
    })
  })

  describe('generating id map', () => {
    describe('when collection with id is passed', () => {
      const correctMap = registerElements(tableData, generateId)
      const props = createProps({ data: tableData })
      const wrapper = createWrapper(props)

      it('should create map properly', () => {
        expect(wrapper.state().idStorage).toEqual(correctMap)
      })
    })

    describe('when collection without id is passed', () => {
      const correctMap = registerElements(tableDataNoId, generateId)
      const props = createProps({ data: tableDataNoId })
      const wrapper = createWrapper(props)

      it('should create map properly', () => {
        expect(wrapper.state().idStorage).toEqual(correctMap)
      })
    })
  })

  describe('handling props changes', () => {
    const props = createProps({
      sortColumn: columns[1].id,
      reversedOrder: false
    })
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should change state.sortedData when props.data changes', () => {
      wrapper.setProps({ data: tableData2 })
      expect(wrapper.state().sortedData).toBe(tableData2)
    })

    it('should change sort column when props.sortColumn changes', () => {
      const newId = columns[2].id
      wrapper.setProps({ sortColumn: newId })
      expect(wrapper.state().sortColumn).toBe(newId)
    })

    it('should change reversedOrder when props.reversedOrder changes', () => {
      wrapper.setProps({ reversedOrder: true })
      expect(wrapper.state().reversedOrder).toBe(true)
    })
  })

  describe('sorting', () => {
    const props = createProps({ onSort: jest.fn(), sortable: true })
    let wrapper, header0, header4

    beforeEach(() => {
      wrapper = createWrapper(props)
      header0 = wrapper.find('TableHeaders').dive().find(`.${headerCls}`).first()
      header4 = wrapper.find('TableHeaders').dive().find(`.${headerCls}`).at(4)
    })

    it('should invoke props.onSort function', () => {
      header0.simulate('click', {})
      expect(props.onSort).toHaveBeenCalledTimes(1)
    })

    it('should update state.sortColumn', () => {
      const newId = columns[0].id
      header0.simulate('click', {})
      expect(wrapper.state().sortColumn).toBe(newId)
    })

    it('should set reversed order to false', () => {
      header0.simulate('click', {})
      header0.simulate('click', {})
      header0.simulate('click', {})
      expect(wrapper.state().reversedOrder).toBe(false)
    })

    it('should change sortColumn and reversedOrder to true in state', () => {
      const newId = columns[0].id
      wrapper.instance().sort(newId)
      wrapper.instance().sort(newId)
      expect(wrapper.state().reversedOrder).toBe(true)
    })

    it('should order data ascending', () => {
      const newId = columns[4].id
      const orderedData = tableDataSort(newId)
      header4.simulate('click', {})
      expect(wrapper.state().sortedData).toEqual(orderedData)
    })

    it('should order data descending', () => {
      const newId = columns[4].id
      const orderedData = tableDataSort(newId, 'desc')
      header4.simulate('click', {})
      header4.simulate('click', {})
      expect(wrapper.state().sortedData).toEqual(orderedData)
    })
  })
})
