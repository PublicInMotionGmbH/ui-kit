import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import icons from '@talixo/icon-pack'

import codepoints from '../meta/codepoints'

const iconPrefix = icons.classPrefix

const propTypes = {
  /** Icon name */
  name: PropTypes.string.isRequired,

  /** Additional class name */
  className: PropTypes.string
}

/**
 * Component which represents icon from Material UI set
 *
 * @param {object} props
 * @param {string} [props.name]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function MaterialIcon (props) {
  const { className, name, ...passedProps } = props

  const clsName = buildClassName('icon', [
    className,
    iconPrefix,
    `${iconPrefix}--material`
  ])

  return (
    <span className={clsName} {...passedProps} aria-hidden='true'>{codepoints[name]}</span>
  )
}

MaterialIcon.propTypes = propTypes

export default MaterialIcon
