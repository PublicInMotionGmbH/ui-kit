import React from 'react'
import PropTypes from 'prop-types'

import { Action, ActionsCell, Cell, Row } from '@talixo/table'

const propTypes = {
  rowData: PropTypes.array
}

const defaultProps = {}

function generateActions (actions, item) {
  const click = (onClick, e) => {
    if (onClick) onClick(item, e)
  }
  return (
    <ActionsCell>
      {
        actions.map(action => (
          <Action {...action} onClick={e => click(action.onClick, e)} />
        ))
      }
    </ActionsCell>
  )
}

const TableRow = ({ actions, rowData, columns }) => (
  <React.Fragment>
    {
      rowData.map((item, i) => (
        <Row>
          {
            columns.filter(col => col !== 'actions').map(col => (
              <Cell>{item[col]}</Cell>
            ))
          }
          {
            actions.length > 0 && generateActions(actions, item)
          }
        </Row>
      ))
    }
  </React.Fragment>
)

TableRow.propTypes = propTypes

TableRow.defaultProps = defaultProps

export default TableRow
