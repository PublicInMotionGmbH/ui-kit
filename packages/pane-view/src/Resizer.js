import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Resizer content */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Split direction */
  split: PropTypes.oneOf(['horizontal', 'vertical']),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

const defaultProps = {
}

/**
 * Component which represents Resizer View.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class Resizer extends React.PureComponent {
  render () {
    const { children, className, split, ...passedProps } = this.props

    const clsName = buildClassName('resizer', className, [split])

    return (
      <span className={clsName} {...passedProps} />
    )
  }
}

Resizer.displayName = 'Resizer'

Resizer.propTypes = propTypes
Resizer.defaultProps = defaultProps

export default Resizer
