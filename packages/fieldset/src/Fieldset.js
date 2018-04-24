import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'fieldset'

/**
 * Component which represents Fieldset.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.legend]
 * @param {node} [props.info]
 * @returns {React.Element}
 */
function Fieldset (props) {
  const { className, children, legend, info, ...passedProps } = props

  return (
    <fieldset className={buildClassName(moduleName, className)} {...passedProps}>
      <legend className={buildClassName([moduleName, 'legend'])}>
        {legend}
        {info ? <span className={buildClassName([moduleName, 'info'])}>{info}</span> : null}
      </legend>
      {children}
    </fieldset>
  )
}

Fieldset.propTypes = {
  /** All nodes inside fieldset */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Legend for fieldset */
  legend: PropTypes.string,

  /** Additional info */
  info: PropTypes.node
}

Fieldset.defaultProps = {
}

export default Fieldset
