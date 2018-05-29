import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'
import { displayObject } from './utils'

const propTypes = {
  detailsRender: PropTypes.func,
  item: PropTypes.object
}

const defaultProps = {
  detailsRender: item => displayObject(item)
}

const DetailsView = (props) => {
  const { detailsRender, item } = props
  const detailsCls = buildClassName([moduleName, 'details'])

  return (
    <React.Fragment>
      {
        item
          ? <div className={detailsCls}>
            { item && detailsRender(item) }
          </div>
          : null
      }
    </React.Fragment>
  )
}

DetailsView.propTypes = propTypes

DetailsView.defaultProps = defaultProps

export default DetailsView
