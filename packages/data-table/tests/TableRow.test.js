import React from 'react'
import { shallow } from 'enzyme'
import { buildClassName } from '@talixo/shared'

import TableRow from '../src/TableRow'
import { moduleName } from '../src/config'
import { generateId, registerElements } from '../src/DataTable'

import { tableData, tableData2, actions, columns } from './fixtures/testData'

// Mock expand render
function expandRender (item) {
  return (
    <div>{item.id} {item.opened} {item.assignee} </div>
  )
}

// Helper classes
const collapseCls = buildClassName([moduleName, 'collapse'])
const rowCls = buildClassName([moduleName, 'row'])

const createProps = props => ({
  rowData: tableData,
  columns: columns,
  idStorage: registerElements(tableData, generateId),
  ...props
})
const defaultProps = createProps()
const createWrapper = (props = defaultProps) => shallow(<TableRow {...props} />)

describe('<TableRow />', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper()
    })

    it('renders children correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render wrapper provided by render prop', () => {
      expect(wrapper.find('.test-span').exists()).toBe(true)
    })

    it('should render data inside provided wrapper', () => {
      expect(wrapper.find('.test-span').exists()).toBe(true)
      wrapper.find('.test-span').forEach((node, index) => {
        expect(node.text()).toContain(tableData[index].assignee)
      })
    })
  })

  describe('actions handling', () => {
    const props = createProps({ actions })
    let wrapper, actionButtons

    beforeEach(() => {
      wrapper = createWrapper(props)
      actionButtons = wrapper.find('Action')
    })

    it('should render actions button which fulfill conditions', () => {
      const expectedLength = actions.length * tableData.length - 1
      expect(actionButtons).toHaveLength(expectedLength)
    })

    it('should invoke onClick when button is Action is clicked', () => {
      props.actions[0].onClick.mockReset()
      actionButtons.first().simulate('click', {})
      expect(props.actions[0].onClick).toHaveBeenCalledTimes(1)
    })

    it('should invoke onClick with proper argument', () => {
      props.actions[0].onClick.mockReset()
      actionButtons.first().simulate('click', {})
      expect(props.actions[0].onClick).toHaveBeenCalledWith(props.rowData[0], expect.anything())
    })
  })

  describe('collapsing behaviour', () => {
    const props = createProps({ expandRender })
    const dataLength = tableData.length
    const clickedElement = dataLength - 1
    let wrapper, row

    beforeEach(() => {
      wrapper = createWrapper(props)
      row = wrapper.find(`.${rowCls}`).at(clickedElement).children().at(0)
    })

    it('should render collapsible items', () => {
      expect(wrapper.find(`.${collapseCls}`).length).toBe(dataLength)
    })

    it('should render all columns as collapsed', () => {
      expect(wrapper.find(`.${collapseCls}--collapsed`).length).toBe(dataLength)
    })

    it('should apply --even modificator to even columns', () => {
      wrapper.find(`.${collapseCls}`).forEach((node, index) => {
        const isEven = node.hasClass(`${collapseCls}--even`)
        if (index % 2 !== 0) {
          expect(isEven).toBe(true)
        } else {
          expect(isEven).toBe(false)
        }
      })
    })

    it('should expand element after clicking on it', () => {
      row.simulate('click', {})
      expect(wrapper.find(`.${collapseCls}--collapsed`).length).toBe(dataLength - 1)
    })

    it('should add element to state.expanded after clicking on it', () => {
      row.simulate('click', {})
      expect(wrapper.state().expanded).toContain(clickedElement)
    })

    it('should collapse element after clicking on it second time', () => {
      row.simulate('click', {})
      expect(wrapper.find(`.${collapseCls}--collapsed`).length).toBe(dataLength - 1)
      row.simulate('click', {})
      expect(wrapper.find(`.${collapseCls}--collapsed`).length).toBe(dataLength)
    })

    it('should remove element from state.expanded after clicking on it second time', () => {
      row.simulate('click', {})
      expect(wrapper.state().expanded).toContain(clickedElement)
      row.simulate('click', {})
      expect(wrapper.state().expanded).toEqual([])
    })
  })

  describe('props handling', () => {
    const props = createProps({
      expandedRows: [1, 2],
      onClick: jest.fn()
    })
    let wrapper

    beforeEach(() => {
      wrapper = createWrapper(props)
    })

    it('should set state.expanded to props.expandedRows', () => {
      expect(wrapper.state().expanded).toBe(props.expandedRows)
    })

    it('should change state.expanded when props.expandedRows is updated', () => {
      const updatedExpanded = [0, 1]
      wrapper.setProps({ expandedRows: updatedExpanded })
      expect(wrapper.state().expanded).toBe(updatedExpanded)
    })

    it('should change state.expanded to empty array when props.rowData is updated', () => {
      const storageUpdate = registerElements(tableData2, generateId)
      wrapper.setProps({ rowData: tableData2, idStorage: storageUpdate, expandedRows: null })
      expect(wrapper.state().expanded).toEqual([])
    })

    it('should handle onCLick function when row is clicked', () => {
      const rowIndex = 0
      const row = wrapper.find(`.${rowCls}`).at(rowIndex).children().at(0)
      row.simulate('click', {})
      expect(props.onClick).toHaveBeenCalledTimes(1)
      expect(props.onClick).toHaveBeenCalledWith(tableData2[rowIndex], expect.anything())
    })
  })

  describe('event handling', () => {

  })
})
