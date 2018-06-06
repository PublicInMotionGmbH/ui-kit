import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'
import { Table, Body } from '@talixo/table'

import TableHeaders from './TableHeaders'
import TableRow from './TableRow'

import { moduleName } from './config'

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

  /** Data to be populated inside table. Require the same keys as in columns objects. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** onSort function callback. */
  onSort: PropTypes.func,

  /** Indicates if table is sortable. */
  sortable: PropTypes.bool,

  /** Actions which can be applied to rows. */
  actions: PropTypes.arrayOf(PropTypes.shape({

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

  /** Indicates if actions should be displayed vertically or horizontally. */
  verticalActionCell: PropTypes.bool
}

const defaultProps = {
  sortable: false
}

function checkForId (collection) {
  const keys = Object.keys(collection[0])
  const hasId = keys.indexOf('id') > -1
  if (hasId) {
    return collection
  }
  return collection.map((item, index) => ({
    id: index,
    ...item
  }))
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
 * @property {object[]} [props.actions]
 * @property {function} [props.actions.condition]
 * @property {string} props.actions.icon
 * @property {string} props.actions.label
 * @property {function} [props.actions.onClick]
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
    sortedData: checkForId(this.props.data),
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
    const { sortColumn, sortedData, reversedOrder } = this.state

    // Check if column has already been used to sort.
    const _reversedOrder = sortColumn === columnID ? !reversedOrder : false
    // Set direction of sorting.
    const direction = !_reversedOrder ? 'asc' : 'desc'
    // Oreder data using lodash sort function.
    const newData = _.orderBy(sortedData, columnID, direction)

    this.setState({
      sortedData: newData,
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
   * @returns {React.Element}
   */
  buildHeaders = () => {
    const { columns, onSort, sortable } = this.props
    const { sortColumn, reversedOrder } = this.state
    const { sort } = this
    // Pass sorting order to allow propper sorting arrow hightlight.
    const sortOrder = !reversedOrder ? 'asc' : 'desc'

    const headersProps = {
      columns: columns,
      onClick: (sortable && sort) || onSort || undefined,
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
      actions, expandRender, columns, className, data, onSort,
      sortable, verticalActionCell, ...passedProps
    } = this.props
    const { sortedData } = this.state
    const { buildHeaders } = this

    const wrapperCls = buildClassName(moduleName, className)

    return (
      <Table className={wrapperCls} {...passedProps}>
        { buildHeaders() }
        <Body>
          <TableRow
            actions={actions}
            columns={columns}
            expandRender={expandRender}
            rowData={sortedData}
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
