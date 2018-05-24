import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'
import { Table, Body } from '@talixo/table'

import TableHeaders from './TableHeaders'
import TableRow from './TableRow'

export const moduleName = 'data-table'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Information about columns which will be displayed in table. */
  columns: PropTypes.arrayOf(PropTypes.shape({

    /** Id of given column. */
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,

    /** Name of the column. This will be displayed inside table header. */
    name: PropTypes.string.isRequired,

    /** Render function of items to be displayed in table cells of give column. */
    render: PropTypes.func,

    /** Render function of given header. */
    renderHeader: PropTypes.func
  })).isRequired,

  /** Data to be populated inside table. Require the same keys as inc olumns objects. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** onSort function callback. */
  onSort: PropTypes.func,

  /** Indicates if table is sortable. */
  sortable: PropTypes.bool,

  /** Actions which can be applied to rows. */
  tableActions: PropTypes.arrayOf(PropTypes.shape({

    /** Function which indicates if button should be displayed.
     * Assigns item from data as function argument. */
    condition: PropTypes.func,

    /** Button icon name from `@talixo/icon` package. */
    icon: PropTypes.string.isRequired,

    /** Button label. */
    label: PropTypes.string.isRequired,

    /** onClick callback function. */
    onClick: PropTypes.func
  })),

  /** Indicates if tableActions should be displayed vertically or horizontally. */
  verticalActionCell: PropTypes.bool
}

const defaultProps = {
  sortable: false
}

/**
 * Component which represents DataTable.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {object[]} props.columns
 * @property {string|number} props.columns.id
 * @property {string} props.columns.name
 * @property {function} [props.columns.render]
 * @property {function} [props.columns.renderHeader]
 * @property {object} props.data
 * @property {function} [props.onSort]
 * @property {boolean} [props.sortable]
 * @property {object[]} [props.tableActions]
 * @property {function} [props.tableActions.condition]
 * @property {string} props.tableActions.icon
 * @property {string} props.tableActions.label
 * @property {function} [props.tableActions.onClick]
 * @property {boolean} [props.verticalActionCell]
 *
 * @property {object} state
 * @property {object} state.sortedData
 * @property {object} state.sortColumn - the column that is used in sortin process
 * @property {object} state.reversedOrder - indicates if sorting should be descending
 *
 * @class
 */
class DataTable extends React.Component {
  state = {
    sotrtedData: this.props.data,
    sortColumn: '',
    reversedOrder: false
  }

  /**
   * This function sorts data according to given column
   *
   * @param {sting|number} columnID - id of the column used in sorting.
   */
  sort = (columnID) => {
    const { onSort } = this.props
    const { sortColumn, sotrtedData, reversedOrder } = this.state

    // Check if column has already been used to sort.
    const _reversedOrder = sortColumn === columnID ? !reversedOrder : false
    // Set direction of sorting.
    const direction = !_reversedOrder ? 'asc' : 'desc'
    // Oreder data using lodash sort funciton.
    const newData = _.orderBy(sotrtedData, columnID, direction)

    this.setState({
      sotrtedData: newData,
      sortColumn: columnID,
      reversedOrder: _reversedOrder
    })

    if (onSort) {
      onSort(columnID)
    }
  }

  /**
   * Build table headers.
   *
   * @returns {ReactElement}
   */
  buildHeaders = () => {
    const { columns, sortable } = this.props
    const { sortColumn, reversedOrder } = this.state
    const { sort } = this
    // Pass sorting order to allow propper sorting arrow hightlight.
    const sortOrder = !reversedOrder ? 'asc' : 'desc'

    const headersProps = {
      columns: columns,
      onClick: (sortable && sort) || undefined,
      sortable: sortable,
      sortColumn: sortColumn,
      sortOrder: sortOrder
    }
    return (
      <TableHeaders {...headersProps} />
    )
  }

  render (props) {
    const {
      tableActions, columns, className, data, onSort,
      sortable, verticalActionCell, ...passedProps
    } = this.props
    const { sotrtedData } = this.state
    const { buildHeaders } = this

    const wrapperCls = buildClassName(moduleName, className)

    return (
      <Table className={wrapperCls} {...passedProps}>
        { buildHeaders() }
        <Body>
          <TableRow
            tableActions={tableActions}
            columns={columns}
            rowData={sotrtedData}
            verticalActionCell={verticalActionCell}
          />
        </Body>
      </Table>
    )
  }
}
DataTable.propTypes = propTypes

DataTable.defaultProps = defaultProps

export default DataTable
