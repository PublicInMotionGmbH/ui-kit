import React from 'react'
import PropTypes from 'prop-types'

import { Row, Cell } from '@talixo/table'

const propTypes = {
  rowData: PropTypes.array
}

const defaultProps = {}

const TableRow = ({ rowData }) => (
  <Row>
    {
      rowData.map((item) => (
        <Cell key={item}>{item}</Cell>
      ))
    }
  </Row>
)

TableRow.propTypes = propTypes

TableRow.defaultProps = defaultProps

export default TableRow
