import React from 'react'
import PropTypes from 'prop-types'

import { Head, HeadCell } from '@talixo/table'

const propTypes = {
  headers: PropTypes.array
}

const defaultProps = {}

const TableHeaders = ({ headers }) => {
  return (
    <Head>
      {
        headers.map((header, i) => (
          <HeadCell key={header}>{header}</HeadCell>
        ))
      }
    </Head>
  )
}

TableHeaders.propTypes = propTypes

TableHeaders.defaultProps = defaultProps

export default TableHeaders
