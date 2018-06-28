import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { moduleName } from './config'
import { displayObject } from './utils'

const propTypes = {
  /** Function used to render data details. */
  renderDetails: PropTypes.func,

  /** Object which contains data to be displayed. */
  item: PropTypes.object
}

const defaultProps = {
  renderDetails: item => displayObject(item)
}

/**
 * Component which renders details about given data item
 * using provided renderDetails function.
 *
 * @param {object} props
 * @param {function} [props.datailsRender]
 * @param {object} [props.item]
 *
 * @returns {React.Element}
 */
function DetailsView (props) {
  const { renderDetails, value } = props
  const detailsCls = buildClassName([moduleName, 'details'])

  return value != null && (
    <div className={detailsCls}>
      { renderDetails(value) }
    </div>
  )
}

DetailsView.propTypes = propTypes

DetailsView.defaultProps = defaultProps

export default DetailsView
