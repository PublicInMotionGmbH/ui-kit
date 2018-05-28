import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'

const propTypes = {
  detailsRender: PropTypes.func,
  item: PropTypes.object
}

const defaultProps = {
  detailsRender: item => JSON.stringify(item)
}

const DetailsView = (props) => {
  const { detailsRender, item } = props
  const detailsCls = buildClassName([moduleName, 'details'])

  return (
    <div className={detailsCls}>
      { detailsRender(item) }
    </div>
  )
}

DetailsView.propTypes = propTypes

DetailsView.defaultProps = defaultProps

export default DetailsView
