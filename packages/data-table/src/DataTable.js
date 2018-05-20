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

  headers: PropTypes.object,

  onSort: PropTypes.func,

  sortable: PropTypes.bool
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
    filteredColumns: Object.keys(this.props.headers || this.props.data[0]),
    sotrtedData: this.props.data,
    sortColumn: '',
    reversedOrder: false
  }

  columns = Object.keys(this.props.headers || {})

  sort = (column) => {
    const { onSort } = this.props
    const { sortColumn, sotrtedData, reversedOrder } = this.state

    const _reversedOrder = sortColumn === column ? !reversedOrder : false
    const direction = !_reversedOrder ? 'asc' : 'desc'
    const newData = _.orderBy(sotrtedData, column, [direction])

    this.setState({ sotrtedData: newData, sortColumn: column, reversedOrder: _reversedOrder })

    if (onSort) {
      onSort(column)
    }
  }

  // TODO: enable column exclusion
  buildHeaders = () => {
    if (!this.props.headers) return null

    const { headers, sortable } = this.props
    const { filteredColumns } = this.state
    const { sort } = this

    const headersProps = {
      headers: headers,
      showColumns: filteredColumns,
      onClick: (sortable && sort) || undefined
    }
    return (
      <TableHeaders {...headersProps} />
    )
  }

  render (props) {
    const { actions, className, data, headers, sortable, ...passedProps } = this.props
    const { filteredColumns, sotrtedData } = this.state
    const { buildHeaders } = this

    const wrapperCls = buildClassName(moduleName, className)
    // TODO: Add footer component
    return (
      <Table className={wrapperCls} {...passedProps}>
        { buildHeaders() }
        <Body>
          <TableRow rowData={sotrtedData} columns={filteredColumns} actions={actions} />
        </Body>
      </Table>
    )
  }
}
DataTable.propTypes = propTypes

DataTable.defaultProps = defaultProps

export default DataTable
