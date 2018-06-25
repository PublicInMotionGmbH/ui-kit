import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Title to show inside */
  title: PropTypes.string,

  /** Description to show */
  description: PropTypes.string
}

export const moduleName = 'options-input-tooltip'

/**
 * * Component which represents tooltip content for option.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 *
 * @returns {React.Element}
 */
function OptionTooltipContent (props) {
  const { title, description } = props

  const titleElement = (
    <span className={buildClassName([ moduleName, 'title' ])}>
      {title}
    </span>
  )

  const descriptionElement = description ? (
    <span className={buildClassName([ moduleName, 'description' ])}>
      {description}
    </span>
  ) : null

  return (
    <React.Fragment>
      {titleElement}
      {descriptionElement}
    </React.Fragment>
  )
}

OptionTooltipContent.propTypes = propTypes

export default OptionTooltipContent
