import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'
import { Table, Body } from '@talixo/table'

import TableHeaders from './TableHeaders'
import TableRow from './TableRow'

export const moduleName = 'data-table'

const propTypes = {
  /** Actions which can be applied to rows */
  actions: PropTypes.arrayOf(PropTypes.shape({

    /** Function which indicates if button should be displayed.
     * Assigns item from data as function argument. */
    condition: PropTypes.func,

    /** Button icon */
    icon: PropTypes.string,

    /** Button label */
    label: PropTypes.string,

    /** onClick callback function. */
    onClick: PropTypes.func
  })),

  /** Additional class name */
  className: PropTypes.string,

  /** Data to be populated inside table. Require the same keys as inc olumns objects. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** Information about columns to be displayed in table. */
  columns: PropTypes.arrayOf(PropTypes.shape({

    /** Id of give column. */
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,

    /** Name of the column. This will be displayed inside table header. */
    name: PropTypes.string.isRequired,

    /** Render function of items to be displayed in table cells of give column. */
    render: PropTypes.func,

    /** Render function of given header. */
    renderHeader: PropTypes.func
  })).isRequired,

  /** IonSort Function callback */
  onSort: PropTypes.func,

  /** Indicates if table is sortable. */
  sortable: PropTypes.bool,

  /** Indicates if actions should be displayed vertically or horizontally. */
  verticalActionCell: PropTypes.bool
}

const defaultProps = {
  sortable: false
}

/**
 * Component which represents DataTable.
 *
 * @property {object} props
 * @property {object[]} [props.actions]
 * @property {function} [props.actions.condition]
 * @property {string} [props.actions.icon]
 * @property {string} [props.actions.label]
 * @property {function} [props.actions.onClick]
 * @property {object} [props.data]
 * @property {object[]} [props.columns]
 * @property {string|number} [props.columns.id]
 * @property {string} [props.columns.name]
 * @property {function} [props.columns.render]
 * @property {function} [props.columns.renderHeader]
 * @property {function} [props.onSort]
 * @property {boolean} [props.sortable]
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
