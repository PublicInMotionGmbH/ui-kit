import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'
import { displayObject } from './utils'

const propTypes = {
  /** Function used to render data details. */
  detailsRender: PropTypes.func,

  /** Object which contains data to be displayed. */
  item: PropTypes.object
}

const defaultProps = {
  detailsRender: item => displayObject(item)
}

/**
 * Component which renders details about given data item
 * using provided detailsRender function.
 *
 * @param props
 * @param {function} [props.datailsRender]
 * @param {object} [props.item]
 *
 * @returns {React.Element}
 */
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
