import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Icon } from '@talixo/icon'

import { buildClassName } from '@talixo/shared'
import { Head, HeadCell } from '@talixo/table'

import { moduleName } from './DataTable'

// const moduleName = 'table-headers'

const propTypes = {
  columns: PropTypes.array,

  onClick: PropTypes.func,

  sortable: PropTypes.bool,

  sortColumn: PropTypes.string,

  sortOrder: PropTypes.string
}

const defaultProps = {}

function sortControls (inUse, sortOrder) {
  const arrowsCls = buildClassName([moduleName, 'header', 'arrows'])
  const arrowUpCls = buildClassName([moduleName, 'header', 'arrow-up'], null, { selected: inUse && sortOrder === 'asc' })
  const arrowDownCls = buildClassName([moduleName, 'header', 'arrow-down'], null, { selected: inUse && sortOrder === 'desc' })

  return (
    <div className={arrowsCls}>
      <Icon className={arrowUpCls} name='arrow_drop_up' />
      <Icon className={arrowDownCls} name='arrow_drop_down' />
    </div>
  )
}

function TableHeaders (props) {
  const { columns, onClick, sortable, sortColumn, sortOrder } = props
  const headerCls = buildClassName([moduleName, 'header'], null, { clickable: !!onClick })
  const actions = _.find(columns, item => item.id === 'actions')
  const cols = columns.filter(i => i.id !== 'actions')

  const click = (id, e) => {
    if (onClick) onClick(id, e)
  }

  return (
    <Head>
      {
        cols.map((col, i) => (
          <HeadCell className={headerCls} key={col.id} onClick={e => click(col.id, e)}>
            { col.renderHeader ? col.renderHeader(col.name) : col.name }
            { sortable && sortControls(sortColumn === col.id, sortOrder) }
          </HeadCell>
        ))
      }
      {
        actions && actions.name &&
          <HeadCell>
            { actions.renderHeader ? actions.renderHeader(actions.name) : actions.name }
          </HeadCell>
      }
    </Head>
  )
}

TableHeaders.propTypes = propTypes

TableHeaders.defaultProps = defaultProps

export default TableHeaders
