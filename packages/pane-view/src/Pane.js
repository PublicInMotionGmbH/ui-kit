import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { buildStyle } from '../utils/utils'

const moduleName = 'pane'

const propTypes = {
  /** Pane content */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Size of the pane */
  size: PropTypes.number,

  /** Split direction */
  split: PropTypes.oneOf(['horizontal', 'vertical']),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

const defaultProps = {
  split: 'horizontal'
}

/**
 * Component which represents Pane.
 *
 * @param {object} props
 * @param {node} [props.children]
 * @param {string} [props.className]
 * @param {number} [props.size]
 * @param {string} [props.split]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
class Pane extends React.PureComponent {
  render () {
    const { children, className, defaultSize, size, split, style, ...passedProps } = this.props
    const clsName = buildClassName(moduleName, className)
    const wrapperStyle = {
      ...style,
      ...buildStyle(size, split)
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
