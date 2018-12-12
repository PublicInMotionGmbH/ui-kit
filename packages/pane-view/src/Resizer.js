import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'pane-view-resizer'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Split direction */
  split: PropTypes.oneOf(['horizontal', 'vertical']),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

const defaultProps = {
  split: 'horizontal'
}

/**
 * Component which represents Resizer View.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.split]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
class Resizer extends React.PureComponent {
  render () {
    const { children, className, split, ...passedProps } = this.props
    const clsName = buildClassName(moduleName, className, [split])

    return (
      <span className={clsName} {...passedProps} />
    )
  }
}

Resizer.displayName = 'Resizer'
Resizer.propTypes = propTypes
Resizer.defaultProps = defaultProps

export default Resizer
