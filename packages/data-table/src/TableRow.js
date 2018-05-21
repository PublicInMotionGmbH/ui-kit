import React from 'react'
import PropTypes from 'prop-types'

import { Action, ActionsCell, Cell, Row } from '@talixo/table'

const propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.object),
  rowData: PropTypes.arrayOf(PropTypes.object),
  verticalActionCell: PropTypes.bool
}

const defaultProps = {}

function generateActions (actions, item, vertical = false) {
  const click = (onClick, e) => {
    if (onClick) onClick(item, e)
  }
  const displayedActions = actions.filter(action => (
    !action.condition ? true : action.condition(item)
  ))
  return (
    <ActionsCell vertical={vertical}>
      { displayedActions.map(action => (<Action icon={action.icon} label={action.label} onClick={e => click(action.onClick, e)} />)) }
    </ActionsCell>
  )
}

function TableRow ({ actions, columns, rowData, verticalActionCell }) {
  const cols = columns.filter(({ id }) => id !== 'actions')
  console.log('verticalActionCell', verticalActionCell)

  return (
    <React.Fragment>
      {
        rowData.map((item, i) => (
          <Row>
            { cols.map(({ id, render }) => (<Cell>{ render ? render(item[id]) : item[id] }</Cell>)) }
            { actions.length > 0 && generateActions(actions, item, verticalActionCell) }
          </Row>
        ))
      }
    </React.Fragment>
  )
}

TableRow.propTypes = propTypes

TableRow.defaultProps = defaultProps

export default TableRow
