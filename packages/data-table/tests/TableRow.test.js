import React from 'react'
import { shallow } from 'enzyme'

import TableRow from '../src/TableRow'
import { tableData, tableActions, columns } from './fixtures/testData'

const createProps = props => ({
  rowData: tableData,
  columns: columns,
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
    const props = createProps({ tableActions })
    let wrapper, actionButtons

    beforeEach(() => {
      wrapper = createWrapper(props)
      actionButtons = wrapper.find('Action')
    })

    it('should render actions button which fulfill conditions', () => {
      const expectedLength = tableActions.length * tableData.length - 1
      expect(actionButtons).toHaveLength(expectedLength)
    })

    it('should invoke onClick when button is Action is clicked', () => {
      props.tableActions[0].onClick.mockReset()
      actionButtons.first().simulate('click', {})
      expect(props.tableActions[0].onClick).toHaveBeenCalledTimes(1)
    })

    it('should invoke onClick with proper argument', () => {
      props.tableActions[0].onClick.mockReset()
      actionButtons.first().simulate('click', {})
      expect(props.tableActions[0].onClick).toHaveBeenCalledWith(props.rowData[0], expect.anything())
    })
  })
})
