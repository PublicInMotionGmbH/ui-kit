import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Split View.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function SplitView (props) {
  const { className, ...passedProps } = props

  return (
    <span className={buildClassName('split-view', className)} {...passedProps} />
  )
}

SplitView.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

SplitView.defaultProps = {
}

export default SplitView
