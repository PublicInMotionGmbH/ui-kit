import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'
import { Table, Body } from '@talixo/table'

import TableHeaders from './TableHeaders'
import TableRow from './TableRow'

import { moduleName } from './config'

/**
 * Checks if data has ID property. If not it generates it according to data item index.
 *
 * @param {object[]} collection
 *
 * @returns {object[]}
 */
export function generateId (element, index) {
  return 'id' in element ? element.id : index
}

export function registerElements (rows, buildId) {
  const newStorage = new Map()

  for (let i = 0; i < rows.length; i++) {
    newStorage.set(rows[i], buildId(rows[i], i))
  }
  return newStorage
}

const propTypes = {
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

  /** Function which will be used to add ID to object items if these are not already inside data items. */
  buildId: PropTypes.func,

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

  /** Render function of items which will be displayed in table collapsible rows. */
  expandRender: PropTypes.func,

  /** Array should contain IDs of expanded rows. Its elements should be `id` properties of data items (if provided) or indexes of elements in data array. */
  expandedRows: PropTypes.array,

  /** Row onClick callback function. */
  onClick: PropTypes.func,

  /** onSort function callback. */
  onSort: PropTypes.func,

  /** Indicates if table is sortable. */
  sortable: PropTypes.bool,

  /** ID of the column according to which data is sorted. */
  sortColumn: PropTypes.string,

  /** Handles arrows which indicates sorting order. */
  reversedOrder: PropTypes.bool,

  /** Indicates if actions should be displayed vertically or horizontally. */
  verticalActionCell: PropTypes.bool
}

const defaultProps = {
  buildId: generateId,
  sortable: false
}

/**
 * Component which represents DataTable.
 *
 * @property {object} props
 * @property {object[]} [props.actions]
 * @property {function} [props.actions.condition]
 * @property {string} props.actions.icon
 * @property {string} props.actions.label
 * @property {function} [props.actions.onClick]
 * @property {string} [props.className]
 * @property {object[]} props.columns
 * @property {string|number} props.columns.id
 * @property {string} props.columns.name
 * @property {function} [props.columns.render]
 * @property {function} [props.columns.renderHeader]
 * @property {object} props.data
 * @property {object} [props.expandRender]
 * @property {array} [props.expandedRows]
 * @property {function} [props.onClick]
 * @property {function} [props.onSort]
 * @property {boolean} [props.sortable]
 * @property {boolean} [props.sortColumn]
 * @property {boolean} [props.reversedOrder]
 * @property {boolean} [props.verticalActionCell]
 *
 * @property {object} state
 * @property {object} state.sortedData
 * @property {object} state.sortColumn - the column that is used in sorting process
 * @property {object} state.reversedOrder - indicates if sorting should be descending
 *
 * @class
 */
class DataTable extends React.Component {
  state = {
    sortedData: this.props.data,
    sortColumn: this.props.sortColumn || '',
    idStorage: registerElements(this.props.data, this.props.buildId),
    reversedOrder: this.props.reversedOrder || false
  }

  /**
   * Checks if data, sort column or sorting order has changed.
   *
   * @param nextProps
   */
  componentWillReceiveProps (nextProps) {
    const { data: newData, sortColumn: newSortCol, reversedOrder: newOrder } = nextProps
    const { data, buildId } = this.props
    const { sortColumn, reversedOrder } = this.state

    if (data !== newData) {
      registerElements(newData, buildId)
      this.setState({ sortedData: newData })
    }
    if (sortColumn !== newSortCol) {
      this.setState({ sortColumn: newSortCol })
    }
    if (reversedOrder !== newOrder) {
      this.setState({ reversedOrder: newOrder })
    }
  }

  /**
   * This function sorts data according to given column
   *
   * @param {sting|number} columnID - id of the column used in sorting.
   */
  sort = (columnID) => {
    const { onSort } = this.props
    const { sortColumn, sortedData, reversedOrder } = this.state

    if (onSort) {
      onSort(columnID)
    }

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
      actions, buildId, columns, className, expandRender, expandedRows, data,
      onClick, onSort, sortable, verticalActionCell, ...passedProps
    } = this.props
    const { sortedData, idStorage } = this.state
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
            expandedRows={expandedRows}
            idStorage={idStorage}
            rowData={sortedData}
            onClick={onClick}
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
