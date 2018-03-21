import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'
import icons from '@talixo/icon-pack'

const cName = prefix('icon')
const iconPrefix = icons.classPrefix

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

  const clsName = cls(cName, className, iconPrefix, `${iconPrefix}-${name}`)

  return (
    <span className={clsName} {...passedProps} aria-hidden='true' />
  )
}

TalixoIcon.propTypes = {
  /** Icon name */
  name: PropTypes.string.isRequired,

  /** Additional class name */
  className: PropTypes.string
}

export default TalixoIcon
