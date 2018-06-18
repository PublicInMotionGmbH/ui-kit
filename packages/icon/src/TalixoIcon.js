import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import icons from '@talixo/icon-pack'

const iconPrefix = icons.classPrefix
const iconsMap = icons.icons

const propTypes = {
  /** Icon name */
  name: PropTypes.string.isRequired,

  /** Additional class name */
  className: PropTypes.string
}

/**
 * Component which represents icon from Talixo set
 *
 * @param {object} props
 * @param {string} [props.name]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function TalixoIcon (props) {
  const { className, name, ...passedProps } = props

  const clsName = buildClassName('icon', [ className, iconPrefix ])

  return (
    <span className={clsName} {...passedProps} aria-hidden='true'>{iconsMap[name]}</span>
  )
}

TalixoIcon.propTypes = propTypes

export default TalixoIcon
