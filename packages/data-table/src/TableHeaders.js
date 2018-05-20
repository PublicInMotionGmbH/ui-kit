import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Head, HeadCell } from '@talixo/table'

import { moduleName } from './DataTable'

// const moduleName = 'table-headers'

const propTypes = {
  headers: PropTypes.object
}

const defaultProps = {}

const TableHeaders = ({ headers, onClick, showColumns }) => {
  const headerCls = buildClassName([moduleName, 'header'], null, { clickable: !!onClick })
  const actionsHeader = showColumns.filter(i => i === 'actions')
  const click = (column, e) => {
    if (onClick) onClick(column, e)
  }

  return (
    <Head>
      {
        showColumns.filter(i => i !== 'actions').map((col, i) => (
          <HeadCell
            className={headerCls}
            key={headers[col]}
            onClick={e => click(col, e)}
          >
            {headers[col]}
          </HeadCell>
        ))
      }
      {
        actionsHeader.length > 0 && headers['actions'] &&
          <HeadCell>
            {headers['actions']}
          </HeadCell>
      }
    </Head>
  )
}

TableHeaders.propTypes = propTypes

TableHeaders.defaultProps = defaultProps

export default TableHeaders
