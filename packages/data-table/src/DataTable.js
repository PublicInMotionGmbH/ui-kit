import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'
import { Table, Body } from '@talixo/table'

import TableHeaders from './TableHeaders'
import TableRow from './TableRow'

export const moduleName = 'data-table'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    render: PropTypes.func,
    renderHeader: PropTypes.func
  })).isRequired,

  onSort: PropTypes.func,

  sortable: PropTypes.bool,

  verticalActionCell: PropTypes.bool
}

const defaultProps = {
  sortable: false
}

/**
 * Component which represents DataTable.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class DataTable extends React.Component {
  state = {
    sotrtedData: this.props.data,
    sortColumn: '',
    reversedOrder: false
  }

  sort = (columnID) => {
    const { onSort } = this.props
    const { sortColumn, sotrtedData, reversedOrder } = this.state

    const _reversedOrder = sortColumn === columnID ? !reversedOrder : false
    const direction = !_reversedOrder ? 'asc' : 'desc'
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

  buildHeaders = () => {
    const { columns, sortable } = this.props
    const { sortColumn, reversedOrder } = this.state
    const { sort } = this
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
      actions, columns, className, data, onSort,
      sortable, verticalActionCell, ...passedProps
    } = this.props
    const { sotrtedData } = this.state
    const { buildHeaders } = this

    const wrapperCls = buildClassName(moduleName, className)
    // TODO: Add footer component
    return (
      <Table className={wrapperCls} {...passedProps}>
        { buildHeaders() }
        <Body>
          <TableRow
            actions={actions}
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
