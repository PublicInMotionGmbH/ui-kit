import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Icon } from '@talixo/icon'

import { buildClassName } from '@talixo/shared'
import { Head, HeadCell } from '@talixo/table'

import { moduleName } from './DataTable'

const propTypes = {
  /** Information about columns which will be displayed in table. */
  columns: PropTypes.arrayOf(PropTypes.shape({

    /** Id of given column. */
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,

    /** Name of the column. This will be displayed inside table header. */
    name: PropTypes.string.isRequired,

    /** Render function of given header. */
    renderHeader: PropTypes.func
  })).isRequired,

  /** onClick callback function. */
  onClick: PropTypes.func,

  /** Indicates if table is sortable. */
  sortable: PropTypes.bool,

  /** Idicates which column is used to sort data inside table. */
  sortColumn: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Order of sorting. */
  sortOrder: PropTypes.oneOf(['asc', 'desc'])
}

/**
 * Generate arrows which will indicate sorting order.
 *
 * @param {boolean} inUse
 * @param {string} sortOrder
 * @returns {ReactElement}
 */
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

/**
 * Component which represents DataTable Headers.
 *
 * @param {object} [props]
 * @param {object[]} [props.columns]
 * @param {number|string} [props.columns.id]
 * @param {string} [props.columns.name]
 * @param {function} [props.columns.renderHeader]
 * @param {function} [props.onClick]
 * @param {boolean} [props.sortable]
 * @param {string|number} [props.sortColumn]
 * @param {string} [props.sortOrder]
 *
 * @returns {ReactElement}
 */
function TableHeaders (props) {
  const { columns, onClick, sortable, sortColumn, sortOrder } = props
  const headerCls = buildClassName([moduleName, 'header'], null, { clickable: !!onClick })

  // Filter columns to ensure actions will be displayed as last column.
  const actions = _.find(columns, item => item.id === 'actions')
  const cols = columns.filter(i => i.id !== 'actions')

  // Create onClick function.
  const click = (id, e) => {
    if (onClick) onClick(id, e)
  }

  return (
    <Head>
      {
        cols.map((col, i) => (
          <HeadCell className={headerCls} key={col.id} onClick={e => click(col.id, e)}>
            { col.renderHeader && typeof col.renderHeader === 'function' ? col.renderHeader(col.name) : col.name }
            { sortable && sortControls(sortColumn === col.id, sortOrder) }
          </HeadCell>
        ))
      }
      {
        actions && actions.name &&
          <HeadCell>
            {
              actions.renderHeader && typeof actions.renderHeader === 'function'
                ? actions.renderHeader(actions.name)
                : actions.name
            }
          </HeadCell>
      }
    </Head>
  )
}

TableHeaders.propTypes = propTypes

export default TableHeaders
