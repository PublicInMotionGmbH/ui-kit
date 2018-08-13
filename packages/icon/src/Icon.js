import React from 'react'
import PropTypes from 'prop-types'

import { icons } from '@talixo/icon-pack'

import MaterialIcon from './MaterialIcon'
import TalixoIcon from './TalixoIcon'

const propTypes = {
  /** Icon name */
  name: PropTypes.string.isRequired,

  /** Additional class name */
  className: PropTypes.string
}

/**
 * Component which represents icon
 *
 * @param {object} props
 * @param {string} [props.name]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Icon (props) {
  const { name } = props

  // Use Material Design icon, if we do not have it
  if (icons[name]) {
    return <TalixoIcon {...props} />
  }

  return <MaterialIcon {...props} />
}

Icon.displayName = 'Icon'

Icon.propTypes = propTypes

export default Icon
