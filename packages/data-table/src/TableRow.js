import React from 'react'
import PropTypes from 'prop-types'

import { Action, ActionsCell, Cell, Row } from '@talixo/table'

const propTypes = {

  /** Information about columns which will be displayed in table. */
  columns: PropTypes.arrayOf(PropTypes.shape({

    /** Id of given column. */
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,

    /** Render function of items to be displayed in table cells of give column. */
    render: PropTypes.func
  })).isRequired,

  /** Data to be populated inside table. Require the same keys as inc olumns objects. */
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,

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
  tableActions: [],
  verticalActionCell: false
}

/**
 * This function generates action cell for passed row.
 *
 * @param {object[]} tableActions
 * @param {object} row
 * @param {boolean} [vertical]
 * @returns {ReactElement}
 */
function generateActions (tableActions, row, vertical = false) {
  // Generate click function.
  const click = (onClick, e) => {
    if (onClick) onClick(row, e)
  }

  // Check condition provided by the user.
  const displayedActions = tableActions.filter(action => (
    action.condition && typeof action.condition === 'function'
      ? action.condition(row)
      : true
  ))

  return (
    <ActionsCell vertical={vertical}>
      {
        displayedActions.map(action => (
          <Action
            key={action.label}
            icon={action.icon}
            label={action.label}
            onClick={e => click(action.onClick, e)}
          />
        ))
      }
    </ActionsCell>
  )
}

/**
 * Component which represents a row inside DataTable.
 *
 * @param {object} [props]
 * @param {object} props.columns
 * @param {number|string} props.columns.id
 * @param {function} [props.columns.render]
 * @param {object[]} props.rowData
 * @param {object[]} [props.tableActions]
 * @param {function} [props.tableActions.condition]
 * @param {string} props.tableActions.icon
 * @param {string} props.tableActions.label
 * @param {function} [props.tableActions.onClick]
 * @param {boolean} [props.verticalActionCell]
 *
 * @returns {ReactElement}
 */
function TableRow (props) {
  const { columns, rowData, tableActions, verticalActionCell } = props

  // Filter columns to ensure tableActions will be displayed as last column.
  const cols = columns.filter(({ id }) => id !== 'tableActions')

  return (
    <React.Fragment>
      {
        rowData.map((row, i) => (
          <Row key={row.id}>
            {
              cols.map(({ id, render }) => (
                <Cell key={id}>{ render && typeof render === 'function' ? render(row[id]) : row[id] }</Cell>)
              )
            }
            { tableActions.length > 0 && generateActions(tableActions, row, verticalActionCell) }
          </Row>
        ))
      }
    </React.Fragment>
  )
}

TableRow.propTypes = propTypes

TableRow.defaultProps = defaultProps

export default TableRow