import React from 'react'
import PropTypes from 'prop-types'

import { Action, ActionsCell, Cell, Row } from '@talixo/table'

const propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  verticalActionCell: PropTypes.bool
}

const defaultProps = {
  actions: [],
  verticalActionCell: false
}

function generateActions (actions, item, vertical = false) {
  const click = (onClick, e) => {
    if (onClick) onClick(item, e)
  }
  const displayedActions = actions.filter(action => (
    !action.condition ? true : action.condition(item)
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

function TableRow ({ actions, columns, rowData, verticalActionCell }) {
  const cols = columns.filter(({ id }) => id !== 'actions')

  return (
    <React.Fragment>
      {
        rowData.map((item, i) => (
          <Row key={item.id}>
            { cols.map(({ id, render }) => (<Cell key={id}>{ render ? render(item[id]) : item[id] }</Cell>)) }
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
