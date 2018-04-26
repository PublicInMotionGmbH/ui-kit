import React from 'react'
import PropTypes from 'prop-types'

// import Form from '@talixo/form'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Wizard.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Wizard (props) {
  const { className, children, ...passedProps } = props

  return (
    <div className={buildClassName('wizard', className)} {...passedProps}>
      { children }
    </div>
  )
}

Wizard.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Wizard.defaultProps = {
}

export default Wizard
