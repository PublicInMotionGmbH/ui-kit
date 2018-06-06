import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Action, ActionsCell, Cell, Row } from '@talixo/table'

import { moduleName } from './config'

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
  actions: [],
  verticalActionCell: false
}
/**
 * Component which represents a row inside DataTable.
 *
 * @param {object} [props]
 * @param {object} props.columns
 * @param {number|string} props.columns.id
 * @param {function} [props.columns.render]
 * @param {object[]} props.rowData
 * @param {object[]} [props.actions]
 * @param {function} [props.actions.condition]
 * @param {string} props.actions.icon
 * @param {string} props.actions.label
 * @param {function} [props.actions.onClick]
 * @param {boolean} [props.verticalActionCell]
 *
 * @returns {React.Element}
 */
class TableRow extends React.Component {
  state = {
    expanded: []
  }

  onClick = (rowId, e) => {
    const { onClick } = this.props
    const { expanded } = this.state
    const inArray = expanded.indexOf(rowId) > -1

    if (inArray) {
      const newExpanded = expanded.filter(item => item !== rowId)
      this.setState({ expanded: newExpanded })
    } else {
      this.setState((prevState) => ({ expanded: [...prevState.expanded, rowId] }))
    }

    if (onClick) {
      onClick(rowId, e)
    }
  }

  /**
   * This function generates action cell for passed row.
   *
   * @param {object[]} actions
   * @param {object} row
   * @param {boolean} [vertical]
   * @returns {React.Element}
   */
  generateActions = (row) => {
    const { actions, verticalActionCell: vertical } = this.props
    // Generate click function.
    const click = (onClick, e) => {
      if (onClick) onClick(row, e)
    }

    // Check condition provided by the user.
    const displayedActions = actions.filter(action => (
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

  generateCollapse = (row, colspan, index) => {
    const { expandRender } = this.props
    const { expanded } = this.state
    const visible = expanded.indexOf(row.id) > -1
    const collapseCls = buildClassName([moduleName, 'collapse'], null, {
      collapsed: !visible,
      even: index % 2 !== 0
    })
    const collapseCellCls = buildClassName([moduleName, 'collapse', 'cell'])

    return (
      <Row className={collapseCls}>
        <Cell className={collapseCellCls} colSpan={colspan}>
          { expandRender(row) }
        </Cell>
      </Row>
    )
  }

  render () {
    const { actions, columns, expandRender, onClick: click, rowData, verticalActionCell, ...restProps } = this.props
    const { generateActions, generateCollapse, onClick } = this
    const colSpan = columns.length
    const cellCls = buildClassName([moduleName, 'cell'], null, { clickable: !!expandRender })

    // Filter columns to ensure actions will be displayed as last column.
    const cols = columns.filter(({ id }) => id !== 'actions')

    return (
      <React.Fragment>
        {
          rowData.map((row, i) => (
            <React.Fragment key={row.id}>
              <Row className={buildClassName([moduleName, 'row'], null, { even: i % 2 !== 0 })} {...restProps}>
                {
                  cols.map(({ id, render }) => (
                    <Cell className={cellCls} onClick={onClick.bind(this, row.id)} key={id}>
                      { render && typeof render === 'function' ? render(row[id]) : row[id] }
                    </Cell>)
                  )
                }
                { actions.length > 0 && generateActions(row) }
              </Row>
              { expandRender && generateCollapse(row, colSpan, i) }
            </React.Fragment>
          ))
        }
      </React.Fragment>
    )
  }
}

TableRow.propTypes = propTypes

TableRow.defaultProps = defaultProps

export default TableRow
