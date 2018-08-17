import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Pane content */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Size of the pane */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Split direction */
  split: PropTypes.oneOf(['horizontal', 'vertical']),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

const defaultProps = {
}

/**
 * Component which represents Pane View.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class Pane extends React.PureComponent {
  buildStyle (size, split) {
    if (size === undefined) return {}

    const height = split === 'horizontal' && size
    const width = split === 'vertical' && size
    const display = split === 'vertical' && 'flex'
    const flex = 'none'

    return { height, width, display, flex }
  }

  render () {
    const { children, className, size, split, style, ...passedProps } = this.props

    const clsName = buildClassName('pane', className)
    const wrapperStyle = {
      ...style,
      ...this.buildStyle(size, split)
    }

    return (
      <div className={clsName} style={wrapperStyle} {...passedProps}>
        {children}
      </div>
    )
  }
}

Pane.displayName = 'Pane'

Pane.propTypes = propTypes
Pane.defaultProps = defaultProps

export default Pane
